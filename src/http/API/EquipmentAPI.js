import $api from "../axiosConfig.js";
import {API_EQUIPMENT_URL} from "../APIendpoints.js";

export default class EquipmentAPI {


    static async updateEquipment(editableData) {
        return $api.patch(API_EQUIPMENT_URL, editableData);
    }

    static async saveNewEquipment(equipmentData) {
        return $api.post(API_EQUIPMENT_URL, equipmentData);
    }

    static async getAllEquipment() {
        const response = await $api.get(API_EQUIPMENT_URL)
        return response.data;
    }

    static async deleteEquipment(id) {
        return $api.delete(API_EQUIPMENT_URL, { params: { 'equipmentId': id } });
    }
}