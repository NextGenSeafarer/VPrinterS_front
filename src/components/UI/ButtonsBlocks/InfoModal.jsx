import {IoIosClose} from "react-icons/io";
import {useState} from "react";

export const InfoModal = ({header, body, children, onClose}) => {


    return (
        <div
            className="fixed inset-0 bg-surfaceLight bg-opacity-50 flex items-center justify-center z-[900] space-y-0"
            onClick={onClose}>
            <div
                className="bg-surfaceDark w-fit p-10 rounded-lg shadow-lg relative ">
                <div
                    className={'bg-surfaceLight p-10 rounded-lg bg-opacity-80 flex items-center justify-center flex-col space-y-3'}>
                    <button className={"absolute top-0 right-0 p-2"} onClick={onClose}>
                        <IoIosClose size={30} color={"#FF9F43"}/>
                    </button>
                    <h2 className="text-xl font-bold text-highlightText mb-4">{header}</h2>
                    <div className="text-error text-md text-center">
                        {body}
                    </div>
                    <div className={'text-center text-primaryText'}>
                        {children}
                    </div>
                </div>
            </div>
        </div>


    )
}