import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider} from "./services/AuthProvider.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MainPage} from "./routes/MainPage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import {EquipmentPage} from "./routes/EquipmentPage.jsx";
import PersonalPage from "./routes/PersonalPage.jsx";


const router = createBrowserRouter([
        {
            path: "/", element: <App/>, children: [
                {index: true, element: <MainPage/>},
                {path: "login", element: <LoginPage/>},
                {path: "equipment", element: <EquipmentPage/>},
                {path: "personal", element: <PersonalPage/>},
            ]
        }
    ]
)


createRoot(document.getElementById('root')).render(

    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>

)
