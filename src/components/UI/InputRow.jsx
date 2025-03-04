import {useFormContext} from "../../services/FormContext/FormProvider.jsx";

const InputRow = ({name, heading, value, type, units, children, className}) => {

    const {isEditing, onChange} = useFormContext();
    return (
        <>

            <div className={`grid grid-cols-2 border-b border-borderLight relative py-1 items-center`}>
                <span className="p-1 text-highlightText capitalize font-medium">{heading}</span>
                {children}
                {isEditing && !children ?
                    (
                        <input
                            className={`border border-borderLight rounded bg-background text-primaryText ${className} ${(value === '0' || value === '') ? 'border-error border-2 animate-pulse' : null}`}
                            value={value}
                            name={name}
                            type={type}
                            onChange={onChange}
                        />)
                    :
                    (
                        <span className="text-secondaryText p-1">{value}</span>
                    )
                }
                <span className={`absolute right-0 bottom-0 text-primaryAccent text-[8px] text-opacity-70 ${isEditing? 'animate-fade-away' : null}`}>{units}</span>

            </div>
        </>
    )

}
export default InputRow;