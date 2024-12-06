import {useFormContext} from "../../services/FormContext/FormProvider.jsx";

const InputRow = ({name, heading, value, type, units, children}) => {

    const {isEditing, onChange} = useFormContext();
    return (
        <>

            <div className="grid grid-cols-2 py-2 border-b border-borderLight p-1 relative">
                <span className=" text-primaryText capitalize font-medium p-1">{heading}</span>
                {children}
                {isEditing && !children ?
                    (
                        <input
                            className="p-1 border border-borderLight rounded bg-background text-primaryText"
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
                {
                    isEditing ? '' : <span
                        className={'absolute bottom-0 right-0 text-primaryAccent text-xs text-opacity-70'}>{units}</span>
                }

            </div>
        </>
    )

}
export default InputRow;