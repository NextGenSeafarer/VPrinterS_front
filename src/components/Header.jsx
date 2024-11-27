import {useContext} from "react";
import {Link} from "react-router-dom";

import {AuthContext} from "../services/AuthContext.jsx";


export const Header = () => {

    const {isAuthenticated, logout} = useContext(AuthContext);


    return (
        <>
            <header className="bg-background bg-opacity-35 text-primaryText px-6 py-4 shadow-md rounded-xl h-24 m-3">
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

                    <div className="space-x-4 text-xl">
                        {!isAuthenticated ?
                            <>
                                <Link to={"/login"}>
                                    <button className="hover:text-accentCopper">Login</button>
                                </Link>
                            </>
                            :
                            <button onClick={logout} className="hover:text-accentCopper">Logout</button>}
                    </div>
                </div>
            </header>

        </>
    )
}



