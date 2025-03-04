import {CiEdit} from "react-icons/ci";


export const EditButton = ({setIsEditing, className, text}) => {
    return (
        <>
            <button
                onClick={() => setIsEditing(true)}
                className={`text-primaryText flex flex-row gap-2 hover:translate-x-0.5 transition items-center bg-warning rounded-md p-2 hover:bg-surfaceDark ${className}`}
            >
                <CiEdit size={20}/>
                {text === null || text === undefined ? "Edit" : text}
            </button>
        </>
    )
}