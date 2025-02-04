const getNameAndLength = (name) => {

    const createObject = (maxValueLength) => {
        return {
            "maxValueLength": maxValueLength,
        }
    }

    switch (name) {
        case "daily_top_up":
            return createObject(8)
        case "equipment_type":
            return createObject(40)
        case "equipment_type_short":
            return createObject(16)
        case "fuel_in_use":
            return createObject(16)
        case "manufacturer":
            return createObject(70)
        case "name":
            return createObject(24)
        case "oil_brand":
            return createObject(24)
        case "oil_grade":
            return createObject(40)
        case "oil_quantity_in_system":
            return createObject(8)
        case "oil_service_time":
            return createObject(7)
        case "type_specification":
            return createObject(200)
        case "unit_service_time":
            return createObject(7)
        case "vps_equipment_id":
            return createObject(12)
        default:
            return createObject(30)
    }
}

const checkEquipmentInput = (name) => {
    const {maxValueLength} = getNameAndLength(name)
    return maxValueLength;
}
export default checkEquipmentInput;
