import {CiEdit} from "react-icons/ci";
import {IoIosClose} from "react-icons/io";

export const SaveCancelButtonsBlock = ({handleSave, handleCancel}) => {
    return (
        <>
            <button
                onClick={handleSave}
                className={"text-primaryText hover:scale-105 flex flex-col items-center"}
            >
                Save
                <CiEdit size={30} color={"#5CB85C"}/>
            </button>
            <button
                onClick={handleCancel}
                className={"text-primaryText hover:scale-105 flex flex-col items-center"}
            >
                Cancel
                <IoIosClose size={30} color={"#D9534F"}/>
            </button>

        </>
    )
}