import DropdownMenu from "./UI/DropDownMenu.jsx";
import {Toggle} from "./UI/Toggle.jsx";
import {useState} from "react";
import {EquipmentModal} from "./EquipmentModal.jsx";
import {AddUpdateEquipmentForm} from "./AddUpdateEquipmentForm.jsx";

export const Equipment = ({equipmentData, onEquipmentEdit}) => {

    const [equipment, setEquipment] = useState({
        name: equipmentData.name,
        vps_equipment_id: equipmentData.vps_equipment_id,
        unit_service_time: equipmentData.unit_service_time,
        oil_service_time: equipmentData.oil_service_time,
        sampling_date: equipmentData.sampling_date,
        oil_quantity_in_system: equipmentData.oil_quantity_in_system,
        daily_top_up: equipmentData.daily_top_up,
        fuel_in_use: equipmentData.fuel_in_use,
        new_equipment: equipmentData.new_equipment,
        equipment_type: equipmentData.equipment_type,
        equipment_type_short: equipmentData.equipment_type_short,
        manufacturer: equipmentData.manufacturer,
        oil_brand: equipmentData.oil_brand,
        oil_grade: equipmentData.oil_grade,
        oil_type: equipmentData.oil_type,
        type_specification: equipmentData.type_specification,
        id: equipmentData.id,
        active: equipmentData.active,
        changed_at: equipmentData.changed_at,
        created_at: equipmentData.created_at,
    });

    const handeChange = (e) => {
        const {name, value} = e.target;
        const limit = maxLengthCheck(name);
        if (value.length <= limit) {
            setEquipment((prevState) => ({
                ...prevState, [name]: value
            }));
        }
    };


    const handleToggleChange = () => {
        setEquipment((prevState) => ({
            ...prevState, active: !prevState.active
        }))
    }

    const maxLengthCheck = (name) => {
        let maxLength = 1;
        switch (name) {
            case "daily_top_up":
                maxLength = 8;
                break;
            case "equipment_type":
                maxLength = 40;
                break;
            case "equipment_type_short":
                maxLength = 16;
                break;
            case "fuel_in_use":
                maxLength = 16;
                break;
            case "manufacturer":
                maxLength = 70;
                break;
            case "name":
                maxLength = 24;
                break;
            case "oil_brand":
                maxLength = 24;
                break;
            case "oil_grade":
                maxLength = 40;
                break;
            case "oil_quantity_in_system":
                maxLength = 8;
                break;
            case "oil_service_time":
                maxLength = 7;
                break;
            case "type_specification":
                maxLength = 200;
                break;
            case "unit_service_time":
                maxLength = 7;
                break;
            case "vps_equipment_id":
                maxLength = 12;
                break;
            default:
                maxLength = 30;
                break;
        }
        return maxLength;
    }

    const [isModalOpen, setModalOpen] = useState(false);

    const handleCloseModal = () => {
        setModalOpen(false);
    }
    const handleOpenModal = () => {
        setModalOpen(true);
    }

    return (
        <>
            <div className="grid grid-cols-[240px_repeat(6,_1fr)_80px] gap-2 text-secondaryText
                items-center p-2 border-b border-borderLight hover:bg-surfaceDark text-center">

                {/* Name (240px) */}
                <div className="truncate text-primaryText">{equipment.name}</div>

                {/* VPS Equipment ID */}
                <div className="truncate">{equipment.vps_equipment_id}</div>

                {/* Oil Quantity */}
                <div className="truncate">{equipment.oil_quantity_in_system}</div>

                {/* Unit Service Time */}
                <div>
                    <input
                        disabled={!equipment.active}
                        name='unit_service_time'
                        type="number"
                        value={equipment.unit_service_time}
                        onChange={handeChange}
                        className="w-full bg-transparent text-primaryText p-1 border border-borderLight rounded"
                    />
                </div>

                {/* Oil Service Time */}
                <div>
                    <input
                        disabled={!equipment.active}
                        name='oil_service_time'
                        type="number"
                        value={equipment.oil_service_time}
                        onChange={handeChange}
                        className="w-full bg-transparent text-primaryText p-1 border border-borderLight rounded"
                    />
                </div>

                {/* Sampling Date - стилизован аналогично другим input */}
                <div>
                    <input
                        disabled={!equipment.active}
                        name='sampling_date'
                        type="date"
                        value={equipment.sampling_date}
                        onChange={handeChange}
                        className="w-full bg-transparent text-primaryText p-1 border border-borderLight rounded appearance-none"
                    />
                </div>
                <div className="flex justify-center space-x-2">
                    <DropdownMenu onOpenModal={handleOpenModal}/>
                </div>
                <div><Toggle onToggle={handleToggleChange} isActive={equipment.active}/></div>
                <AddUpdateEquipmentForm equipmentData={equipment} isModalOpen={isModalOpen}
                                        onModalClose={handleCloseModal}></AddUpdateEquipmentForm>
            </div>


        </>
    )
}