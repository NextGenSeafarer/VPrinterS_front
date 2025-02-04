import {useEffect, useState} from "react";
import EquipmentTable from "../components/EquipmentTable.jsx";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {AddEquipmentForm} from "../components/AddEquipmentForm.jsx";
import {useFetching} from "../components/Hooks/useFetching.js";
import EquipmentAPI from "../http/API/EquipmentAPI.js";


export const EquipmentPage = () => {
    const [equipmentData, setEquipmentData] = useState([]);

    const [showNewEquipmentForm, setShowNewEquipmentForm] = useState(false);
    const [fetchEquipmentData, loading, loadingError] = useFetching(async () => {
        const data = await EquipmentAPI.getAllEquipment();
        if (data) {
            setEquipmentData(data);
        }

    });

    const handleEquipmentEdit = (updatedEquipment) => {
        setEquipmentData((prevEquipmentData) =>
            prevEquipmentData.map((equipment) =>
                equipment.id === updatedEquipment.id ? {...updatedEquipment} : {...equipment}
            )
        );
    };

    const handleDateChange = (activeEquipmentList, mainDate) => {
        setEquipmentData((prevData) =>
            prevData.map((equipment) =>
                equipment.active ? {...equipment, sampling_date: mainDate} : equipment
            )
        );
    }
    const handleDeselectSelectToggle = () => {
        setEquipmentData((prevEquipmentData) =>
            prevEquipmentData.map((equipment) =>
                equipment.active ? {...equipment, active: false} : {...equipment, active: true}));
    }


    const handleShowNewEquipment = () => {
        setShowNewEquipmentForm(true);
    }

    const handleHideNewEquipment = () => {
        setShowNewEquipmentForm(false);
    }

    const addNewElementToTable = (newEquipment) => {
        setEquipmentData((prevEquipmentData) => [...prevEquipmentData, {...newEquipment}]);
    };
    const handleDeleteEquipment = async (id) => {
        const res = await EquipmentAPI.deleteEquipment(id);
        if (res.status === 200) {
            setEquipmentData((prevEquipmentData) =>
                prevEquipmentData.filter(x => x.id !== id)
            );
        }
    }

    const handleSortingEquipment = (sort) => {
        switch (sort) {
            case 'new' :
                setEquipmentData([...equipmentData].sort((a, b) => b['created_at'].localeCompare(a['created_at'])));
                break;
            case 'old' :
                setEquipmentData([...equipmentData].sort((a, b) => a['created_at'].localeCompare(b['created_at'])));
                break;
            case 'vps_equipment_id' :
                setEquipmentData([...equipmentData].sort((a, b) => a['vps_equipment_id'] - b['vps_equipment_id']));
                break;
            default:
                setEquipmentData([...equipmentData].sort((a, b) => a[sort].localeCompare(b[sort])));
        }

    }

    useEffect(() => {
        fetchEquipmentData()
    }, [])


    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <EquipmentTable
                equipmentData={equipmentData}
                onEquipmentEdit={handleEquipmentEdit}
                onShowNewEquipment={handleShowNewEquipment}
                onDelete={handleDeleteEquipment}
                onDateChange={handleDateChange}
                onDeselect={handleDeselectSelectToggle}
                onSort={handleSortingEquipment}
            />

            <AddEquipmentForm showAddEquipmentForm={showNewEquipmentForm}
                              onFormClose={handleHideNewEquipment}
                              onSuccessAdding={() => {
                                  addNewElementToTable();
                                  fetchEquipmentData();
                              }}></AddEquipmentForm>


        </>
    )
}