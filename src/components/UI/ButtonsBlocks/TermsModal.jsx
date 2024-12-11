import {IoIosClose} from "react-icons/io";


const TermsModal = ({onModalOpen}) => {

    return (
        <>
            <div className="fixed inset-0 bg-surfaceLight bg-opacity-50 flex items-center justify-center z-50 space-y-0"
                 onClick={(e) => {
                     e.stopPropagation();
                     onModalOpen();
                 }}>
                <div className="bg-surfaceDark p-8 rounded-lg shadow-lg relative w-[60%]">
                    <button className={"absolute top-0 right-0 p-2"} onClick={onModalOpen}>
                        <IoIosClose size={30} color={"#FF9F43"}/>
                    </button>
                    <h2 className="text-xl font-bold text-highlightText mb-4">Terms and Conditions</h2>
                    <div className="text-sm text-secondaryText max-h-80 overflow-y-auto scrollbar-hide">
                        <p>Welcome to <b className={'text-primaryAccent'}>vprinters.tech</b>, a platform built with
                            passion and pure enthusiasm! Please take a moment to read these Terms and Conditions before
                            using the site.</p>
                        <br/>
                        <p className={'font-semibold text-primaryText'}>1. About platform vprinters.tech</p>
                        <ul className="list-disc ml-6">
                            <li>This platform is a non-commercial educational project created by one individual solely
                                for personal growth and to make life easier for marine engineers.
                            </li>
                            <li>Developed with enthusiasm, this site reflects the creator's skills at the time of its
                                creation and serves as a practical showcase of knowledge gained through hands-on
                                experience.
                            </li>
                            <li>The project was, is, and always will be free of any financial profit. Its only rewards
                                are the knowledge, skills, and satisfaction of helping others.
                            </li>
                        </ul>
                        <br/>
                        <p className={'font-semibold text-primaryText'}>2. Information Collection and Use</p>
                        <p>Any information you provide is used solely to support the platform's tools and features, like
                            generating custom labels or other utilities.</p>
                        <ul className="list-disc ml-6">
                            <li>Your data is stored only for your use and for anonymous analysis to improve the
                                platform's functionality.
                            </li>
                            <li>Your personal data will never be shared, sold, or rented to third parties under any
                                circumstances.
                            </li>
                            <li>Due to the non-commercial nature of the project, there is no guarantee of permanent data
                                storage. If maintaining storage becomes too costly, data may be deleted or lost.
                            </li>
                        </ul>
                        <br/>
                        <p className={'font-semibold text-primaryText'}>3. User Responsibilities</p>
                        <p>By using this platform, you acknowledge its experimental and non-professional nature.</p>
                        <ul className="list-disc ml-6">
                            <li>Do not upload sensitive or irreplaceable information to the site, as the data is not
                                guaranteed to be securely or permanently stored.
                            </li>
                            <li>Users are encouraged to view this project as a personal learning endeavor rather than a
                                fully professional or commercial product.
                            </li>
                            <li>This platform is intended to ease and improve the daily tasks of marine engineers,
                                created with the sole purpose of sharing practical solutions and demonstrating the
                                developer's capabilities.
                            </li>
                        </ul>
                        <br/>
                        <p className={'font-semibold text-primaryText'}>4. Changes to the Platform or Terms</p>
                        <p>The platform and these Terms may be updated, changed, or discontinued at any time, depending
                            on the creator’s resources and priorities. Users will not receive individual notifications
                            about changes, so check back periodically for updates.</p>
                        <br/>
                        <p className={'font-semibold text-primaryText'}>5. Contact</p>
                        <p>For questions or suggestions, feel free to reach out via my GitHub: <a
                            href="https://github.com/NextGenSeafarer" target="_blank"
                            className="text-primaryAccent underline">https://github.com/NextGenSeafarer</a>.</p>
                        <p>You can also contact me via email: <span
                            className="text-primaryAccent">pocha000@gmail.com</span></p>
                    </div>

                </div>
            </div>


        </>
    );
};

export default TermsModal;
