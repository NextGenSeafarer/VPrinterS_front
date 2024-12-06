import {Equipment} from "./Equipment.jsx";
import {useEffect, useState} from "react";
import $api from "../http/axiosConfig.js";


const EquipmentTable = ({equipmentData}) => {

    const [mainDate, setMainDate] = useState('');
    //TODO: FINISH THINKING HOW TO CHANGE ALL DATES BY ONE INPUT

    const handleMainDateChange = (e) => {
        setMainDate(e.target.value);
    }
    const handleEquipmentChange = (e) => {
        console.log(e.target.value);
    }


    return (
        <div className="p-6 bg-surfaceLight rounded-lg shadow-lg bg-opacity-70 text-sm relative">
            <h2 className="text-primaryText text-2xl font-semibold mb-4">Equipment Table</h2>
            <div className={'w-fit justify-items-end absolute top-0 right-0 pr-6 pt-2'}>
                <div className={'text-primaryText font-bold'}>You can set sampling date for all here</div>
                <input type={'date'}
                       className="w-fit bg-primaryAccent bg-opacity-80 text-black p-1 border-2 border-black rounded mt-2 hover:bg-primaryAccent hover:border-black"
                       value={mainDate}
                       onChange={handleMainDateChange}
                />
            </div>
            <div className="bg-background rounded-md p-4 border border-borderDark">
                <div className="grid grid-cols-[240px_repeat(6,_1fr)_80px] gap-2 text-primaryText mb-2 border-b border-borderLight pb-2 text-center">
                    <div className="font-semibold">Name</div>
                    <div className="font-semibold">VPS ID</div>
                    <div className="font-semibold">Oil Quantity
                        <div className={'text-secondaryAccent'}>liters</div>
                    </div>
                    <div className="font-semibold">Unit Service Time
                        <div className={'text-secondaryAccent'}>hours</div>
                    </div>
                    <div className="font-semibold">Oil Service Time
                        <div className={'text-secondaryAccent'}>hours</div>
                    </div>
                    <div className="font-semibold">Sampling Date

                    </div>

                    <div className="font-semibold">...</div>
                    <div className="font-semibold">Print</div>
                </div>

                <div className="space-y-2">
                    {equipmentData.map((equipment) => (
                        <Equipment key={equipment.id} equipmentData={equipment} onEquipmentEdit={handleEquipmentChange}></Equipment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EquipmentTable;
