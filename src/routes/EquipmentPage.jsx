import $api from "../http/axiosConfig.js";
import {useEffect, useState} from "react";
import EquipmentTable from "../components/EquipmentTable.jsx";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {API_EQUIPMENT_URL} from "../http/APIendpoints.js";


export const EquipmentPage = () => {
    const [loading, setLoading] = useState(true)
    const [equipmentData, setEquipmentData] = useState([]);

    async function getAllEquipment() {
        setLoading(true)
        try {
            const response = await $api.get(API_EQUIPMENT_URL)
            setEquipmentData(response.data)
            // console.log(response.data)
        } catch (error) {
            // console.log(error.response)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        getAllEquipment()
    }, [])


    if (loading) {
        return <Loader />
    }

    return (
        <>
            <EquipmentTable equipmentData={equipmentData}/>
        </>
    )
}