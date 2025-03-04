import {useState} from "react";

export const SimpleInput = ({name, type, heading, units, value, children, onChange, className}) => {

    const [showUnits, setShowUnits] = useState(true);

    return (
        <>
            <div className="grid grid-cols-2 relative py-1 items-center">
                <span className="p-1 text-primaryText capitalize font-medium">{heading}</span>
                {children ? children : <input
                    className={`border border-borderLight rounded bg-background text-primaryText ${className}`}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setShowUnits(false)}
                    onBlur={() => setShowUnits(true)}
                />
                }
                <span className={`absolute right-2 text-primaryAccent text-[10px] text-opacity-70 ${!showUnits? 'animate-fade-away' : ''}`}>{units}</span>
            </div>

        </>
    )
}