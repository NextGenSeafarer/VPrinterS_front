import $api from "../axiosConfig.js";
import {API_GENERATED_PDF_URL} from "../APIendpoints.js";


export default class PrinterAPI {

    static async getAllPdfs() {
        const response = await $api.get(API_GENERATED_PDF_URL);
        return response.data;
    }

    static async downloadPdf(id) {
        const response = await $api.get(API_GENERATED_PDF_URL + `/${id}`, {responseType: 'blob'})
        const blob = new Blob([response.data], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0];
        const link = document.createElement('a');
        link.href = url;
        link.download = 'vprinters_' + formattedDate + '.pdf';
        link.click();
        window.URL.revokeObjectURL(url);
        return response;
    }

    static async deletePdf(id) {
        return $api.delete(API_GENERATED_PDF_URL + `/${id}`);
    }
}

