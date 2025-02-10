export const MainPage = () => {

    return (
        <>
            <div className="flex items-center justify-center p-10">
                {/* Main Container */}
                <div className="bg-background bg-opacity-80 p-10 rounded-lg shadow-lg max-w-3xl text-center space-y-8">

                    {/* Heading */}
                    <h1 className="text-primaryText text-4xl font-bold">
                        Tired of L.O. labels?
                    </h1>

                    {/* Description with Accents */}
                    <p className="text-primaryText text-lg leading-relaxed">
                        Ensure <span className="text-info font-semibold">reliability</span>,
                        avoid <span className="text-error font-semibold">errors</span>, and achieve
                        <span className="text-success font-semibold"> standardization</span> for your oil analysis
                        labels.
                        Our streamlined solution simplifies the process, allowing you to print lab-ready stickers
                        in seconds.
                    </p>

                    {/* Key Benefits */}
                    <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
                        {/* Benefit 1 */}
                        <div className="bg-surfaceDark bg-opacity-90 p-6 rounded-lg">
                            <h2 className="text-highlightText text-xl font-semibold">Fast & Simple</h2>
                            <p className="text-secondaryText">
                                Generate and print stickers in just a few clicks, optimized for efficiency.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-surfaceDark bg-opacity-90 p-6 rounded-lg">
                            <h2 className="text-highlightText text-xl font-semibold">Reliable Accuracy</h2>
                            <p className="text-secondaryText">
                                Minimize errors with standardized labels, ensuring consistent data for every analysis.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-surfaceDark bg-opacity-90 p-6 rounded-lg">
                            <h2 className="text-highlightText text-xl font-semibold">Laboratory-Ready</h2>
                            <p className="text-secondaryText">
                                Meet laboratory requirements with labels that are easy to read and highly accurate.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


