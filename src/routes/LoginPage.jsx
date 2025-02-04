import {useContext, useState} from "react";

import {Link, useNavigate} from "react-router-dom";

import {AuthContext} from "../services/AuthContext.jsx";
import validateEmail from "../services/EmailValidator.js";




const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [loginError, setLoginError] = useState('');
    const {login, isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(!validateEmail(e.target.value));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            setLoginError('You are logged in already');
            navigate('/');
            return
        }
        if (!emailError && email && password) {
            setLoginError('')
            try {
                await login(email, password);
                navigate('/');
            } catch (error) {
                setLoginError(error.message);
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-[calc(100vh-120px)]">
            <div className="bg-surfaceLight p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-primaryText text-2xl font-semibold mb-6 text-center">Login</h2>
                {loginError && <div className={'message text-error'}>{loginError}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-primaryText mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className={`w-full p-2 rounded border ${
                                emailError ? 'border-red-500' : 'border-borderLight'
                            } bg-background text-primaryText`}
                            placeholder="you@example.com"
                            required
                        />
                        {emailError && (
                            <p className="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-primaryText mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded border border-borderLight bg-background text-primaryText"
                            placeholder="Your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="buttonPrimary bg-primaryAccent"
                        disabled={emailError || !email || !password}
                    >
                        Login
                    </button>

                </form>

                {/* Ссылка на Forgot Password */}
                <div className="mt-4 text-right hover:translate-x-1 transition duration-300">
                    <Link className={'text-primaryAccent hover:text-error '} to="/reset_password">Forgot
                        password?</Link>
                </div>

                {/* Ссылка на регистрацию */}
                <div className="mt-4 text-right text-primaryText flex justify-end gap-3">
                    {`Don't have an account?`}
                    <Link to="/registration" className="text-primaryAccent hover:text-opacity-90 transition duration-100">
                        Sign up
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default LoginPage;