import {useNavigate} from "react-router-dom";
import validateEmail from "../services/EmailValidator.js";
import {AuthContext} from "../services/AuthContext.jsx";
import {useContext, useEffect, useState} from "react";
import {FaQuestionCircle, FaRegEyeSlash} from "react-icons/fa";
import {FaRegEye} from "react-icons/fa";
import StyledCheckbox from "../components/UI/ButtonsBlocks/StyledCheckbox.jsx";
import TermsModal from "../components/UI/ButtonsBlocks/TermsModal.jsx";

function validatePassword(password, passwordConfirmation) {
    if (!password) {
        return `Password can't be empty`;
    }
    if (password.length < 8) {
        return "The password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "The password must contain at least one uppercase letter (A-Z).";
    }
    if (!/[a-z]/.test(password)) {
        return "The password must contain at least one lowercase letter (a-z).";
    }
    if (!/\d/.test(password)) {
        return "The password must contain at least one digit (0-9).";
    }
    if (!/[@$!%*?&]/.test(password)) {
        return "The password must contain at least one special character (e.g., @$!%*?&).";
    }
    if (password !== passwordConfirmation) {
        return `Passwords are not same`;
    }
    return 'ok';
}


export const RegistrationPage = () => {

    const [emailError, setEmailError] = useState(false);
    const [email, setEmail] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [registrationError, setRegistrationError] = useState('');
    const {registration, isAuthenticated} = useContext(AuthContext);
    const navigate = useNavigate();

    const [checkBoxChecked, setCheckBoxChecked] = useState(false);

    const [termsModalVisible, setTermsModalVisible] = useState(false);

    const handleTermsAndConditionCheckbox = (e) => {
        setCheckBoxChecked(e.target.checked);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError(!validateEmail(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            navigate('/');
            return;
        }
        if (!emailError && !passwordError && email && password && passwordConfirmation && password === passwordConfirmation) {
            setRegistrationError('')
            try {
                await registration(email, password, passwordConfirmation);
                navigate('/login');
            } catch (error) {
                setRegistrationError('Registration failed');
            }
        }
    };

    const handleTermsAndConditionsModal = () => {
        setTermsModalVisible(!termsModalVisible);
    }

    useEffect(() => {
        if (!password && !passwordConfirmation) {
            setPasswordError('');
            return;
        }
        const validationResult = validatePassword(password, passwordConfirmation);
        if (validationResult === 'ok' && password === passwordConfirmation) {
            setPasswordError('')
            return
        }
        setPasswordError(validationResult)
    }, [password, passwordConfirmation])


    return (
        <>
            <div className="flex justify-center items-center h-[calc(100vh-120px)]">
                <div className="bg-surfaceLight p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-primaryText text-2xl font-semibold mb-6 text-center">Registration</h2>
                    {registrationError && <div className={'message text-error'}>{registrationError}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-primaryText mb-1">
                                Email
                            </label>
                            <input
                                name={'email'}
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={`w-full p-2 rounded border ${emailError ? 'border-red-500' : 'border-borderLight'
                                } bg-background text-primaryText`}
                                placeholder="you@example.com"
                                required
                            />
                            {emailError && (
                                <p className="text-error text-sm mt-1">Please enter a valid email address.</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-primaryText mb-1">
                                Password
                            </label>
                            <input
                                name={'password'}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded border border-borderLight bg-background text-primaryText"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password_confirmation" className="block text-primaryText mb-1">
                                Password confirmation
                            </label>
                            <input
                                name={'password_confirmation'}
                                type={showPassword ? 'text' : 'password'}
                                id="password_confirmation"
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="w-full p-2 rounded border border-borderLight bg-background text-primaryText"
                                placeholder="Enter your password once more"
                                required
                            />
                        </div>
                        <p className={'flex items-end justify-end gap-2 text-secondaryText'}> Show passwords
                            {showPassword ?
                                <FaRegEye size={25} className={'text-primaryAccent'}
                                          onMouseEnter={() => setShowPassword(true)}
                                          onMouseLeave={() => setShowPassword(false)}/>
                                :
                                <FaRegEyeSlash size={25} className={'text-primaryAccent'}
                                               onMouseEnter={() => setShowPassword(true)}
                                               onMouseLeave={() => setShowPassword(false)}
                                />
                            }
                        </p>
                        <div className="flex items-center justify-start gap-2">
                            <StyledCheckbox label={'I agree to the terms and conditions'}
                                            onChange={handleTermsAndConditionCheckbox}
                                            checked={checkBoxChecked}
                            ></StyledCheckbox>
                            <FaQuestionCircle className={'text-primaryAccent cursor-help'}
                                              onClick={handleTermsAndConditionsModal}>
                            </FaQuestionCircle>
                        </div>
                        {passwordError && <div className={'message text-error'}>{passwordError}</div>}
                        <button
                            type="submit"
                            className="buttonPrimary bg-primaryAccent"
                            disabled={emailError || !email || !password || password !== passwordConfirmation || !checkBoxChecked || passwordError}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
            {
                termsModalVisible ? <TermsModal onModalOpen={handleTermsAndConditionsModal}></TermsModal> : null
            }
        </>

    );
};