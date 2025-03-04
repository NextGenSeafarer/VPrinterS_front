import {MdDeleteForever} from "react-icons/md";

export const DeleteButton = ({onClick, size, text, className}) => {
    return (
        <>
            <button
                onClick={onClick}
                className={`text-primaryText flex flex-row gap-2 hover:translate-x-0.5 transition items-center bg-error rounded px-2 py-1 hover:bg-surfaceDark ${className}`}>
                {text === null || text === undefined ? "Delete" : text}
                <MdDeleteForever size={size? size : 15}/>
            </button>
        </>
    )
}