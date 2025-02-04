export const SimpleInput = ({name, type, heading, units, value, children, onChange, className}) => {
    return (
        <>
            <div className="grid grid-cols-2 py-2 border-b border-borderLight relative">
                <span className=" text-primaryText capitalize font-medium p-1">{heading}</span>
                {children ? children : <input
                    className={`p-0.5 mb-2 border border-borderLight rounded bg-background text-primaryText ${className}`}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                />
                }

                <span className={'absolute bottom-0 right-0 text-primaryAccent text-xs text-opacity-70'}>{units}</span>

            </div>

        </>
    )
}