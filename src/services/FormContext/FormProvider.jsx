
import {createContext, useContext} from "react";

const FormContext = createContext();


export const FormProvider = ({ isEditing, onChange, children, }) => {
    return (
        <FormContext.Provider value={{ isEditing, onChange,}}>
            {children}
        </FormContext.Provider>
    );
};


export const useFormContext = () => {
    return useContext(FormContext);
};
