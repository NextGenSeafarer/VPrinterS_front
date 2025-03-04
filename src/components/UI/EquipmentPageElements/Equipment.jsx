import React, {useEffect, useState} from "react";
import {UpdateEquipmentForm} from "./UpdateEquipmentForm.jsx";
import {ConfirmationModal} from "../ButtonsBlocks/ConfirmationModal.jsx";
import checkEquipmentInput from "../../../services/Validator.js";
import {DeleteButton} from "../ButtonsBlocks/DeleteButton.jsx";
import StyledCheckbox from "../ButtonsBlocks/StyledCheckbox.jsx";

export const Equipment = ({equipmentData, onEquipmentEdit, onDelete, index}) => {

    const [equipment, setEquipment] = useState(equipmentData);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const inputFields = [{
        name: "unit_service_time", type: "text", value: equipment.unit_service_time,
    }, {
        name: "oil_service_time", type: "text", value: equipment.oil_service_time,
    }, {
        name: "sampling_date", type: "date", value: new Date(equipmentData.sampling_date).toISOString().split("T")[0],
    },];
    const [detailedModalOpen, setDetailedModalOpen] = useState(false);


    useEffect(() => {
        if (JSON.stringify(equipment) !== JSON.stringify(equipmentData)) {
            setEquipment(equipmentData);
        }
    }, [equipmentData]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (name === 'sampling_date') {
            const formattedDate = new Date(value).toISOString().split("T")[0];
            setEquipment((prevState) => {
                const updatedEquipment = {...prevState, sampling_date: formattedDate};
                onEquipmentEdit(updatedEquipment);
                return updatedEquipment;
            });
            return
        }
        const numericValue = value.replace(/[^0-9]/g, "");
        const limit = checkEquipmentInput(name);
        if (numericValue.length <= limit) {
            setEquipment((prevState) => {
                const updatedEquipment = {...prevState, [name]: numericValue};
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

    return (<>
            <div className={`grid grid-cols-7 gap-2 text-primaryText border-b border-opacity-80 border-borderLight text-center text-xs relative items-center
                hover:bg-surfaceLight hover:bg-opacity-50 p-1`}
            >
                <div onClick={() => setDetailedModalOpen(!detailedModalOpen)}
                     className="truncate text-primaryText cursor-pointer hover:text-primaryAccent">{equipment.name}</div>
                <div
                    className={`truncate ${equipment.vps_equipment_id === 0 ? 'bg-error py-1 rounded-2xl animate-pulse' : null}`}>
                    {equipment.vps_equipment_id === 0 ? 'Update VPS ID' : equipment.vps_equipment_id}</div>
                <div className="truncate">{equipment.oil_quantity_in_system}</div>
                {inputFields.map(({name, type, value}) => (<React.Fragment key={name}>
                        <div
                            className={'text-secondaryText absolute text-[8px] bottom-0 left-1 font-semibold'}>{index + 1}</div>
                        <div>
                            <input
                                disabled={!equipment.active}
                                name={name}
                                type={type}
                                value={value}
                                onChange={handleChange}
                                className={`w-full bg-transparent text-primaryText p-1 border border-borderLight rounded 
                                ${(value === '0' || value === '') ? 'border-error border-2 animate-pulse' : null}`}
                            />
                        </div>

                    </React.Fragment>))}
                <StyledCheckbox onChange={handleToggleChange}
                                checked={equipment.active}
                                label={'Print'}
                ></StyledCheckbox>


                <span className="absolute right-2 flex flex-row">
                    <DeleteButton className={'px-1.5 py-1.5'} text={''} size={12}
                                  onClick={() => setDeleteConfirmationModal(true)}></DeleteButton>
            </span>
                <ConfirmationModal head={'Confirm equipment delete'}
                                   body={'Do you want to delete'}
                                   highlightText={equipment.name}
                                   isOpen={deleteConfirmationModal}
                                   onClose={() => setDeleteConfirmationModal(false)}
                                   onConfrim={() => onDelete(equipment.id)}
                >
                </ConfirmationModal>

                <UpdateEquipmentForm
                    onChange={onEquipmentEdit}
                    equipmentData={equipment}
                    isEditFormOpen={detailedModalOpen}
                    onModalClose={() => setDetailedModalOpen(false)}
                ></UpdateEquipmentForm>
            </div>
        </>);
};
