import {useFetching} from "../components/Hooks/useFetching.js";
import EquipmentGroupsAPI from "../http/API/EquipmentGroupsAPI.js";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {TableGrid} from "../components/UI/EquipmentPageElements/TableGrid.jsx";
import {Equipment} from "../components/UI/EquipmentPageElements/Equipment.jsx";
import {MdOutlineExpandLess, MdOutlineExpandMore} from "react-icons/md";
import {useEffect, useRef, useState} from "react";
import {GlobalErrorHandler} from "../services/Errors/GlobalErrorHandler.jsx";
import {DeleteButton} from "../components/UI/ButtonsBlocks/DeleteButton.jsx";
import {IoAddOutline} from "react-icons/io5";
import EquipmentAPI from "../http/API/EquipmentAPI.js";
import {IoIosClose, IoIosArrowDown} from "react-icons/io";
import {ConfirmationModal} from "../components/UI/ButtonsBlocks/ConfirmationModal.jsx";
import StyledCheckbox from "../components/UI/ButtonsBlocks/StyledCheckbox.jsx";
import {SaveButton} from "../components/UI/ButtonsBlocks/SaveButton.jsx";
import {CommonDatePicker} from "../components/UI/EquipmentPageElements/CommonDatePicker.jsx";


export const EquipmentGroupsPage = () => {

    const [groups, setGroups] = useState([]);

    const [fetchAllGroups, fetchAllGroupsLoading] = useFetching(async () => {
        const res = await EquipmentGroupsAPI.getAllGroups();
        if (res && res.data) {
            setGroups(res.data)
        }
    })
    const [updateGroup, updateGroupLoading] = useFetching(async (group) => {
        const res = await EquipmentGroupsAPI.updateGroup(group);
    })

    const [deleteGroup, deleteGroupLoading] = useFetching(async (groupId) => {
        const res = await EquipmentGroupsAPI.deleteGroup(groupId);
        if (res && res.status === 200) {
            await fetchAllGroups();
        }
    })


    useEffect(() => {
        fetchAllGroups()
    }, [])

    const handleGroupNameChange = (newName, id) => {
        const oldGroup = groups.find(group => group.id === id);
        if (oldGroup.name !== newName) {
            const updatedGroup = {...oldGroup, name: newName};
            updateGroup(updatedGroup);
            setGroups((prevGroupList) =>
                prevGroupList.map((group) =>
                    group.id === id ? {...group, name: newName} : group));
        }
    }

    const handleDeleteGroup = (groupId) => {
        deleteGroup(groupId);
    }

    return (
        <>
            <GlobalErrorHandler></GlobalErrorHandler>
            {fetchAllGroupsLoading && <Loader/>}

            <div
                className="px-6 pt-10 pb-36 bg-background bg-opacity-45 rounded-lg shadow-lg relative m-3 mb-10 text-xs">
                <div className="text-highlightText text-2xl font-semibold mb-4">Equipment groups</div>
                <GroupsFunctionBlock onCreateGroup={fetchAllGroups}></GroupsFunctionBlock>
                {
                    groups.length > 0 ?
                        groups.map((group) => (
                            <GroupsTable name={group.name} groupId={group.id} key={group.id}
                                         handleGroupNameChange={handleGroupNameChange}
                                         handleDeleteGroup={handleDeleteGroup}
                            />
                        )) :
                        <div className="message text-highlightText font-semibold text-xl">Equipment groups list is
                            empty</div>
                }

            </div>


        </>
    )
}


const GroupsTable = ({name, groupId, handleGroupNameChange, handleDeleteGroup}) => {
    const [expandGroup, setExpandGroup] = useState(false);
    const [equipmentInGroup, setEquipmentInGroup] = useState([]);
    const [groupName, setGroupName] = useState(name);
    const [equipmentNotIncludedInGroup, setEquipmentNotInGroup] = useState([]);
    const [addEquipmentToGroupModal, setAddEquipmentToGroupModal] = useState(false);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [isGroupEquipmentLoaded, setIsGroupEquipmentLoaded] = useState(false);

    const handleExpandGroup = (groupId) => {
        if (!isGroupEquipmentLoaded) {
            fetchGroupEquipment(groupId).then(() => setIsGroupEquipmentLoaded(true));
        }
        setExpandGroup(!expandGroup);
    };


    const [fetchGroupEquipment, fetchGroupEquipmentLoading] = useFetching(async (groupId) => {
        const res = await EquipmentGroupsAPI.getGroupEquipments(groupId);
        if (res && res.data) {
            setEquipmentInGroup(res.data);
            setIsGroupEquipmentLoaded(true);
        }
    });

    const [fetchNotIncludedInGroupEquipment, fetchNotIncludedInGroupLoading] = useFetching(async (groupId) => {
        const res = await EquipmentAPI.fetchNotIncludedInGroupEquipment(groupId);
        if (res && res.data.length > 0) {
            setEquipmentNotInGroup(res.data)
            setAddEquipmentToGroupModal(true);
        }
    })

    const [deleteEquipmentFromGroup, deleteEquipmentFromGroupLoading] = useFetching(async (equipmentId, groupId) => {
        const res = await EquipmentAPI.removeEquipmentFromGroup(equipmentId, groupId);
        if (res && res.status === 200) {
            await fetchGroupEquipment(groupId);
        }
    })

    const [printGroupEquipment, printGroupEquipmentLoading] = useFetching(async (equipmentList) => {
        if (equipmentList.length === 0) return;
        const listToPrint = equipmentList.filter((equipment) => equipment.active);
        await EquipmentAPI.generatePdfList(listToPrint);
        await fetchGroupEquipment(groupId);
    })

    const handleEquipmentEdit = (updatedEquipment) => {
        setEquipmentInGroup((prevEquipmentData) =>
            prevEquipmentData.map((equipment) =>
                equipment.id === updatedEquipment.id ? {...updatedEquipment} : {...equipment}
            )
        );
    };

    const handleDateChange = (date) => {
        if (date) {
            setEquipmentInGroup((prevData) =>
                prevData.map((equipment) =>
                    equipment.active ? {...equipment, sampling_date: date} : equipment
                )
            );
        }
    }


    return <>
        {(fetchGroupEquipmentLoading || fetchNotIncludedInGroupLoading || deleteEquipmentFromGroupLoading || printGroupEquipmentLoading) &&
            <Loader/>}
        {addEquipmentToGroupModal && (<EquipmentModal equipmentList={equipmentNotIncludedInGroup}
                                                      onClose={() => setAddEquipmentToGroupModal(false)}
                                                      header={`${groupName}`}
                                                      groupId={groupId}
                                                      onAssignment={() => fetchGroupEquipment(groupId)}
        ></EquipmentModal>)}
        <ConfirmationModal head={'Confirm group delete'}
                           body={'Do you want to delete group: '}
                           highlightText={groupName}
                           isOpen={deleteConfirmationModal}
                           onClose={() => setDeleteConfirmationModal(false)}
                           onConfrim={() => handleDeleteGroup(groupId)}
        >
        </ConfirmationModal>

        <div
            className={'flex flex-row items-center justify-between gap-3 border bg-surfaceDark bg-opacity-50 border-borderLight p-3 rounded-lg my-4 hover:bg-opacity-70'}>
            <div className={'flex items-center justify-between gap-3'}>
                <input
                    className={'text-highlightText w-[200px] bg-surfaceDark rounded-lg shadow-lg p-2'}
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    onBlur={() => handleGroupNameChange(groupName, groupId)}
                />
                {
                    expandGroup ? <div
                            className={'cursor-pointer font-bold text-info underline underline-offset-4 flex flex-row items-center'}
                            onClick={() => setExpandGroup(!expandGroup)}>Minimize
                            <MdOutlineExpandLess
                                className={'translate-y-0.5 hover:-translate-y-0.5 transition duration-300'}
                                color={'#A5B9B7'} size={20}></MdOutlineExpandLess>
                        </div> :
                        <div
                            className={'cursor-pointer font-bold text-primaryAccent underline underline-offset-4 flex flex-row items-center'}
                            onClick={() => handleExpandGroup(groupId)}>Expand
                            <MdOutlineExpandMore className={'hover:translate-y-1 transition duration-300'} size={20}
                                                 color={'#FF9F43'}></MdOutlineExpandMore>
                        </div>

                }
            </div>
            <div className={'flex items-center justify-between gap-3'}>

                <button onClick={() => fetchNotIncludedInGroupEquipment(groupId)}
                        className="flex flex-row pl-1 pr-2 py-1 bg-surfaceDark text-primaryAccent rounded hover:bg-opacity-90 border-surfaceDark border-[1px]
                            hover:bg-surfaceDark hover:text-highlightText transition duration-200 ease-in-out hover:translate-x-[2px]"
                >
                    <IoAddOutline size={15}/>Add equipment to group
                </button>

                <DeleteButton onClick={() => setDeleteConfirmationModal(true)} size={18}
                              text={'Delete group'}></DeleteButton>

            </div>
            <button className="bg-primaryAccent px-2 py-1 text-surfaceDark rounded hover:bg-opacity-90 border-surfaceDark border-[1px]
                            hover:bg-surfaceDark hover:text-highlightText transition duration-200 ease-in-out hover:translate-x-[2px]"
                    onClick={() => printGroupEquipment(equipmentInGroup)}
                    hidden={!expandGroup}
            >
                Print selected
            </button>
        </div>
        {
            expandGroup && <Group equipmentInGroup={equipmentInGroup}
                                  onDeleteEquipmentFromGroup={(equipmentId) => deleteEquipmentFromGroup(equipmentId, groupId)}
                                  onEquipmentEdit={handleEquipmentEdit} handleDateChange={handleDateChange}></Group>
        }
    </>
}


const EquipmentModal = ({equipmentList, header, onClose, groupId, onAssignment}) => {
    const [scrolled, setScrolled] = useState(false);
    const listRef = useRef(null);
    const [listOfSelected, setListOfSelected] = useState([]);
    const handleScroll = () => {
        if (listRef.current.scrollTop > 10) {
            setScrolled(true);
        }
    };
    const handleAddToSelectedList = (equipmentId) => {
        setListOfSelected((prevSelected) =>
            prevSelected.includes(equipmentId)
                ? prevSelected.filter(id => id !== equipmentId)
                : [...prevSelected, equipmentId]
        );

    }
    useEffect(() => {
    }, [listOfSelected]);

    const [addEquipmentToGroup, addEquipmentToGroupLoading] = useFetching(async () => {
        const res = await EquipmentAPI.assignEquipmentToGroup(groupId, listOfSelected);
        if (res && res.status === 200) {
            onClose();
            onAssignment();
        }
    })


    return (

    <div
        className="fixed inset-0 bg-surfaceLight bg-opacity-50 flex items-center justify-center z-[900]"
        onClick={onClose}
    >
        {addEquipmentToGroupLoading && <Loader/>}
        <div
            className="bg-surfaceLight p-2 rounded-lg shadow-lg relative h-[600px] flex flex-col w-[550px]"
            onClick={(e) => e.stopPropagation()}
        >
            <button className="absolute top-1 right-2" onClick={onClose}>
                <IoIosClose size={30} color={"#FF9F43"}/>
            </button>
            <SaveButton className={'absolute right-4 top-12'} handleSave={addEquipmentToGroup}
                        text={'Add to group'}></SaveButton>
            <h2 className="font-bold text-lg text-primaryAccent mb-12 p-2">{`Group ${header}`}</h2>
            <div className="rounded-lg bg-opacity-80 flex items-center flex-col p-2 relative">
                <div
                    className="grid grid-cols-3 gap-2 text-primaryText mb-2 border-b border-borderLight pb-2 text-center w-full font-semibold text-lg">
                    <div className="text-start">Name</div>
                    <div>VPS ID</div>
                    <div className="text-end">Add</div>
                </div>
            </div>

            <div
                ref={listRef}
                className="flex-grow overflow-y-auto scrollbar-hide px-2 relative"
                onScroll={handleScroll}
            >
                {equipmentList.map((equipment) => (

                    <div
                        key={equipment.id}
                        className="grid grid-cols-3 gap-2 text-primaryText border-b border-opacity-80 border-borderLight text-center text-xs
    hover:bg-borderLight hover:bg-opacity-60 py-1 w-full cursor-pointer pl-2 items-center"
                        onClick={() => handleAddToSelectedList(equipment.id)}
                    >
                        <div className="text-primaryText text-start">{equipment.name}</div>
                        <div className="text-primaryText">{equipment.vps_equipment_id}</div>
                        <div className="flex justify-end">
                            <StyledCheckbox
                                checked={listOfSelected.includes(equipment.id)}
                                onChange={() => handleAddToSelectedList(equipment.id)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                ))}

                <div className="h-10 w-full"></div>
            </div>

            {!scrolled && equipmentList.length > 15 && (
                <div
                    className="sticky transform animate-bounce flex flex-row justify-end mr-2 items-center text-highlightText">
                    <IoIosArrowDown size={30} color={"#FF9F43"}/>Scroll
                </div>
            )}
        </div>
    </div>
)
    ;
};


const Group = ({equipmentInGroup, onDeleteEquipmentFromGroup, onEquipmentEdit, handleDateChange}) => {
    return <>

        <div className="bg-background rounded-md p-4 border border-borderDark relative">
            <CommonDatePicker handleDateChange={handleDateChange} className={'top-10 right-4'}
                              hidden={equipmentInGroup.length === 0}/>
            <TableGrid/>

            {equipmentInGroup.map((equipment, index) => (
                <Equipment key={equipment.id} equipmentData={equipment} index={index}
                           deleteButtonText={'Remove'}
                           onDelete={() => onDeleteEquipmentFromGroup(equipment.id)}
                           onEquipmentEdit={onEquipmentEdit}></Equipment>))
            }


        </div>
    </>
}

const GroupsFunctionBlock = ({onCreateGroup}) => {

    const [groupName, setGroupName] = useState('');

    const [createGroup, createGroupLoading] = useFetching(async () => {
        const res = await EquipmentGroupsAPI.createGroup(groupName);
        if (res && res.status === 200) {
            onCreateGroup(groupName);
            setGroupName('');
        }
    })

    return <>
        <div className={'flex flex-row justify-end items-center gap-3'}>
            <input className={'w-1/8'} value={groupName} placeholder={'Enter group name'}
                   onChange={e => setGroupName(e.target.value)}/>
            <button
                className="px-2 py-1 bg-primaryAccent text-surfaceDark rounded hover:bg-opacity-90 border-surfaceDark border-[1px]
                            hover:bg-surfaceDark hover:text-highlightText transition duration-200 ease-in-out hover:translate-x-[2px]"
                onClick={createGroup}
            >
                Create group
            </button>
        </div>
    </>
}