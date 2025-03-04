import {useState} from "react";

export const CommonDatePicker = ({hidden, handleDateChange, className}) => {
    const [mainDate, setMainDate] = useState(new Date(Date.now()).toISOString().split("T")[0]);


    return (
        <>
            <div className={`w-fit absolute top-0 right-0 flex items-center gap-2 text-xs ${className}`}>
                <div hidden={hidden} className="text-highlightText">
                    Last sampling date
                </div>
                <input
                    value={mainDate}
                    onChange={(e) => {
                        setMainDate(e.target.value)
                        handleDateChange(e.target.value)
                    }
                }
                    hidden={hidden}
                    type={'date'}
                    className="w-fit text-highlightText p-1 rounded"
                />

            </div>
        </>
    )
}