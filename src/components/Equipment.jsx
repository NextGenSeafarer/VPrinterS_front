import React, {useEffect, useState} from "react";
import DropdownMenu from "./UI/DropDownMenu.jsx";
import {Toggle} from "./UI/Toggle.jsx";
import {UpdateEquipmentForm} from "./UpdateEquipmentForm.jsx";
import {ConfirmationModal} from "./UI/ButtonsBlocks/ConfirmationModal.jsx";

export const Equipment = ({equipmentData, onEquipmentEdit, onDelete, index}) => {

    const [equipment, setEquipment] = useState(equipmentData);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
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
    const [dropDownOpen, setDropDownOpen] = useState(false);


    useEffect(() => {
        if (JSON.stringify(equipment) !== JSON.stringify(equipmentData)) {
            setEquipment(equipmentData);
        }
    }, [equipmentData]);

    const handeChange = (e) => {
        const {name, value} = e.target;
        const limit = maxLengthCheck(name);
        if (value.length <= limit) {
            setEquipment((prevState) => {
                const updatedEquipment = {...prevState, [name]: value};
                onEquipmentEdit(updatedEquipment);
                return updatedEquipment;
            });
        }
    };

    const handleToggleChange = () => {
        setEquipment((prevState) => {
            const updatedEquipment = {...prevState, active: !prevState.active};
            onEquipmentEdit(updatedEquipment);
            return updatedEquipment;
        });
    };

    const maxLengthCheck = (name) => {
        const maxLengths = {
            daily_top_up: 8,
            equipment_type: 40,
            equipment_type_short: 16,
            fuel_in_use: 16,
            manufacturer: 70,
            name: 24,
            oil_brand: 24,
            oil_grade: 40,
            oil_quantity_in_system: 8,
            oil_service_time: 7,
            type_specification: 200,
            unit_service_time: 7,
            vps_equipment_id: 12,
        };
        return maxLengths[name] || 30;
    };




    return (
        <>
            <div
                className={`grid grid-cols-[240px_repeat(6,_1fr)_80px] gap-2 text-secondaryText
                items-center p-2 border-b border-borderLight hover:bg-surfaceDark text-center relative`}
            >
                {/* Name (240px) */}
                <div className="truncate text-primaryText">{equipment.name}</div>

                {/* VPS Equipment ID */}
                <div
                    className={`truncate ${equipment.vps_equipment_id === 0 ? 'bg-error rounded-2xl animate-pulse' : null}`}>
                    {equipment.vps_equipment_id === 0 ? 'Update VPS ID' : equipment.vps_equipment_id}</div>

                {/* Oil Quantity */}
                <div className="truncate">{equipment.oil_quantity_in_system}</div>

                {inputFields.map(({name, type, value}) => (
                    <React.Fragment key={name}>
                        <div
                            className={'text-secondaryText absolute text-[10px] bottom-0 font-semibold'}>{index + 1}</div>
                        <div>
                            <input
                                disabled={!equipment.active}
                                name={name}
                                type={type}
                                value={value}
                                onChange={handeChange}
                                className="w-full bg-transparent text-primaryText p-1 border border-borderLight rounded appearance-none"
                            />
                        </div>
                        <ConfirmationModal head={'Confirm equipment delete'}
                                           body={'Do you want to delete'}
                                           highlightText={equipment.name}
                                           isOpen={deleteConfirmationModal}
                                           onClose={() => setDeleteConfirmationModal(false)}
                                           onConfrim={onDelete}
                        >
                        </ConfirmationModal>
                    </React.Fragment>
                ))}
                <div className="flex justify-center space-x-2">
                    <DropdownMenu onOpenModal={()=>setDropDownOpen(true)} onDelete={() => setDeleteConfirmationModal(true)}/>
                </div>
                <div>
                    <Toggle onToggle={handleToggleChange} isActive={equipment.active}/>
                </div>
                <UpdateEquipmentForm
                    onChange={onEquipmentEdit}
                    equipmentData={equipment}
                    isEditFormOpen={dropDownOpen}
                    onModalClose={()=>setDropDownOpen(false)}
                ></UpdateEquipmentForm>
            </div>
        </>
    );
};
