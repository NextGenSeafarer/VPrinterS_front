import './App.css'
import {Header} from "./components/Header.jsx";
import {Wrapper} from "./components/UI/Wrapper.jsx";
import {Outlet} from "react-router-dom";
import {AuthProvider} from "./services/AuthProvider.jsx";
import {ErrorProvider} from "./services/Errors/ErrorContext.jsx";


function App() {


    return (
        <>
            <ErrorProvider>
                <AuthProvider>
                    <Wrapper>
                        <Header/>
                        <Outlet/>
                    </Wrapper>
                </AuthProvider>
            </ErrorProvider>

        </>
    );
}

export default App
