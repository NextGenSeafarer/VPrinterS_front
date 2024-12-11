import './App.css'
import {Header} from "./components/Header.jsx";
import {Wrapper} from "./components/UI/Wrapper.jsx";
import {Outlet} from "react-router-dom";
import {StrictMode} from "react";
import {AuthProvider} from "./services/AuthProvider.jsx";


function App() {


    return (
        <>
            <StrictMode>
                <AuthProvider>
                    <Wrapper>
                        <Header/>
                        <Outlet/>
                    </Wrapper>
                </AuthProvider>
            </StrictMode>
        </>
    );
}

export default App
