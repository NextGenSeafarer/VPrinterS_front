import './App.css'
import {Header} from "./components/Header.jsx";
import {Wrapper} from "./components/UI/Wrapper.jsx";
import {Outlet} from "react-router-dom";
import {AuthProvider} from "./services/AuthProvider.jsx";


function App() {


    return (
        <>

                <AuthProvider>
                    <Wrapper>
                        <Header/>
                        <Outlet/>
                    </Wrapper>
                </AuthProvider>

        </>
    );
}

export default App
