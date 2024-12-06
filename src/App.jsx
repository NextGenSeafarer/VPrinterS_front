import './App.css'
import {Header} from "./components/Header.jsx";
import {Wrapper} from "./components/UI/Wrapper.jsx";
import {Outlet} from "react-router-dom";
import {StrictMode} from "react";


function App() {

    return (
        <>
            <StrictMode>
            <Wrapper>
                <Header/>
                <Outlet/>
            </Wrapper>
            </StrictMode>
        </>
    );
}

export default App
