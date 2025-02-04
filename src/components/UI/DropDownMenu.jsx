import {useState} from "react";


const DropdownMenu = ({onOpenModal, onDelete}) => {


    const [isDropDownListOpen, setDropDownListOpen] = useState(false);


    return (
        <div
            className="relative inline-block text-left"
            onMouseEnter={() => setDropDownListOpen(true)}
            onMouseLeave={() => setDropDownListOpen(false)}
        >

            {/* Dropdown Button */}
            <button className="bg-primaryAccent bg-opacity-80 text-highlightText px-4 py-2 rounded-xl shadow-md">
                Options
            </button>

            {/* Dropdown Menu */}
            {isDropDownListOpen && (
                <div
                    className="absolute top-0 translate-x-[-50%] left-[50%] w-24 bg-surfaceLight rounded-xl shadow-lg z-50 text-center">
                    <ul className=" text-primaryText">
                        <li
                            className="px-4 py-2 hover:bg-secondaryAccent cursor-pointer rounded-t-xl"
                            onClick={onOpenModal}
                        >
                            Details
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-secondaryAccent cursor-pointer"
                            onClick={() => alert('Edit option selected')}
                            /*{TODO: think about how to handle groups}*/
                        >
                            Groups
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-secondaryAccent cursor-pointer rounded-b-xl"
                            onClick={onDelete}
                        >
                            Delete
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;
