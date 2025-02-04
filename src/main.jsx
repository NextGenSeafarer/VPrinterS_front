import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MainPage} from "./routes/MainPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import {EquipmentPage} from "./routes/EquipmentPage.jsx";
import PersonalPage from "./routes/PersonalPage.jsx";
import {ProtectedRoute} from "./routes/ProtectedRoute.jsx";
import {RegistrationPage} from "./routes/RegistrationPage.jsx";
import {GeneratedPdfsPage} from "./routes/GeneratedPdfsPage.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {index: true, element: <MainPage />},
            {path: "login", element: <LoginPage />},
            {path: "registration", element: <RegistrationPage />},
            {
                path: "",
                element: <ProtectedRoute />,
                children: [
                    {path: "equipment", element: <EquipmentPage />},
                    {path: "personal", element: <PersonalPage />},
                    {path: "generated_pdfs", element: <GeneratedPdfsPage />}
                ]
            }
        ]
    }
]);


createRoot(document.getElementById('root')).render(

    <RouterProvider router={router}/>

)
