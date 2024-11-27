export const Toggle = ({onToggle, isActive}) => {

    return (
        <>
            <div
                onClick={onToggle}
                className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
                    isActive ? 'bg-primaryAccent' : 'bg-surfaceDark'
                }`}
            >
                <div
                    className={`w-6 h-6 bg-highlightText rounded-full shadow-md transform transition duration-300 ${
                        isActive ? 'translate-x-7' : 'translate-x-0'
                    }`}
                ></div>
            </div>
        </>
    )
}


