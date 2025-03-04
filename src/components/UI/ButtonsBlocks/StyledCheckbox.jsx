import { TiTick } from "react-icons/ti";
const StyledCheckbox = ({label, onChange, checked, className}) => {

    return (
        <label className={`flex items-center cursor-pointer select-none ${className}`}
        onClick={onChange}
        >
            <div
                className={`relative w-5 h-5 rounded-md border-[0.5px] flex items-center justify-center
                ${checked ? "bg-primaryAccent border-primaryAccent" : "bg-highlightText border-surfaceDark"}
                transition duration-300 hover:bg-primaryAccent hover:bg-opacity-90`}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                {checked && (
                    <TiTick size={16} color={'#102A3D'}/>

                )}
            </div>
            <span className="text-primaryText font-medium ml-2">{label}</span>
        </label>
    );
};

export default StyledCheckbox;
