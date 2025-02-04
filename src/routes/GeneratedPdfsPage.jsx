import {useEffect, useState} from "react";
import $api from "../http/axiosConfig.js";
import {API_GENERATED_PDF_URL} from "../http/APIendpoints.js";
import {MdDeleteForever} from "react-icons/md";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {InfoModal} from "../components/UI/ButtonsBlocks/InfoModal.jsx";
import {ConfirmationModal} from "../components/UI/ButtonsBlocks/ConfirmationModal.jsx";
import {useFetching} from "../components/Hooks/useFetching.js";
import PrinterAPI from "../http/API/PrinterAPI.js";
import {Fragment} from "react";

export const GeneratedPdfsPage = () => {
    //TODO: after finishing generating PDF to check once more time
    const [pdfList, setPdfList] = useState([])
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [modalContent, setModalContent] = useState({
        header: null,
        body: null,
        children: null,
    });
    const [modalShow, setModalShow] = useState(false);
    const [getAllPdfs, loading, error] = useFetching(async () => {
        const response = await PrinterAPI.getAllPdfs();
        setPdfList(response.data);
    })


    const handleDownload = async (e, id) => {
        setIsLoading(true)
        setModalContent(null);
        setModalShow(false);
        try {
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

            setModalContent({
                header: 'Downloading started..',
                body: 'If nothing happened - please wait..',
                children: <Loader className={'scale-50'}></Loader>
            });
            setModalShow(true)
        } catch (err) {
            setModalContent({
                header: 'Something went wrong ❌',
                body: 'Try again',
                children: <Loader className={'scale-50'}></Loader>
            });
            setModalShow(true)
        } finally {
            setIsLoading(false);
        }
    }
    const deleteItemHandler = (id) => {
        setPdfList(pdfList.filter(x => x.id !== id))
    }

    const handleDelete = async (id) => {
        try {
            await $api.delete(API_GENERATED_PDF_URL + `/${id}`)
            deleteItemHandler(id)
        } catch (error) {
            console.log(error)
        } finally {
            setDeleteConfirmationModal(false)
        }
    }


    useEffect(() => {
        getAllPdfs();
    }, [])

    if (isLoading) {
        return <Loader/>
    }
    return (
        <>
            <div className="p-6 bg-surfaceLight rounded-lg shadow-lg bg-opacity-70 text-sm relative m-3 w-1/2 mx-auto">
                <h2 className="text-primaryText text-2xl font-semibold mb-4">Generated PDF's</h2>
                <div className="bg-background rounded-md p-4 border border-borderDark text-primaryText">
                    {modalShow && (
                        <InfoModal
                            header={modalContent.header}
                            body={modalContent.body}
                        >
                            {modalContent.children}
                        </InfoModal>
                    )}
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
                                <td colSpan="5" className="text-center p-4">No saved PDF's yet</td>
                            </tr>
                        ) : (
                            pdfList.map((pdf) => (
                                <Fragment key={pdf.id}>
                                    <ConfirmationModal body={'Delete file confirmation'}
                                                       head={'Do you want to delete'}
                                                       highlightText={pdf.name}
                                                       isOpen={deleteConfirmationModal}
                                                       onClose={() => setDeleteConfirmationModal(false)}
                                                       onConfrim={() => handleDelete(pdf.id)}
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
                                                    onClick={e => handleDownload(e, pdf.id)}
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