import { IoSaveOutline } from "react-icons/io5";
export const SaveButton = ({handleSave, className, text}) => {
    return (
        <>
            <button
                onClick={handleSave}
                className={`text-primaryText flex flex-row gap-2 hover:translate-x-0.5 transition items-center bg-success rounded-md p-2 hover:bg-surfaceDark ${className}`}
            >
                <IoSaveOutline size={20}/>
                {text === null || text === undefined ? "Save" : text}
            </button>
        </>
    )
}