import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {BiSolidUserCircle} from "react-icons/bi";
import {AuthContext} from "../services/AuthContext.jsx";
import {PersonalDropDown} from "./UI/PersonalDropDown.jsx";


export const Header = () => {

    const {isAuthenticated} = useContext(AuthContext);
    const userEmail = localStorage.getItem("userEmail");
    const [dropDownOpen, setDropDownOpen] = useState(false);

    return (<>
        <header
            className="bg-background bg-opacity-35 text-primaryText px-6 py-4 shadow-md rounded-xl h-24 m-3 relative">
            <div className="flex items-center justify-between align-middle">

                <Link to={'/'}>
                    <div className="bg-background p-3 rounded-2xl text-highlightAccent font-bold text-2xl">
                        V<span className="text-highlightText">printer</span>S
                    </div>
                </Link>
                <nav className="space-x-8 text-xl text-highlightText">
                    <Link to={'/'}>Home</Link>
                    <Link to={'/equipment'}>Equipment</Link>
                </nav>


                <div className="space-x-12 flex flex-row items-center">
                    {!isAuthenticated ? <>


                        <Link to={"/login"}>
                            <button className="hover:text-accentCopper">Login</button>
                        </Link>
                    </> : <>

                        <button onMouseEnter={() => setDropDownOpen(true)} onMouseLeave={() => setDropDownOpen(false)}
                                className=" flex flex-col items-center mr-6">
                            <div className="flex items-center space-x-2">
                                <BiSolidUserCircle size={25} color="#FF9F43" className={'relative'}>
                                </BiSolidUserCircle>
                                <span className={'relative'}>{userEmail}
                                    {dropDownOpen && <PersonalDropDown></PersonalDropDown>}
                                    </span>

                            </div>

                        </button>

                    </>}
                </div>
            </div>
        </header>

    </>)
}



