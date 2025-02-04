import $api from "../axiosConfig.js";
import {API_GENERATED_PDF_URL} from "../APIendpoints.js";


export default class PrinterAPI {

    static async getAllPdfs() {
        return $api.get(API_GENERATED_PDF_URL);
    }
}

