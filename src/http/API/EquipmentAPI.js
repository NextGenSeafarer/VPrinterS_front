import $api from "../axiosConfig.js";
import {API_COPY_EQUIPMENT_URL, API_EQUIPMENT_URL, API_PRINTER_GENERATE_PDF_URL} from "../APIendpoints.js";

export default class EquipmentAPI {

    static async updateEquipment(editableData) {
        if (editableData.new_equipment && editableData.vps_equipment_id < 1) {
            editableData.vps_equipment_id = undefined; // to allow save/update while typing in input
        }
        return $api.patch(API_EQUIPMENT_URL, editableData);
    }

    static async saveNewEquipment(equipmentData) {
        if (equipmentData.new_equipment) {
            equipmentData.vps_equipment_id = undefined; // to allow save/update while typing in input
        }
        return $api.post(API_EQUIPMENT_URL, equipmentData);
    }


    static async getAllEquipment() {
        const response = await $api.get(API_EQUIPMENT_URL)
        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to fetch equipment');
    }

    static async generatePdfList(activeEquipmentList) {
        if (activeEquipmentList.length > 0) {
            const response = await $api.post(API_PRINTER_GENERATE_PDF_URL, activeEquipmentList, {responseType: 'blob'})
            if(response.status === 200) {
                const blob = new Blob([response.data], {type: 'application/pdf'});
                const url = window.URL.createObjectURL(blob);
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0];
                const link = document.createElement('a');
                link.href = url;
                link.download = 'vprinters_' + formattedDate + '.pdf';
                link.click();
                window.URL.revokeObjectURL(url);
                return response;
            }
            return [];

        }
    }

    static async deleteEquipment(id) {
        return $api.delete(API_EQUIPMENT_URL, {params: {'equipmentId': id}});
    }

    static async copyEquipment(copyCode) {
        return $api.post(API_COPY_EQUIPMENT_URL, null, {params: {'code': copyCode}});
    }

    static async fetchNotIncludedInGroupEquipment(groupId) {
        if (groupId !== null && groupId !== '') {
            return $api.get(API_EQUIPMENT_URL + '/equipmentNotIncludedInGroup', {params: {'groupId': groupId}})
        }
    }

    static async assignEquipmentToGroup(groupId, equipmentList) {
        if (equipmentList !== undefined && equipmentList.length > 0 && groupId !== undefined && groupId !== '') {
            return $api.post(API_EQUIPMENT_URL + '/assignGroup', equipmentList, {
                params: {
                    'groupId': groupId,
                }
            });
        }
    }

    static async removeEquipmentFromGroup(equipmentId, groupId) {
        if (groupId !== undefined && groupId !== '' && equipmentId !== undefined && equipmentId !== '') {
            return $api.post(API_EQUIPMENT_URL + '/removeFromGroup', null, {
                params: {
                    'equipmentId': equipmentId,
                    'groupId': groupId,

                }
            });
        }
    }
}

