import { useContext } from "react";
import {ErrorContext} from "./ErrorContext.jsx";
import {InfoModal} from "../../components/UI/ButtonsBlocks/InfoModal.jsx";


export const GlobalErrorHandler = () => {
    const { error, clearError } = useContext(ErrorContext);

    return error ? (
        <InfoModal
            header={"Something went wrong ❌"}
            body={error}
            onClose={clearError}
        />
    ) : null;
};
