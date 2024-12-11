import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {BiSolidUserCircle} from "react-icons/bi";
import {AuthContext} from "../services/AuthContext.jsx";
import {PersonalDropDown} from "./UI/PersonalDropDown.jsx";
import {BsFillExclamationDiamondFill} from "react-icons/bs";

export const Header = () => {

    const {isAuthenticated, isNewUser} = useContext(AuthContext);
    const userEmail = localStorage.getItem("userEmail");
    const [dropDownOpen, setDropDownOpen] = useState(false);


    return (<>
        <header
            className="bg-background bg-opacity-35 text-highlightText px-6 py-4 shadow-md rounded-xl h-24 m-3 relative">
            <div className="flex items-center justify-between align-middle">

                <Link to={'/'}>
                    <div className="bg-background p-3 rounded-2xl text-highlightAccent font-bold text-2xl">
                        V<span className="text-highlightText">printer</span>S
                    </div>
                </Link>
                <nav className="space-x-6 text-xl">
                    <Link to={'/'}>Home</Link>
                    <Link hidden={!isAuthenticated} to={'/equipment'}>Equipment</Link>
                </nav>


                <div className="space-x-6 flex flex-row items-center">
                    {!isAuthenticated ? <>
                        <Link to={"/login"}>
                            <button className="hover:text-accentCopper">Login</button>
                        </Link>
                    </> : <>

                        <button onMouseEnter={() => setDropDownOpen(true)} onMouseLeave={() => setDropDownOpen(false)}
                                className=" flex flex-col items-center mr-6">
                            <div className="flex items-center space-x-2">
                                {isNewUser ?
                                    (<BsFillExclamationDiamondFill className={'text-error'} size={25}/>) :
                                    <>
                                        <BiSolidUserCircle size={25} className={'relative text-success'}>
                                        </BiSolidUserCircle>
                                    </>
                                }
                                <span className={'relative'}>{userEmail}
                                    {dropDownOpen && <PersonalDropDown></PersonalDropDown>}</span>

                            </div>
                        </button>

                    </>
                    }
                </div>
            </div>
        </header>

    </>)
}



