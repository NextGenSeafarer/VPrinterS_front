import {useEffect, useState} from "react";
import {MdDeleteForever} from "react-icons/md";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {ConfirmationModal} from "../components/UI/ButtonsBlocks/ConfirmationModal.jsx";
import {useFetching} from "../components/Hooks/useFetching.js";
import PrinterAPI from "../http/API/PrinterAPI.js";
import {Fragment} from "react";
import {GlobalErrorHandler} from "../services/Errors/GlobalErrorHandler.jsx";

export const GeneratedPdfsPage = () => {
    const [pdfList, setPdfList] = useState([])
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
    const [getAllPdfs, getAllLoading] = useFetching(async () => {
        const data = await PrinterAPI.getAllPdfs();
        if (data) {
            setPdfList(data.sort((a, b) => b['created_at'].localeCompare(a['created_at'])));
        }
    })
    const [downloadPdf, downloadPdfLoading] = useFetching(async (id) => {
        await PrinterAPI.downloadPdf(id);
    })
    const [deletePdf, deletePdfLoading] = useFetching(async (id) => {
        const response = await PrinterAPI.deletePdf(id);
        if (response.status === 200) {
            setPdfList((prevState) => prevState.filter(x => x.id !== id))
        }

    })

    useEffect(() => {
        getAllPdfs();
    }, [])


    return (
        <>
            <GlobalErrorHandler></GlobalErrorHandler>
            {(getAllLoading || downloadPdfLoading || deletePdfLoading) && <Loader/>}
            <div className="p-6 bg-background bg-opacity-35 rounded-lg shadow-lg text-sm relative m-3 w-1/2 mx-auto">
                <h2 className="text-highlightText text-2xl font-semibold mb-4">Generated PDF's</h2>
                <div className="bg-background rounded-md p-4 border border-borderDark text-primaryText">
                    <table className="table-auto w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-surfaceDark text-white">
                            <th className="p-2 border-b">Name</th>
                            <th className="p-2 border-b">PDF Size (kB)</th>
                            <th className="p-2 border-b">Pages</th>
                            <th className="p-2 border-b">Created</th>
                            <th className="p-2 border-b text-right"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {pdfList.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="message text-xl font-semibold">No saved PDF's yet</td>
                            </tr>
                        ) : (
                            pdfList.map((pdf) => (
                                <Fragment key={pdf.id}>
                                    <ConfirmationModal body={'Delete file confirmation'}
                                                       head={'Do you want to delete'}
                                                       highlightText={pdf.name}
                                                       isOpen={deleteConfirmationModal}
                                                       onClose={() => setDeleteConfirmationModal(false)}
                                                       onConfrim={() => deletePdf(pdf.id)}
                                    >
                                    </ConfirmationModal>

                                    <tr className="hover:bg-surfaceLight transition">
                                        <td className="p-2 border-b">{pdf.name}</td>
                                        <td className="p-2 border-b">{pdf.size}</td>
                                        <td className="p-2 border-b">
                                            {pdf.pages} {pdf.pages > 1 ? 'pages' : 'page'}
                                        </td>
                                        <td className="p-2 border-b w-10">
                                            {pdf.created_at.split('T')[0] + ' ' + pdf.created_at.split('T')[1].split('.')[0]}
                                        </td>
                                        <td className="p-2 border-b text-right">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => downloadPdf(pdf.id)}
                                                    className="p-2 rounded-md bg-info text-white hover:bg-surfaceDark transition">
                                                    Download
                                                </button>
                                                <button
                                                    onClick={() => setDeleteConfirmationModal(true)}
                                                    className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition flex items-center">
                                                    <MdDeleteForever size={20}/>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </Fragment>))
                        )}
                        </tbody>

                    </table>
                </div>
            </div>


        </>
    )

}