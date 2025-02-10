import {Equipment} from "./Equipment.jsx";

import {EquipmentTableFunctionsBlock} from "./EquipmentTableFunctionsBlock.jsx";
import {CommonDatePicker} from "./CommonDatePicker.jsx";
import {TableGrid} from "./TableGrid.jsx";
import {useFetching} from "../../Hooks/useFetching.js";
import EquipmentAPI from "../../../http/API/EquipmentAPI.js";
import {Loader} from "../Loader/Loader.jsx";


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

    const [generatePdfList, generatePdfListLoading] = useFetching(async (activeEquipment) => {
        await EquipmentAPI.generatePdfList(activeEquipment);
    })

    const filterActiveEquipment = (equipmentList) => {
        if (equipmentList.length === 0) {
            return [];
        }
        return equipmentList.filter((equipment) => equipment.active);
    }

    const handleDateChange = (mainDate) => {
        const activeEquipment = filterActiveEquipment(equipmentData);
        onDateChange(activeEquipment, mainDate);
    }

    return (
        <>
            {(generatePdfListLoading) && <Loader/>}
            <div
                className="px-6 pt-10 pb-10 bg-background bg-opacity-35 rounded-lg shadow-lg text-sm relative m-3 mb-10">
                <div className="text-highlightText text-2xl font-semibold mb-4">Equipment Table</div>
                <CommonDatePicker handleDateChange={handleDateChange}
                                  hidden={equipmentData.length === 0}></CommonDatePicker>
                <EquipmentTableFunctionsBlock hidden={equipmentData.length === 0}
                                              onSearch={onSearch}
                                              onDeselect={onDeselect}
                                              onShowNewEquipment={onShowNewEquipment}
                                              handleSorting={onSort}
                                              handleActiveSendToPrinter={() => generatePdfList(filterActiveEquipment(equipmentData))}
                                              handleSecretCode={handleSecretCode}
                >
                </EquipmentTableFunctionsBlock>
                <div className="bg-background rounded-md p-4 border border-borderDark">
                    <TableGrid></TableGrid>
                    <div className="space-y-2">
                        {equipmentData.length === 0 ?
                            <div className={'message text-highlightText font-semibold text-xl'}>No equipment in
                                list</div> :
                            equipmentData.map((equipment, index) => (
                                    <Equipment
                                        key={equipment.id + 'eq' + index}
                                        index={index}
                                        equipmentData={equipment}
                                        onEquipmentEdit={onEquipmentEdit}
                                        onDelete={onDelete}
                                    ></Equipment>
                                )
                            )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default EquipmentTable;



