
const StyledCheckbox = ({label, onChange, checked}) => {

    return (
        <label className="flex items-center space-x-3 cursor-pointer select-none">
            <div
                className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center
                ${checked ? "bg-primaryAccent border-primaryAccent" : "bg-surfaceLight border-surfaceDark"}
                transition-all duration-300`}
            >
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                />
                {checked && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 text-surfaceLight"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.5 12.75l5.25 5.25L19.5 8.25a.75.75 0 00-1.06-1.06l-8.19 8.19-4.19-4.19a.75.75 0 10-1.06 1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </div>
            <span className="text-primaryText font-medium">{label}</span>
        </label>
    );
};

export default StyledCheckbox;
