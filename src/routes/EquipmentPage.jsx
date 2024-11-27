import {AddUpdateEquipmentForm} from "../components/AddUpdateEquipmentForm.jsx";
import $api from "../http/axiosConfig.js";
import {useEffect, useState} from "react";
import EquipmentTable from "../components/EquipmentTable.jsx";


export const EquipmentPage = () => {
    const equipmentUrl = 'api/equipment';

    async function getAllEquipment() {
        try {
            const response = await $api.get(equipmentUrl)
            setEquipmentData(response.data)
            // console.log(response.data)
        } catch (error) {
            // console.log(error.response)
        }
    }

    const [equipmentData, setEquipmentData] = useState([]);


    useEffect(() => {
        getAllEquipment()
    }, [])



    return (
        <>
            <EquipmentTable equipmentData={equipmentData}/>
            <AddUpdateEquipmentForm equipmentData={equipmentData}></AddUpdateEquipmentForm>
        </>
    )
}