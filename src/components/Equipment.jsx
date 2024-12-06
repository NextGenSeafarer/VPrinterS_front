import DropdownMenu from "./UI/DropDownMenu.jsx";
import {Toggle} from "./UI/Toggle.jsx";
import {useState} from "react";
import {AddUpdateEquipmentForm} from "./AddUpdateEquipmentForm.jsx";

export const Equipment = ({equipmentData, onEquipmentEdit}) => {

    const [equipment, setEquipment] = useState(equipmentData);

    const inputFields = [
        {
            name: "unit_service_time",
            type: "number",
            value: equipment.unit_service_time,
        },
        {
            name: "oil_service_time",
            type: "number",
            value: equipment.oil_service_time,
        },
        {
            name: "sampling_date",
            type: "date",
            value: equipment.sampling_date,
        },
    ];


    const handeChange = (e) => {
        const {name, value} = e.target;
        const limit = maxLengthCheck(name);
        if (value.length <= limit) {
            setEquipment((prevState) => ({
                ...prevState, [name]: value
            }));
            onEquipmentEdit(e)
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

                {inputFields.map(({ name, type, value }) => (
                    <div key={name}>
                        <input
                            disabled={!equipment.active}
                            name={name}
                            type={type}
                            value={value}
                            onChange={handeChange}
                            className="w-full bg-transparent text-primaryText p-1 border border-borderLight rounded appearance-none"
                        />
                    </div>
                ))}

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