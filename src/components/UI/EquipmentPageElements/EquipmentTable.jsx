import {useState, useEffect} from "react";
import {Equipment} from "./Equipment.jsx";
import {EquipmentTableFunctionsBlock} from "./EquipmentTableFunctionsBlock.jsx";
import {CommonDatePicker} from "./CommonDatePicker.jsx";
import {TableGrid} from "./TableGrid.jsx";
import {useFetching} from "../../Hooks/useFetching.js";
import EquipmentAPI from "../../../http/API/EquipmentAPI.js";
import {Loader} from "../Loader/Loader.jsx";
import InfiniteScroll from "react-infinite-scroll-component";

const ITEMS_PER_LOAD = 20;

const EquipmentTable = ({
                            equipmentData,
                            onEquipmentEdit,
                            onShowNewEquipment,
                            onDelete,
                            onDateChange,
                            onDeselect,
                            onSort,
                            onSearch,
                            handleSecretCode
                        }) => {
    const [visibleEquipment, setVisibleEquipment] = useState([]);
    const [loadedCount, setLoadedCount] = useState(ITEMS_PER_LOAD);

    useEffect(() => {
        setVisibleEquipment(equipmentData.slice(0, ITEMS_PER_LOAD));
        setLoadedCount(ITEMS_PER_LOAD);
    }, [equipmentData]);

    const loadMoreItems = () => {
        const nextItems = equipmentData.slice(0, loadedCount + ITEMS_PER_LOAD);
        setVisibleEquipment(nextItems);
        setLoadedCount(nextItems.length);
    };

    const [generatePdfList, generatePdfListLoading] = useFetching(async (activeEquipment) => {
        await EquipmentAPI.generatePdfList(activeEquipment);
    });

    const filterActiveEquipment = (equipmentList) => {
        if (equipmentList.length === 0) return [];
        return equipmentList.filter((equipment) => equipment.active);
    };

    const handleDateChange = (mainDate) => {
        const activeEquipment = filterActiveEquipment(equipmentData);
        onDateChange(activeEquipment, mainDate);
    };

    return (<>
            {generatePdfListLoading && <Loader/>}
            <div className="px-6 pt-10 pb-36 bg-background bg-opacity-45 rounded-lg shadow-lg relative m-3 mb-10">
                <div className="text-highlightText text-2xl font-semibold mb-4">Equipment Table</div>

                <CommonDatePicker handleDateChange={handleDateChange} hidden={equipmentData.length === 0} className={'pr-6 pt-4'}/>

                <EquipmentTableFunctionsBlock
                    hidden={equipmentData.length === 0}
                    onSearch={onSearch}
                    onDeselect={onDeselect}
                    onShowNewEquipment={onShowNewEquipment}
                    handleSorting={onSort}
                    handleActiveSendToPrinter={() => generatePdfList(filterActiveEquipment(equipmentData))}
                    handleSecretCode={handleSecretCode}
                />

                {visibleEquipment.length === 0 ?
                    <div className="message text-highlightText font-semibold text-xl">Equipment list is empty</div> :
                    <div className="bg-background rounded-md p-4 border border-borderDark">
                        <TableGrid/>
                        <InfiniteScroll
                            dataLength={visibleEquipment.length}
                            next={loadMoreItems}
                            hasMore={visibleEquipment.length < equipmentData.length}
                            loader={<Loader/>}
                        >
                            {visibleEquipment.map((equipment, index) => (<Equipment
                                    key={equipment.id + 'eq' + index}
                                    index={index}
                                    equipmentData={equipment}
                                    onEquipmentEdit={onEquipmentEdit}
                                    onDelete={onDelete}
                                    deleteButtonText={'Delete'}
                                />))}
                        </InfiniteScroll>
                    </div>

                }


            </div>
        </>);
};

export default EquipmentTable;
