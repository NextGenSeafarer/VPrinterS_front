import {useState} from "react";

export const ButtonWithText = ({firstText, secondText, hidden, onClick}) => {

    const [isSelected, setIsSelected] = useState(false);

    const toggleSelection = () => {
        setIsSelected((prev) => !prev);
        onClick();
    };

    return (
        <>
            <button hidden={hidden}
                    className={`bg-info px-4 py-2 text-highlightText rounded hover:bg-opacity-90 w-32 ${isSelected ? 'bg-opacity-100' : 'bg-opacity-60'}`}
                    onClick={toggleSelection}
            >
                {isSelected ? firstText : secondText}
            </button>
        </>
    )
}