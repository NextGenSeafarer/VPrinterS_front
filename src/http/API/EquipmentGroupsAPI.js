import $api from "../axiosConfig.js";
import {API_EQUIPMENT_GROUPS_URL, API_EQUIPMENT_IN_GROUP_URL} from "../APIendpoints.js";


export default class EquipmentGroupsAPI {

    static async getAllGroups() {
        return $api.get(API_EQUIPMENT_GROUPS_URL);
    }

    static async createGroup(name) {
        if (name !== null && name !== '') {
            return $api.post(API_EQUIPMENT_GROUPS_URL, {'name': name});
        }

    }

    static async getGroupEquipments(groupId) {
        if (groupId !== null && groupId !== undefined && groupId !== '') {
            return $api.get(API_EQUIPMENT_IN_GROUP_URL, {params: {'groupId': groupId}})
        }

    }

    static async updateGroup(group) {
        if (group !== null && group !== undefined && group !== '') {
            return $api.patch(API_EQUIPMENT_GROUPS_URL, group);
        }
    }

    static async deleteGroup(groupId) {
        if (groupId !== null && groupId !== undefined && groupId !== '') {
            return $api.delete(API_EQUIPMENT_GROUPS_URL, {params: {'groupId': groupId}});
        }
    }
}