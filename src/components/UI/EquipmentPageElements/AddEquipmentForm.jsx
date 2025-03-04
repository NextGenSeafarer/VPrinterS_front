import {IoIosClose} from "react-icons/io";
import {Toggle} from "../Toggle.jsx";
import {SaveButton} from "../ButtonsBlocks/SaveButton.jsx";
import React, {useState} from "react";
import {SimpleInput} from "../SimpleInput.jsx";
import checkEquipmentInput from "../../../services/Validator.js";
import SimpleCheckBoxGroup from "../SimpleCheckBoxGroup.jsx";
import EquipmentAPI from "../../../http/API/EquipmentAPI.js";
import {useFetching} from "../../Hooks/useFetching.js";
import {Loader} from "../Loader/Loader.jsx";
import StyledCheckbox from "../ButtonsBlocks/StyledCheckbox.jsx";

const mainFields = [
    {name: "name", type: "text", heading: "Equipment name"},
    {name: "vps_equipment_id", type: "text", heading: "VPS equipment ID", units: "Leave empty if none"},
    {name: "unit_service_time", type: "text", heading: "Unit service time", units: "hours"},
    {name: "oil_service_time", type: "text", heading: "Oil service time", units: "hours"},
    {name: "sampling_date", type: "date", heading: "Last sampling date"},
    {name: "oil_quantity_in_system", type: "text", heading: "Oil quantity in system", units: "liters"},
    {name: "daily_top_up", type: "text", heading: "Daily top up", units: "liters"},
    {name: "fuel_in_use", type: "text", heading: "Fuel in use", units: "i.e. LSMGO"},
];
const additionalDataFields = [
    {name: "equipment_type", type: "text", heading: "Equipment type", units: "Main Generating Engine #1"},
    {name: "equipment_type_short", type: "text", heading: "Short name", units: "i.e. MGE #1",},
    {name: "manufacturer", type: "text", heading: "Manufacturer/Model", units: "i.e. Wartsila / 9L50DF",},
    {name: "oil_brand", type: "text", heading: "Oil brand", units: "i.e. Chevron",},
    {name: "oil_grade", type: "text", heading: "Oil grade", units: "i.e. Taro 20 DP 40",},
]
const defaultData =
    {
        active: true,
        name: '',
        vps_equipment_id: '',
        unit_service_time: '',
        oil_service_time: '',
        sampling_date: new Date(Date.now()).toISOString().split("T")[0],
        oil_quantity_in_system: '',
        daily_top_up: '',
        fuel_in_use: '',
        new_equipment: false,
        equipment_type: '',
        equipment_type_short: '',
        manufacturer: '',
        oil_brand: '',
        oil_grade: '',
        oil_type: 'ENGINE',
        type_specification: '',
    }
const numericValues = ['vps_equipment_id', 'unit_service_time', 'oil_service_time', 'oil_quantity_in_system', 'daily_top_up'];

export const AddEquipmentForm = ({showAddEquipmentForm, onFormClose, onSuccessAdding}) => {
    const [newEquipmentData, setNewEquipmentData] = useState(defaultData);
    const [isNoVpsIdEquipment, setNoVpsIdEquipment] = useState(false);
    const [saveEquipment, saveEquipmentLoading] = useFetching(async () => {
        const res = await EquipmentAPI.saveNewEquipment(newEquipmentData)
        if (res.status === 200) {
            onSuccessAdding(newEquipmentData)
            onFormClose()
            setNewEquipmentData(defaultData)
        }
    });
    const handleNewEquipmentToggle = () => {
        setNoVpsIdEquipment(!isNoVpsIdEquipment);
        setNewEquipmentData((prevEquipment) => ({
            ...prevEquipment, new_equipment: !prevEquipment.new_equipment,
        }));
    }


    const handleChange = (e) => {
        let {name, value} = e.target;
        const maxLength = checkEquipmentInput(name);
        if (numericValues.includes(name)) {
            const numericValue = value.replace(/[^0-9]/g, "");
            if (numericValue.length > maxLength) {
                return;
            }
            setNewEquipmentData((prevEquipment) => ({
                ...prevEquipment, [name]: numericValue,
            }));
            return;
        }
        if (value.length > maxLength) {
            return;
        }
        setNewEquipmentData((prevEquipment) => ({
            ...prevEquipment, [name]: value,
        }));
    }

    const handleOilTypeChange = (type) => {
        setNewEquipmentData((prevEquipment) => ({
            ...prevEquipment, oil_type: type,
        }));
    }

    const handleTypeSpecificationChange = (typeSpecification) => {
        setNewEquipmentData((prevEquipment) => ({
            ...prevEquipment, type_specification: typeSpecification,
        }));
    }

    if (!showAddEquipmentForm) {
        return null;
    }

    return (
        <>
            {saveEquipmentLoading && <Loader/>}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-start"
                 onClick={onFormClose}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="bg-surfaceLight p-6 rounded-lg shadow-lg w-[650px] h-fit overflow-y-auto relative scrollbar-hide
                     text-xs">
                    <button className={"absolute top-0 right-0 p-2"}>
                        <IoIosClose size={30} color={"#FF9F43"} onClick={onFormClose}/>
                    </button>
                    <h2 className="text-primaryText text-2xl font-semibold mb-4">
                        Add equipment form
                    </h2>
                    <div className="flex justify-end space-x-10 mb-4">
                        <SaveButton handleSave={saveEquipment}></SaveButton>
                    </div>
                    <div className="overflow-y-auto max-h-fit">
                        {mainFields.map(({name, type, heading, units}) => (
                            <SimpleInput key={name} name={name} type={type} heading={heading}
                                         units={units} value={newEquipmentData[name]}
                                         onChange={handleChange}></SimpleInput>))}
                        <SimpleInput
                            heading={'New equipment?'}
                        >
                            <StyledCheckbox onChange={handleNewEquipmentToggle}
                                            checked={isNoVpsIdEquipment}
                                            label={'Select and fill up if you DON\'T have VPS ID'}
                            ></StyledCheckbox>
                        </SimpleInput>
                        <fieldset hidden={!isNoVpsIdEquipment}>
                            {additionalDataFields.map(({name, type, heading, units}) => (
                                <SimpleInput key={name} name={name} type={type} heading={heading}
                                             units={units} value={newEquipmentData[name]}
                                             onChange={handleChange}></SimpleInput>))}
                            <SimpleCheckBoxGroup checked={newEquipmentData.oil_type}
                                                 text={newEquipmentData.type_specification}
                                                 onOilChange={handleOilTypeChange}
                                                 onTypeSpecificationChange={handleTypeSpecificationChange}
                            >
                            </SimpleCheckBoxGroup>
                        </fieldset>
                    < /div>
                    <div/>

                </div>

            </div>
        </>
    )
}