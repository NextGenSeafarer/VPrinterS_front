import {useEffect, useState} from "react";
import $api from "../http/axiosConfig.js";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {FaQuestionCircle} from "react-icons/fa";
import CopyableField from "../components/UI/CopyableField.jsx";

const PersonalPage = () => {

    const fields = [{
        name: 'ship_name',
        type: 'text',
        label: 'Ship Name',
        length: 45,
        placeholder: 'LNG/C Methane Pioneer'
    }, {name: 'imo', type: 'number', label: 'IMO', length: 7, placeholder: '5233573'}, {
        name: 'customer_name',
        type: 'text',
        label: 'Customer name',
        length: 45,
        placeholder: 'Light blue dragon LTD'
    },
        {name: 'type', type: 'text', label: 'Ship type', length: 35, placeholder: 'LNG/C'},];

    const api = "/api/personal";
    const initialState = {
        ship_name: '', imo: '', customer_name: '', type: '', copy_code: ''
    }
    const [shipDetails, setShipDetails] = useState(initialState);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [copyCodeInfoVisible, setCopyCodeInfoVisible] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);


    const getShipDetails = async () => {
        try {
            setIsLoading(true);
            const response = await $api.get(api)
            setShipDetails(response.data)
        } catch (error) {
            if (error.response.status === 404) {
                setErrorMessage(`Ship's details not found, fill up first ❌`);
                setIsNewUser(true);
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleSave = async () => {
        setSuccessMessage('')
        setErrorMessage('')
        setIsLoading(true);
        try {
            if (isNewUser) {
                await $api.post(api, shipDetails)
                setSuccessMessage('Ships details added successfully ✅')
                setIsNewUser(false)
                await getShipDetails()
            } else {
                await $api.patch(api, shipDetails)
                setSuccessMessage('Ships details updated successfully ✅')
                setIsNewUser(false)
            }
        } catch (error) {
            setErrorMessage('Something went wrong ❌');
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        setSuccessMessage('')
        setErrorMessage('')
        setIsLoading(true);
        try {
            await $api.delete(api)
            setSuccessMessage('Ships details DELETED successfully 🗑️')
            setShipDetails(initialState)
            setIsNewUser(true)
        } catch (error) {
            setErrorMessage('Something went wrong ❌');
        } finally {
            setIsLoading(false)
        }
    }


    const getMaxLength = fields.reduce((acc, field) => {
        acc[field.name] = field.length;
        return acc;
    }, {});

    const handleInputChange = (e) => {
        const {value, name} = e.target;
        const maxLength = getMaxLength[name]
        if (value.length <= maxLength) {
            setShipDetails({...shipDetails, [name]: value});
        }
    }

    useEffect(() => {
        getShipDetails()
    }, [])


    return (

        <div className="max-w-lg mx-auto p-6 bg-surfaceLight rounded-lg shadow-lg space-y-5 w-[750px] relative">
            {isLoading && <Loader className={'absolute z-50'}></Loader>}
            <h2 className="text-2xl font-bold text-primaryText mb-4">Ship Information</h2>
            <span className={'text-info font-bold'}>Data below will be proceeding for labels generation, fill up exactly as you wish to see on the label</span>
            {errorMessage && <p className={'message text-error'}>{errorMessage}</p>}
            {successMessage && <p className={'message text-success'}>{successMessage}</p>}
            {fields.map((item) => (<label className="flex items-center justify-between text-primaryText relative"
                                          key={item}>{item.label}
                <input
                    className={`w-[330px] ${
                        item.name === 'imo'
                            ? shipDetails[item.name].length !== 7
                                ? 'border-error border-2'
                                : 'border-success'
                            : shipDetails[item.name].length < 2
                                ? 'border-error border-2'
                                : 'border-success'
                    }`}
                    type={item.type} name={item.name}
                    placeholder={item.placeholder} value={shipDetails[item.name]} onChange={handleInputChange}/>
            </label>))}

            {shipDetails.copy_code &&
                <div className={'flex flex-row justify-between items-center relative'}>
                <span className={'text-primaryText'}>
                <CopyableField text={shipDetails.copy_code}></CopyableField>
                </span>
                    <FaQuestionCircle className={'text-primaryAccent'}
                                      onMouseEnter={() => setCopyCodeInfoVisible(true)}
                                      onMouseLeave={() => setCopyCodeInfoVisible(false)}>
                    </FaQuestionCircle>
                    {copyCodeInfoVisible && <div
                        className={'absolute bottom-[40px] -right-[120px] bg-primaryAccent z-50 w-36 p-3 text-xs rounded shadow-2xl'}>
                        This is YOUR personal SECRET CODE. By applying some one else SECRET CODE at page EQUIPMENT -
                        you will copy all equipment from vessel you got the code. It will make initial filling of data
                        easy for you

                    </div>}
                </div>
            }
            <div className={'flex flex-row justify-between items-center relative space-y-5'}>
                <button onClick={handleSave}>Save</button>
                <button onClick={handleDelete}>Delete data</button>
            </div>

        </div>);
};

export default PersonalPage;
