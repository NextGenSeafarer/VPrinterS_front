import {useEffect, useState} from "react";
import EquipmentTable from "../components/UI/EquipmentPageElements/EquipmentTable.jsx";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {AddEquipmentForm} from "../components/UI/EquipmentPageElements/AddEquipmentForm.jsx";
import {useFetching} from "../components/Hooks/useFetching.js";
import EquipmentAPI from "../http/API/EquipmentAPI.js";
import {InfoModal} from "../components/UI/ButtonsBlocks/InfoModal.jsx";
import {GlobalErrorHandler} from "../services/Errors/GlobalErrorHandler.jsx";



export const EquipmentPage = () => {
    const [equipmentData, setEquipmentData] = useState([]);
    const [fullEquipmentList, setFullEquipmentList] = useState([]);
    const [showNewEquipmentForm, setShowNewEquipmentForm] = useState(false);

    const [fetchEquipmentData, fetchEquipmentLoading] = useFetching(async () => {
        const data = await EquipmentAPI.getAllEquipment();
        setEquipmentData(data);
        setFullEquipmentList(data);
    });
    const [copyEquipment, copyEquipmentLoading] = useFetching(async (copyCode) => {
        await EquipmentAPI.copyEquipment(copyCode);
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
            setFullEquipmentList((prevEquipmentData) =>
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

    const handleSearch = (search) => {
        const cleanSearch = search.toLowerCase().replace(/[^a-zA-Z0-9]/g, "");
        if (cleanSearch.trim() !== '') {
            const filteredEquipments = [...fullEquipmentList].filter(equipment =>
                equipment.name.toLowerCase().replace(/[^a-zA-Z0-9]/g, "").includes(cleanSearch));
            let vpsIdSearch = [];
            if (cleanSearch.replace(/\D/g, "") !== "") {
                vpsIdSearch = [...fullEquipmentList].filter(equipment =>
                    String(equipment.vps_equipment_id || "").replace(/\D/g, "").includes(cleanSearch.replace(/\D/g, ""))
                );
            }
            const sortedResults = [...new Set([...filteredEquipments, ...vpsIdSearch])];
            if (sortedResults.length > 0) {
                setEquipmentData(sortedResults);
            }
        } else {
            setEquipmentData(fullEquipmentList);
        }
    }

    const handleSecretCode = async (secretCode) => {
        if (secretCode === '') {
            return
        }
        await copyEquipment(secretCode);
        await fetchEquipmentData();
    }

    useEffect(() => {
        fetchEquipmentData();
    }, [])



    return (
        <>
            <GlobalErrorHandler></GlobalErrorHandler>
            {(fetchEquipmentLoading || copyEquipmentLoading) && <Loader/>}
            <EquipmentTable
                equipmentData={equipmentData}
                onEquipmentEdit={handleEquipmentEdit}
                onShowNewEquipment={handleShowNewEquipment}
                onDelete={handleDeleteEquipment}
                onDateChange={handleDateChange}
                onDeselect={handleDeselectSelectToggle}
                onSort={handleSortingEquipment}
                onSearch={handleSearch}
                handleSecretCode={handleSecretCode}
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