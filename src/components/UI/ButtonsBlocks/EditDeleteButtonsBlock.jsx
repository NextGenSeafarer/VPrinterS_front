import {CiEdit} from "react-icons/ci";
import {MdDeleteForever} from "react-icons/md";

export const EditDeleteButtonsBlock = ({setIsEditing, handleDelete}) => {
    return (
        <>
            <button
                onClick={() => setIsEditing(true)}
                className={"text-primaryText hover:scale-105 flex flex-col items-center"}
            >
                Edit
                <CiEdit size={30} color={"#FF9F43"}/>
            </button>
            <button
                onClick={handleDelete}
                className={"text-primaryText hover:scale-105 flex flex-col items-center"}
            >
                Delete
                <MdDeleteForever size={30} color={"#D9534F"}/>
            </button>
        </>
    )
}