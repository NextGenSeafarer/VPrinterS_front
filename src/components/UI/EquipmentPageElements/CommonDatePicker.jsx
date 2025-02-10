import {useEffect, useState} from "react";

export const CommonDatePicker = ({hidden, handleDateChange}) => {
    const [mainDate, setMainDate] = useState(new Date().toISOString().split('T')[0]);


    return (
        <>
            <div className="w-fit absolute top-0 right-0 pr-6 pt-4 flex items-center gap-3 text-xs">
                <div hidden={hidden} className="text-highlightText font-bold">
                    Date for all samples
                </div>
                <input
                    value={mainDate}
                    onChange={(e) => setMainDate(e.target.value)}
                    hidden={hidden}
                    type="date"
                    className="w-fit text-highlightText p-1 rounded bg-surfaceLight"
                />
                <button hidden={hidden}  className="bg-surfaceDark px-4 py-1 text-highlightText rounded hover:bg-opacity-90 border-surfaceDark border-[1px]
                hover:bg-indigo-400 hover:text-highlightText transition duration-200 ease-in-out hover:translate-x-[2px]"
                        onClick={() => handleDateChange(mainDate)}>Set date
                </button>
            </div>
        </>
    )
}