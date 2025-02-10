import {useContext} from "react";
import {AuthContext} from "../../services/AuthContext.jsx";
import {Link} from "react-router-dom";

export const PersonalDropDown = () => {

    const {logout} = useContext(AuthContext);


    return (
        <>
            <div
                className={'absolute top-0 left-0 w-full min-w-28 text-nowrap flex flex-col bg-borderDark rounded-lg transition duration-300 ' +
                    'z-50 cursor-pointer text-highlightText text-center'}>
                <button onClick={() => alert('attention')}
                        className='hover:bg-primaryAccent rounded-t-lg p-2'>!attention
                </button>
                <Link className='hover:bg-primaryAccent p-2' to={'/personal'}>
                    Edit profile
                </Link>
                <button onClick={logout}
                        className=' hover:bg-primaryAccent rounded-b-lg p-2'>Logout
                </button>


            </div>
        </>
    )
}