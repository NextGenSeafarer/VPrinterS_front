import {Equipment} from "./Equipment.jsx";
import {useState} from "react";
import $api from "../http/axiosConfig.js";
import {API_PRINTER_URL_GENERATE_PDF} from "../http/APIendpoints.js";
import {InfoModal} from "./UI/ButtonsBlocks/InfoModal.jsx";
import {Link} from "react-router-dom";
import {Loader} from "./UI/Loader/Loader.jsx";
import {ButtonWithText} from "./UI/Loader/ButtonWithText.jsx";
import {SortBlock} from "./UI/SortBlock.jsx";


const EquipmentTable = ({
                            equipmentData,
                            onEquipmentEdit,
                            onShowNewEquipment,
                            onDelete,
                            onDateChange,
                            onDeselect,
                            onSort
                        }) => {

    const [modalContent, setModalContent] = useState({
        header: null,
        body: null,
        children: null,
    });
    const sortOptions = [
        {value: 'name', name: "Name"},
        {value: 'vps_equipment_id', name: "VPS ID"},
        {value: 'sampling_date', name: "Sampling date"},
        {value: 'new', name: "From newest"},
        {value: 'old', name: "From oldest"},
    ];

    const [selectedSort, setSelectedSort] = useState('');


    const [modalShow, setModalShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleEquipmentChange = (equipment) => {
        onEquipmentEdit(equipment);
    };

    const filterActiveEquipment = (equipmentList) => {
        if (equipmentList.length === 0) {
            return [];
        }
        return equipmentList.filter((equipment) => equipment.active);
    }

    const handleActiveSendToPrinter = async () => {
        const activeEquipment = filterActiveEquipment(equipmentData)
        await sendActiveToPrinter(activeEquipment);
    };

    const [mainDate, setMainDate] = useState(new Date());


    const handleDateChange = () => {
        const activeEquipment = filterActiveEquipment(equipmentData);
        onDateChange(activeEquipment, mainDate);
    }

    const handleSorting = (sort) => {
        setSelectedSort(sort);
        onSort(sort);
    }

    const sendActiveToPrinter = async (activeEquipmentList) => {
        setModalContent(null);
        setModalShow(false);
        if (activeEquipmentList.length > 0) {
            try {
                setIsLoading(true);
                const response = await $api.post(API_PRINTER_URL_GENERATE_PDF, activeEquipmentList, {responseType: 'blob'})
                const blob = new Blob([response.data], {type: 'application/pdf'});
                const url = window.URL.createObjectURL(blob);
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().split('T')[0];
                // Создаем ссылку и симулируем клик для скачивания
                const link = document.createElement('a');
                link.href = url;
                link.download = 'vprinters_' + formattedDate + '.pdf';
                link.click();
                window.URL.revokeObjectURL(url);
                setModalContent({
                    header: 'Downloading started..',
                    body: 'If nothing happened - check Generated PDF\'s page',
                    children: (
                        <button className={'buttonPrimary bg-primaryAccent'}>
                            <Link to="/generated_pdfs">
                                Generated PDF's
                            </Link>
                        </button>
                    ),
                });
                setModalShow(true)
            } catch (err) {
                setModalShow(true)
                setModalContent({
                    header: 'Something went wrong ❌',
                    body: 'Fill up personal page first',
                    children: (
                        <button className={'buttonPrimary bg-primaryAccent'}>
                            <Link to="/personal">
                                Personal page
                            </Link>
                        </button>
                    ),
                });
            } finally {
                setIsLoading(false);
            }
        }
    }

    if (isLoading) {
        return <Loader className={'absolute inset-0'}/>;
    }

    return (
        <div className="p-6 bg-surfaceLight rounded-lg shadow-lg bg-opacity-70 text-sm relative m-3 mb-10">
            {modalShow && (
                <InfoModal
                    header={modalContent.header}
                    body={modalContent.body}
                >
                    {modalContent.children}
                </InfoModal>
            )}

            <h2 className="text-highlightText text-2xl font-semibold mb-4">Equipment Table</h2>
            <div className="w-fit absolute top-0 right-0 pr-6 pt-2 flex items-center gap-3">
                <div hidden={equipmentData.length === 0} className="text-highlightText font-bold">
                    Date for all samples
                </div>
                <input
                    value={mainDate}
                    onChange={(e) => setMainDate(e.target.value)}
                    hidden={equipmentData.length === 0}
                    type="date"
                    className="w-fit text-highlightText p-1 rounded bg-borderLight"
                />
                <button className="bg-primaryAccent px-2 py-1 text-highlightText rounded hover:bg-opacity-90"
                        onClick={handleDateChange}>Set for all active
                </button>
            </div>


            <div className="flex justify-between mb-4 items-center mt-8">
                <div className="flex gap-3">
                    <SortBlock hidden={equipmentData.length === 0} options={sortOptions} value={selectedSort}
                               defaulValue={'Sort by'}
                               onChange={handleSorting}></SortBlock>
                    <input hidden={equipmentData.length === 0}
                           className="bg-surfaceLight px-4 py-2 rounded border-2 border-borderDark"
                           placeholder="Search.."
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        className="bg-success px-4 py-2 text-highlightText rounded hover:bg-opacity-90"
                        onClick={onShowNewEquipment}
                    >
                        Add new equipment
                    </button>
                    <ButtonWithText hidden={equipmentData.length === 0} firstText={'Select all'}
                                    secondText={'Deselect all'} onClick={onDeselect}></ButtonWithText>
                    <button hidden={equipmentData.length === 0}
                            className="bg-error px-4 py-2 text-highlightText rounded hover:bg-opacity-90"
                            onClick={handleActiveSendToPrinter}
                    >
                        Send to printer!
                    </button>
                </div>
            </div>


            <div className="bg-background rounded-md p-4 border border-borderDark">
                <div
                    className="grid grid-cols-[240px_repeat(6,_1fr)_80px] gap-2 text-primaryText mb-2 border-b border-borderLight pb-2 text-center">
                    <div className="font-semibold">Name</div>
                    <div className="font-semibold">VPS ID</div>
                    <div className="font-semibold">
                        Oil Quantity
                        <div className="text-secondaryAccent">liters</div>
                    </div>
                    <div className="font-semibold">
                        Unit Service Time
                        <div className="text-secondaryAccent">hours</div>
                    </div>
                    <div className="font-semibold">
                        Oil Service Time
                        <div className="text-secondaryAccent">hours</div>
                    </div>
                    <div className="font-semibold">Sampling Date</div>
                    <div className="font-semibold">...</div>
                    <div className="font-semibold">Print</div>
                </div>

                <div className="space-y-2">
                    {equipmentData.map((equipment, index) => (
                        <>
                            <Equipment
                                key={equipment.id}
                                index={index}
                                equipmentData={equipment}
                                onEquipmentEdit={handleEquipmentChange}
                                onDelete={() => onDelete(equipment.id)}
                            ></Equipment>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentTable;



