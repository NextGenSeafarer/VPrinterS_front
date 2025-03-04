import {IoIosClose} from "react-icons/io";
import React, {useEffect, useState} from "react";
import InputRow from "../InputRow.jsx";
import CheckboxGroup from "../CheckboxGroup.jsx";
import {Toggle} from "../Toggle.jsx";
import checkEquipmentInput from "../../../services/Validator.js";
import {FormProvider} from "../../../services/FormContext/FormProvider.jsx";

import {MdOutlineExpandMore} from "react-icons/md";
import {MdOutlineExpandLess} from "react-icons/md";
import {SaveButton} from "../ButtonsBlocks/SaveButton.jsx";
import {EditButton} from "../ButtonsBlocks/EditButton.jsx";
import {useFetching} from "../../Hooks/useFetching.js";
import EquipmentAPI from "../../../http/API/EquipmentAPI.js";
import {Loader} from "../Loader/Loader.jsx";
import {InfoModal} from "../ButtonsBlocks/InfoModal.jsx";
import StyledCheckbox from "../ButtonsBlocks/StyledCheckbox.jsx";
import {SimpleInput} from "../SimpleInput.jsx";

const mainFields = [
    {name: "name", heading: "Equipment name"},
    {name: "vps_equipment_id", heading: "VPS equipment ID"},
    {name: "oil_quantity_in_system", heading: "Oil quantity in system", units: "liters"},
    {name: "daily_top_up", heading: "Daily top up", units: "liters"},
    {name: "fuel_in_use", heading: "Fuel in use", units: "N/A or fuel type"},
];
const additionalDataFields = [
    {
        name: "equipment_type",
        heading: "Equipment type",
    },
    {
        name: "equipment_type_short",
        heading: "Short name",
        units: "i.e. MGE #1",
    },
    {
        name: "manufacturer",
        heading: "Manufacturer/Model",
        units: "i.e. Wartsila / 9L50DF",
    },
    {
        name: "oil_brand",
        heading: "Oil brand",
        units: "i.e. Chevron",
    },
    {
        name: "oil_grade",
        heading: "Oil grade",
        units: "i.e. Taro 20 DP 40",
    },
];
const numericValues = ['vps_equipment_id', 'oil_quantity_in_system', 'daily_top_up'];


export const UpdateEquipmentForm = ({equipmentData, isEditFormOpen, onModalClose, onChange}) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({...equipmentData});
    const [originalData, setOriginalData] = useState({...equipmentData});
    const [showAdditionalData, setShowAdditionalData] = useState(false);
    const [updateEquipment, isLoading, error] = useFetching(async () => {
        if (isDataChanged(editableData, originalData)) {
            const res = await EquipmentAPI.updateEquipment(editableData);
            if (res.status === 200) {
                setOriginalData({...editableData});
                onChange(editableData);
            }
        }
        setIsEditing(false);
    });

    useEffect(() => {
        setEditableData({...equipmentData});
        setOriginalData({...equipmentData});
    }, [equipmentData]);


    const handleClose = () => {
        setEditableData({...originalData});
        onModalClose();
        setIsEditing(false);
        setShowAdditionalData(false);
    }

    const isDataChanged = (newData, oldData) => {
        return JSON.stringify(newData) !== JSON.stringify(oldData);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const maxLength = checkEquipmentInput(name);
        if (numericValues.includes(name)) {
            const numericValue = value.replace(/[^0-9]/g, "");
            if (numericValue.length > maxLength) {
                return;
            }
            setEditableData((prevEquipment) => ({
                ...prevEquipment, [name]: numericValue,
            }));
            return;
        }
        if (value.length > maxLength) {
            return;
        }
        setEditableData((prevEquipment) => ({
            ...prevEquipment, [name]: value,
        }));
    };


    const handleNewEquipmentToggle = () => {
        setEditableData((prevEquipment) => ({
            ...prevEquipment, new_equipment: !prevEquipment.new_equipment,
        }));
        setIsEditing(true);
    }

    const handleOilTypeChange = (type) => {
        setEditableData((prevEquipment) => ({
            ...prevEquipment, oil_type: type,
        }));

    }
    const handleTypeSpecificationChange = (typeSpecification) => {
        setEditableData((prevEquipment) => ({
            ...prevEquipment, type_specification: typeSpecification,
        }));
    }

    if (!isEditFormOpen) {
        return null;
    }

    return (
        <>
            <FormProvider isEditing={isEditing} onChange={handleInputChange}>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-start text-xs"
                     onClick={handleClose}
                >
                    {isLoading && <Loader className={'absolute inset-0 z-[100]'}/>}
                    {error && <InfoModal header={'Something went wrong'} body={error}></InfoModal>}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-surfaceLight p-6 rounded-lg shadow-lg w-[650px] h-fit overflow-y-auto relative scrollbar-hide
                    ">
                        <button className={"absolute top-0 right-0 p-2"} onClick={handleClose}>
                            <IoIosClose size={30} color={"#FF9F43"}/>
                        </button>
                        <h2 className="text-primaryText text-2xl font-semibold mb-4">
                            Equipment Details
                        </h2>
                        <div className="flex justify-end space-x-10 mb-4">
                            {isEditing ? <SaveButton handleSave={updateEquipment}></SaveButton> :
                                <EditButton setIsEditing={setIsEditing}></EditButton>}
                        </div>
                        <div className="overflow-y-auto max-h-fit">
                            {mainFields.map(({name, heading, units}) => (
                                <InputRow key={name}
                                          name={name}
                                          type={'text'}
                                          value={editableData[name]}
                                          heading={heading}
                                          units={units}
                                />))}
                            <SimpleInput
                                heading={'New equipment?'}
                            >
                                <StyledCheckbox onChange={handleNewEquipmentToggle}
                                                checked={editableData.new_equipment}
                                                label={'Select, if you DON\'T have VPS ID'}
                                ></StyledCheckbox>
                            </SimpleInput>
                            <InputRow heading={'Additional info'}
                                      units={'click to expand'} onClick={() => setShowAdditionalData(true)}>

                                {showAdditionalData ?
                                    <div
                                        className={'cursor-pointer font-bold text-info underline underline-offset-4 flex flex-row items-center '}
                                        onClick={() => setShowAdditionalData(!showAdditionalData)}>Hide
                                        <MdOutlineExpandLess className={'translate-y-0.5 hover:-translate-y-0.5 transition duration-300'} color={'#A5B9B7'} size={20}></MdOutlineExpandLess>
                                    </div> :
                                    <div
                                        className={'cursor-pointer font-bold text-primaryAccent underline underline-offset-4 flex flex-row items-center'}
                                        onClick={() => setShowAdditionalData(!showAdditionalData)}>Show more

                                        <MdOutlineExpandMore className={'hover:translate-y-1 transition duration-300'} size={20} color={'#FF9F43'}></MdOutlineExpandMore>
                                    </div>
                                }
                            </InputRow>
                            <fieldset hidden={!showAdditionalData}>

                                {additionalDataFields.map(({name, type, heading, units}) => (
                                    <InputRow key={name}
                                              name={name}
                                              type={type}
                                              value={editableData[name]}
                                              heading={heading}
                                              units={units}
                                    />))}

                                <CheckboxGroup checked={editableData.oil_type}
                                               text={editableData.type_specification}
                                               onOilChange={handleOilTypeChange}
                                               onTypeSpecificationChange={handleTypeSpecificationChange}
                                >
                                </CheckboxGroup>
                            </fieldset>

                        </div>
                    </div>
                </div>
            </FormProvider>
        </>)
}
