import './App.css'
import {Header} from "./components/Header.jsx";
import {Wrapper} from "./components/UI/Wrapper.jsx";
import {Outlet} from "react-router-dom";


function App() {

    return (
        <>
            <Wrapper>
                <Header/>
                <Outlet/>
            </Wrapper>

        </>
    );
}

export default App
