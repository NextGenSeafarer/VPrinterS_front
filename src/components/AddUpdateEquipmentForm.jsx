import {IoIosClose} from "react-icons/io";
import {CiEdit} from "react-icons/ci";
import {MdDeleteForever} from "react-icons/md";
import {useEffect, useState} from "react";
import InputRow from "./UI/InputRow.jsx";
import CheckboxGroup from "./UI/CheckboxGroup.jsx";
import {Toggle} from "./UI/Toggle.jsx";
import checkEquipmentInput from "../services/Validator.js";
import {FormProvider} from "../services/FormContext/FormProvider.jsx";
import $api from "../http/axiosConfig.js";

export const AddUpdateEquipmentForm = ({onDropDownClose, equipmentData, isModalOpen, onModalClose}) => {


    const updateEquipmentApi = '/api/equipment'
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({...equipmentData});
    const [originalData, setOriginalData] = useState({...equipmentData});
    const [equipmentServerError, setEquipmentServerError] = useState('');


    // const [equipment, setEquipment] = useState({
    //     name: equipmentData.name,
    //     vps_equipment_id: equipmentData.vps_equipment_id,
    //     unit_service_time: equipmentData.unit_service_time,
    //     oil_service_time: equipmentData.oil_service_time,
    //     sampling_date: equipmentData.sampling_date,
    //     oil_quantity_in_system: equipmentData.oil_quantity_in_system,
    //     daily_top_up: equipmentData.daily_top_up,
    //     fuel_in_use: equipmentData.fuel_in_use,
    //     new_equipment: equipmentData.new_equipment,
    //     equipment_type: equipmentData.equipment_type,
    //     equipment_type_short: equipmentData.equipment_type_short,
    //     manufacturer: equipmentData.manufacturer,
    //     oil_brand: equipmentData.oil_brand,
    //     oil_grade: equipmentData.oil_grade,
    //     oil_type: equipmentData.oil_type,
    //     type_specification: equipmentData.type_specification,
    //     id: equipmentData.id,
    //     active: equipmentData.active,
    //     changed_at: equipmentData.changed_at,
    //     created_at: equipmentData.created_at,
    // });

    useEffect(() => {
        setEditableData({...equipmentData});
        setOriginalData({...equipmentData});
    }, [equipmentData]);

    if (!isModalOpen) {
        return null;
    }


    const handleSave = async () => {
        try {
            const updateEquipment = await $api.patch(updateEquipmentApi, editableData)
            setOriginalData({...editableData});
            setIsEditing(false);
        } catch (error) {
            setEquipmentServerError(error.response.data.message);
            // handleErrors(error.response.data.message);
            console.log(error.response.data.message);
        } finally {
            setIsEditing(false);
        }
    };


    const handleClose = () => {
        setEditableData({...originalData});
        onModalClose();
        setIsEditing(false);
    }


    const handleAdditionalInfoShow = () => {
        setEditableData((prevEquipment) => ({
            ...prevEquipment, new_equipment: !prevEquipment.new_equipment,
        }));

    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
    }

    const handleCancel = () => {
        setEditableData({...originalData});
        setIsEditing(false);
    };
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

    return (
        <>
            <FormProvider isEditing={isEditing} onChange={handleInputChange}>
                <form onMouseEnter={onDropDownClose}
                      onSubmit={handleFormSubmit}
                      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-start">

                    <div className="bg-surfaceLight p-6 rounded-lg shadow-lg w-[650px] max-w-2xl relative">
                        <div className={'absolute top-0 right-0'}>{equipmentServerError}</div>
                        <button className={"absolute top-0 right-0 p-2"} onClick={handleClose}>
                            <IoIosClose size={30} color={"#FF9F43"}/>
                        </button>
                        <h2 className="text-primaryText text-2xl font-semibold mb-4">
                            Equipment Details
                        </h2>
                        {/* Список данных */}
                        <div className="overflow-y-auto max-h-fit">
                            <InputRow type={'text'}
                                      name={'name'}
                                      value={editableData.name}
                                      heading={'Equipment name'}
                            >

                            </InputRow>
                            <InputRow name={'vps_equipment_id'}
                                      type={'number'}
                                      value={editableData.vps_equipment_id}
                                      heading={'VPS equipment ID'}
                            >
                            </InputRow>
                            <InputRow name={'unit_service_time'}
                                      type={'number'}
                                      value={editableData.unit_service_time}
                                      heading={'Unit service time'}
                                      units={'hours'}
                            >

                            </InputRow>
                            <InputRow name={'oil_service_time'}
                                      type={'number'}
                                      value={editableData.oil_service_time}
                                      heading={'Oil service time'}
                                      units={'hours'}
                            >
                            </InputRow>
                            <InputRow name={'sampling_date'}
                                      type={'date'}
                                      value={editableData.sampling_date}
                                      heading={'Last sampling date'}
                                      units={'DD/MM/YY'}
                            ></InputRow>

                            <InputRow name={'daily_top_up'}
                                      type={'number'}
                                      value={editableData.daily_top_up}
                                      heading={'Daily top up'}
                                      units={'liters'}
                            >

                            </InputRow>
                            <InputRow name={'fuel_in_use'}
                                      type={'text'} value={editableData.fuel_in_use} heading={'Fuel in use'}
                                      units={'N/A or fuel type'}

                            >

                            </InputRow>
                            <InputRow
                                heading={'Additional data/New equipment'}
                                units={'if you don\'t have VPS ID fill up below'}
                            >
                                <Toggle isActive={editableData.new_equipment}
                                        onToggle={handleAdditionalInfoShow}></Toggle>
                            </InputRow>
                            <fieldset hidden={!editableData.new_equipment}>
                                <InputRow name={'equipment_type'}
                                          type={'text'} value={editableData.equipment_type} heading={'Equipment type'}

                                >

                                </InputRow>
                                <InputRow name={'equipment_type_short'}
                                          type={'text'} value={editableData.equipment_type_short} heading={'Short name'}
                                          units={'i.e. MGE #1'}
                                >

                                </InputRow>
                                <InputRow name={'manufacturer'}
                                          type={'text'} value={editableData.manufacturer} heading={'Manufacturer/Model'}
                                          units={'i.e. Wartsila 9L50DF'}
                                >

                                </InputRow>
                                <InputRow name={'oil_brand'}
                                          type={'text'} value={editableData.oil_brand} heading={'Oil brand'}
                                          units={'i.e. Chevron'}
                                >

                                </InputRow>
                                <InputRow name={'oil_grade'}
                                          type={'text'} value={editableData.oil_grade} heading={'Oil grade'}
                                          units={'i.e. Taro 20 DP 40'}
                                >

                                </InputRow>
                                <CheckboxGroup checked={editableData.oil_type}
                                               text={editableData.type_specification}
                                >
                                </CheckboxGroup>
                            </fieldset>

                        </div>
                        <div className="mt-6 flex justify-end space-x-10 relative">
                            {isEditing ? (<>
                                <button
                                    onClick={handleSave}
                                    className={"text-primaryText hover:scale-105 flex flex-col items-center"}
                                >
                                    Save
                                    <CiEdit size={30} color={"#5CB85C"}/>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={"text-primaryText hover:scale-105 flex flex-col items-center"}
                                >
                                    Cancel
                                    <IoIosClose size={30} color={"#D9534F"}/>
                                </button>
                            </>) : (<>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className={"text-primaryText hover:scale-105 flex flex-col items-center"}
                                >
                                    Edit
                                    <CiEdit size={30} color={"#FF9F43"}/>
                                </button>
                                <button

                                    className={"text-primaryText hover:scale-105 flex flex-col items-center"}
                                >
                                    Delete
                                    <MdDeleteForever size={30} color={"#D9534F"}/>
                                </button>
                            </>)}

                        </div>
                    </div>
                </form>
            </FormProvider>
        </>)
}