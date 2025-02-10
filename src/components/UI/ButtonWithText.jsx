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
                    className={`bg-surfaceLight px-4 py-2 text-highlightText rounded hover:bg-opacity-90 border-surfaceDark text-xs border-[1px]
                            hover:bg-info hover:text-surfaceDark transition duration-200 ease-in-out hover:translate-x-[2px] min-w-[100px]`}
                    onClick={toggleSelection}
            >
                {isSelected ? firstText : secondText}
            </button>
        </>
    )
}