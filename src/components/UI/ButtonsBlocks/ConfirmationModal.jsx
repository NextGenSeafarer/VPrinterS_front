import {IoIosClose} from "react-icons/io";

export const ConfirmationModal = ({head, body, highlightText, onConfrim, isOpen, onClose}) => {

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="fixed inset-0 bg-surfaceLight bg-opacity-50 flex items-center justify-center z-50 space-y-0 text-xs"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}>
                <div className="bg-surfaceDark pt-12 px-10 pb-20 rounded-lg shadow-lg relative w-fit space-y-2"
                     onClick={(e) => e.stopPropagation()}>
                    <button className={"absolute top-0 right-0 p-2"}
                            onClick={onClose}>
                        <IoIosClose size={30} color={"#FF9F43"}/>
                    </button>
                    <h2 className="text-xl font-bold text-highlightText text-start">{head}</h2>
                    <div className={"text-md text-primaryText text-start"}>{body}
                        <span className={'text-primaryAccent font-semibold'}>{" " + highlightText}</span> ?
                    </div>
                    <div className={'absolute right-0 bottom-0 p-4'}>
                        <button onClick={onConfrim}
                                className="p-2 rounded-md bg-error text-white hover:bg-red-600 transition flex items-center">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}