import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MainPage} from "./pages/MainPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import {EquipmentPage} from "./pages/EquipmentPage.jsx";
import PersonalPage from "./pages/PersonalPage.jsx";
import {ProtectedRoute} from "./pages/ProtectedRoute.jsx";
import {RegistrationPage} from "./pages/RegistrationPage.jsx";
import {GeneratedPdfsPage} from "./pages/GeneratedPdfsPage.jsx";
import {EquipmentGroupsPage} from "./pages/EquipmentGroupsPage.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {index: true, element: <MainPage/>},
            {path: "login", element: <LoginPage/>},
            {path: "registration", element: <RegistrationPage/>},
            {
                path: "",
                element: <ProtectedRoute/>,
                children: [
                    {path: "equipment", element: <EquipmentPage/>},
                    {path: "personal", element: <PersonalPage/>},
                    {path: "generated_pdfs", element: <GeneratedPdfsPage/>},
                    {path: "groups", element: <EquipmentGroupsPage/>}
                ]
            }
        ]
    }
]);


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
