import {CiEdit} from "react-icons/ci";
import {MdDeleteForever} from "react-icons/md";
import {IoIosClose} from "react-icons/io";
import {useEffect, useState} from "react";
import $api from "../http/axiosConfig.js";

export const EquipmentModal = ({fullEquipmentData, isModalOpen, onModalClose, onDropDownClose}) => {

    const updateEquipmentApi = '/api/equipment'

    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState({...fullEquipmentData});
    const [originalData, setOriginalData] = useState({...fullEquipmentData});
    const [equipmentError, setEquipmentError] = useState('');

    const handleCancel = () => {
        setEditableData({...originalData});
        setIsEditing(false);
    };

    function handleErrors (message) {
        let array = message.split('--');
        console.log(array);
        return array;
    }


    const handleSave = async () => {
        try {
            const updateEquipment = await $api.patch(updateEquipmentApi, editableData)
            setOriginalData({...editableData});
            setIsEditing(false);
        } catch (error) {
            setEquipmentError(error.response.data.message);
            handleErrors(error.response.data.message);
            console.log(error.response.data.message);
        } finally {
            setIsEditing(false);
        }
    };

    const handleClose = () => {
        setEditableData({...originalData});
        setIsEditing(false);
        onModalClose();
    };

    useEffect(() => {
        setEditableData({...fullEquipmentData});
        setOriginalData({...fullEquipmentData});
    }, [fullEquipmentData]);

    const excludedKeys = ["id", "active", "created_at", "changed_at"];

    const handleInputChange = (key, value) => {
        setEditableData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };


    if (!isModalOpen) {
        return null;
    }


    return (
        <>
            <div
                onMouseEnter={onDropDownClose}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-start"
            >
                <div className="bg-surfaceLight p-6 rounded-lg shadow-lg w-full max-w-2xl relative">
                    <div>{equipmentError}</div>
                    <button className={"absolute top-0 right-0 p-2"} onClick={handleClose}>
                        <IoIosClose size={30} color={"#FF9F43"}/>
                    </button>
                    <h2 className="text-primaryText text-2xl font-semibold mb-4">
                        Equipment Details
                    </h2>

                    {/* Список данных */}
                    <div className="overflow-y-auto max-h-fit">
                        {Object.entries(editableData)
                            .filter(([key]) => !excludedKeys.includes(key))
                            .map(([key, value]) => (
                                <div
                                    key={key}
                                    className="grid grid-cols-2 py-2 border-b border-borderLight p-1"
                                >
                  <span className="text-secondaryText capitalize font-medium p-1">
                    {key.replace(/_/g, " ")}
                  </span>

                                    {isEditing ? (
                                        <input
                                            name={key}
                                            type="text"
                                            value={value === null || value === undefined ? "" : String(value)}
                                            onChange={(e) => handleInputChange(key, e.target.value)}
                                            className="p-1 border border-borderLight rounded bg-background text-primaryText"
                                        />
                                    ) : (
                                        <span className="text-primaryText">
                      {value === null || value === undefined
                          ? "-"
                          : typeof value === "boolean"
                              ? value
                                  ? "Yes"
                                  : "No"
                              : key.toLowerCase().includes("date") &&
                              !isNaN(new Date(value))
                                  ? new Date(value).toLocaleDateString()
                                  : String(value)}
                    </span>
                                    )}
                                </div>
                            ))}
                    </div>

                    {/* Кнопки */}
                    <div className="mt-6 flex justify-end space-x-10">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    className={
                                        "text-primaryText hover:scale-105 flex flex-col items-center"
                                    }
                                >
                                    Save
                                    <CiEdit size={30} color={"#5CB85C"}/>
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className={
                                        "text-primaryText hover:scale-105 flex flex-col items-center"
                                    }
                                >
                                    Cancel
                                    <IoIosClose size={30} color={"#D9534F"}/>
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className={
                                        "text-primaryText hover:scale-105 flex flex-col items-center"
                                    }
                                >
                                    Edit
                                    <CiEdit size={30} color={"#FF9F43"}/>
                                </button>
                                <button
                                    onClick={onModalClose}
                                    className={
                                        "text-primaryText hover:scale-105 flex flex-col items-center"
                                    }
                                >
                                    Delete
                                    <MdDeleteForever size={30} color={"#D9534F"}/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
