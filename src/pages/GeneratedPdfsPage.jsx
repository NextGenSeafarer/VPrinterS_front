import {useEffect, useState} from "react";
import {Loader} from "../components/UI/Loader/Loader.jsx";
import {ConfirmationModal} from "../components/UI/ButtonsBlocks/ConfirmationModal.jsx";
import {useFetching} from "../components/Hooks/useFetching.js";
import PrinterAPI from "../http/API/PrinterAPI.js";
import {GlobalErrorHandler} from "../services/Errors/GlobalErrorHandler.jsx";
import {IoMdDownload} from "react-icons/io";
import {DeleteButton} from "../components/UI/ButtonsBlocks/DeleteButton.jsx";

export const GeneratedPdfsPage = () => {
    const [pdfList, setPdfList] = useState([]);
    const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const [getAllPdfs, getAllLoading] = useFetching(async () => {
        const data = await PrinterAPI.getAllPdfs();
        if (data) {
            setPdfList(data);
        }
    });

    const [downloadPdf, downloadPdfLoading] = useFetching(async (id) => {
        await PrinterAPI.downloadPdf(id);
    });

    const [deletePdf, deletePdfLoading] = useFetching(async () => {
        if (selectedPdf) {
            const response = await PrinterAPI.deletePdf(selectedPdf.id);
            if (response.status === 200) {
                setPdfList((prevState) => prevState.filter(x => x.id !== selectedPdf.id));
                setDeleteConfirmationModal(false);
                setSelectedPdf(null);
            }
        }
    });

    useEffect(() => {
        getAllPdfs();
    }, []);

    return (
        <>
            <GlobalErrorHandler/>
            {(getAllLoading || downloadPdfLoading || deletePdfLoading) && <Loader/>}

            <ConfirmationModal
                body={'Delete file confirmation'}
                head={'Do you want to delete'}
                highlightText={selectedPdf?.name}
                isOpen={deleteConfirmationModal}
                onClose={() => setDeleteConfirmationModal(false)}
                onConfrim={deletePdf}
            />

            <div className="px-6 pt-10 pb-36 space-y-2 bg-background bg-opacity-45 rounded-lg shadow-lg relative m-3 mb-10 text-xs">
                <h2 className="text-highlightText text-2xl font-semibold mb-4">Generated PDF's</h2>
                {pdfList.length === 0 ?
                    <div className="message text-highlightText font-semibold text-xl">Generated PDF's list is empty</div> :
                    <div className="bg-background rounded-md p-4 border border-borderDark text-primaryText ">
                        <table className="table-auto w-full text-left border-collapse">
                            <thead>
                            <tr className="text-white text-lg">
                                <th className="p-2 border-b border-borderLight">Name</th>
                                <th className="p-2 border-b border-borderLight">PDF Size (kB)</th>
                                <th className="p-2 border-b border-borderLight">Pages</th>
                                <th className="p-2 border-b border-borderLight">Created</th>
                                <th className="p-2 border-b text-right border-borderLight"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {pdfList.map((pdf) => (
                                    <tr key={pdf.id} className="hover:bg-surfaceLight text-xs ">
                                        <td className="p-2 border-b border-borderLight">{pdf.name}</td>
                                        <td className="p-2 border-b border-borderLight">{pdf.size}</td>
                                        <td className="p-2 border-b border-borderLight">
                                            {pdf.pages} {pdf.pages > 1 ? 'pages' : 'page'}
                                        </td>
                                        <td className="p-2 border-b w-fit border-borderLight">
                                            {pdf.created_at.split('T')[0] + ' ' + pdf.created_at.split('T')[1].split('.')[0]}
                                        </td>
                                        <td className="p-2 border-b text-right border-borderLight">
                                            <div className="flex justify-end space-x-3">
                                                <button
                                                    onClick={() => downloadPdf(pdf.id)}
                                                    className="p-1 rounded-md bg-info text-white hover:bg-surfaceDark hover:translate-x-0.5 transition">
                                                    <IoMdDownload size={15}/>
                                                </button>
                                                <DeleteButton text={'Delete'}
                                                    onClick={() => {
                                                    setSelectedPdf(pdf);
                                                    setDeleteConfirmationModal(true);
                                                }}/>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </>
    );
};
