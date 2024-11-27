const getNameAndLength = (name) => {

    const createObject = (type, maxValueLength) => {
        return {
            "type": type,
            "maxValueLength": maxValueLength,
        }
    }

    switch (name) {
        case "daily_top_up":
            return createObject('number', 8)
        case "equipment_type":
            return createObject('text', 40)
        case "equipment_type_short":
            return createObject('text', 16)
        case "fuel_in_use":
            return createObject('text', 16)
        case "manufacturer":
            return createObject('text', 70)
        case "name":
            return createObject('text', 24)
        case "oil_brand":
            return createObject('text', 24)
        case "oil_grade":
            return createObject('text', 40)
        case "oil_quantity_in_system":
            return createObject('number', 8)
        case "oil_service_time":
            return createObject('number', 7)
        case "type_specification":
            return createObject('text', 200)
        case "unit_service_time":
            return createObject('number', 7)
        case "vps_equipment_id":
            return createObject('number', 12)
        default:
            return createObject('unknown', 30)
    }
}

const checkEquipmentInput = (name,inputValue) => {
    const {type, maxValueLength} = getNameAndLength(name)
    return maxValueLength;
    // if (typeof inputValue !== type) {
    //     console.log(inputValue)
    //     return "Incorrect type of " + name + " input"
    // }

}
export default checkEquipmentInput;