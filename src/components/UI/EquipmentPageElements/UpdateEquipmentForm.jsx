import {IoIosClose} from "react-icons/io";
import {useEffect, useState} from "react";
import InputRow from "../InputRow.jsx";
import CheckboxGroup from "../CheckboxGroup.jsx";
import {Toggle} from "../Toggle.jsx";
import checkEquipmentInput from "../../../services/Validator.js";
import {FormProvider} from "../../../services/FormContext/FormProvider.jsx";

import {MdOutlineExpandMore} from "react-icons/md";
import {MdOutlineExpandLess} from "react-icons/md";
import {SaveCancelButtonsBlock} from "../ButtonsBlocks/SaveCancelButtonsBlock.jsx";
import {EditDeleteButtonsBlock} from "../ButtonsBlocks/EditDeleteButtonsBlock.jsx";
import {useFetching} from "../../Hooks/useFetching.js";
import EquipmentAPI from "../../../http/API/EquipmentAPI.js";
import {Loader} from "../Loader/Loader.jsx";
import {InfoModal} from "../ButtonsBlocks/InfoModal.jsx";

const mainFields = [
    {name: "name", type: "text", heading: "Equipment name"},
    {name: "vps_equipment_id", type: "number", heading: "VPS equipment ID"},
    {name: "unit_service_time", type: "number", heading: "Unit service time", units: "hours"},
    {name: "oil_service_time", type: "number", heading: "Oil service time", units: "hours"},
    {name: "sampling_date", type: "date", heading: "Last sampling date"},
    {name: "oil_quantity_in_system", type: "number", heading: "Oil quantity in system", units: "liters"},
    {name: "daily_top_up", type: "number", heading: "Daily top up", units: "liters"},
    {name: "fuel_in_use", type: "text", heading: "Fuel in use", units: "N/A or fuel type"},
];

const additionalDataFields = [
    {
        name: "equipment_type",
        type: "text",
        heading: "Equipment type",
    },
    {
        name: "equipment_type_short",
        type: "text",
        heading: "Short name",
        units: "i.e. MGE #1",
    },
    {
        name: "manufacturer",
        type: "text",
        heading: "Manufacturer/Model",
        units: "i.e. Wartsila / 9L50DF",
    },
    {
        name: "oil_brand",
        type: "text",
        heading: "Oil brand",
        units: "i.e. Chevron",
    },
    {
        name: "oil_grade",
        type: "text",
        heading: "Oil grade",
        units: "i.e. Taro 20 DP 40",
    },
];


export const UpdateEquipmentForm = ({onDropDownClose, equipmentData, isEditFormOpen, onModalClose, onChange}) => {

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

    if (!isEditFormOpen) {
        return null;
    }

    const handleClose = () => {
        setEditableData({...originalData});
        onModalClose();
        setIsEditing(false);
        setShowAdditionalData(false);
    }

    const handleCancel = () => {
        setEditableData({...originalData});
        setIsEditing(false);
    };

    const isDataChanged = (newData, oldData) => {
        return JSON.stringify(newData) !== JSON.stringify(oldData);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        const maxLength = checkEquipmentInput(name, value);
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


    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onModalClose();
            handleClose();
        }
    }

    return (
        <>
            <FormProvider isEditing={isEditing} onChange={handleInputChange}>
                <div onMouseEnter={onDropDownClose}
                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-start"
                     onClick={handleOverlayClick}
                >
                    {isLoading && <Loader className={'absolute inset-0 z-[100]'}/>}
                    {error && <InfoModal header={'Something went wrong'} body={error}></InfoModal>}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-surfaceLight p-6 rounded-lg shadow-lg w-[650px] h-[80%] overflow-y-auto relative scrollbar-hide
                    shadow-surfaceLight">
                        <button className={"absolute top-0 right-0 p-2"} onClick={handleClose}>
                            <IoIosClose size={30} color={"#FF9F43"}/>
                        </button>
                        <h2 className="text-primaryText text-2xl font-semibold mb-4">
                            Equipment Details
                        </h2>
                        {/* Список данных */}
                        <div className="overflow-y-auto max-h-fit">
                            {mainFields.map(({name, type, heading, units}) => (
                                <InputRow className={editableData[name] === '' ? 'bg-error rounded-md ' : ''}
                                          key={name}
                                          name={name}
                                          type={type}
                                          value={editableData[name]}
                                          heading={heading}
                                          units={units}
                                />))}

                            <InputRow
                                heading={'New equipment?'}
                                units={'if you don\'t have VPS ID fill up below'}
                            >
                                <Toggle isActive={editableData.new_equipment}
                                        onToggle={handleNewEquipmentToggle}></Toggle>
                            </InputRow>
                            <InputRow heading={'Additional info'}
                                      units={'click to expand'}>

                                {showAdditionalData ?
                                    <MdOutlineExpandLess color={'#A5B9B7'} size={30} className={'cursor-pointer'}
                                                         onClick={() => setShowAdditionalData(!showAdditionalData)}/> :
                                    <MdOutlineExpandMore size={30} color={'#FF9F43'} className={'cursor-pointer'}
                                                         onClick={() => setShowAdditionalData(!showAdditionalData)}></MdOutlineExpandMore>}

                            </InputRow>
                            <fieldset hidden={!showAdditionalData}>

                                {additionalDataFields.map(({name, type, heading, units}) => (
                                    <InputRow className={editableData[name] === '' ? 'bg-error rounded-md ' : ''}
                                              key={name}
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
                        <div className="mt-6 flex justify-end space-x-10 relative">
                            {isEditing ? <SaveCancelButtonsBlock handleCancel={handleCancel}
                                                                 handleSave={updateEquipment}></SaveCancelButtonsBlock> :
                                <EditDeleteButtonsBlock
                                    handleDelete={() => console.log('deleting ' + editableData.name)}
                                    setIsEditing={setIsEditing}></EditDeleteButtonsBlock>}

                        </div>
                    </div>
                </div>
            </FormProvider>
        </>)
}
