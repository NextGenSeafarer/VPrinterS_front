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
            className="bg-background bg-opacity-35 text-highlightText shadow-md rounded-xl h-24 m-3 relative flex
            align-middle justify-between items-center p-7">

            <Link to={'/'}>
                <img className={'w-[60px] h-[60px]'} src='src/static/logoBig.png' alt={'logo'}></img>
            </Link>

            <nav className="space-x-6">
                <Link to={'/'}>Home</Link>
                <Link hidden={!isAuthenticated} to={'/equipment'}>Equipment</Link>
                <Link hidden={!isAuthenticated} to={'/generated_pdfs'}>Generated PDFs</Link>

            </nav>


            <div className="space-x-6 flex flex-row items-center">
                {!isAuthenticated ? <>
                    <Link to={"/login"}>
                        <button className="hover:text-accentCopper">Login</button>
                    </Link>
                </> : <>

                    <div onMouseEnter={() => setDropDownOpen(true)} onMouseLeave={() => setDropDownOpen(false)}
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
                    </div>

                </>
                }
            </div>

        </header>

    </>)
}



