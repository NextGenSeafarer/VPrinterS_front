import {IoIosClose} from "react-icons/io";

export const ConfirmationModal = ({head, body, highlightText, onConfrim, isOpen, onClose}) => {

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="fixed inset-0 bg-surfaceLight bg-opacity-50 flex items-center justify-center z-50 space-y-0"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}>
                <div className="bg-surfaceDark p-8 rounded-lg shadow-lg relative w-[30%] space-y-2">
                    <button className={"absolute top-0 right-0 p-2"}
                            onClick={onClose}>
                        <IoIosClose size={30} color={"#FF9F43"}/>
                    </button>
                    <h2 className="text-xl font-bold text-highlightText mb-4">{head}</h2>
                    <div className={"text-md text-primaryText"}>{body}
                        <span className={'text-primaryAccent font-semibold'}>{" " + highlightText}</span> ?
                    </div>
                    <div className={'flex items-center justify-between space-y-4 gap-3'}>
                        <button onClick={onConfrim}
                                className="p-2 rounded-md bg-error text-white hover:bg-red-600 transition flex items-center"
                        >
                            Confirm
                        </button>
                        <button onClick={onClose}
                                className="p-2 rounded-md bg-info text-white transition flex items-center"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}