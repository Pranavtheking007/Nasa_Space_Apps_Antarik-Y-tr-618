import { useState } from "react";
import PlanetSearch from "./PlanetSearch";
import CardsSection from "./CardsSection";
import PropTypes from "prop-types";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ITEMS_PER_PAGE = window.innerWidth > 2000 ? 40 : window.innerWidth > 1024 ? 20 : 10;

const InformationSection = ({ planets, onExplore, selectedPlanetInfo, image, setSelectedPlanetInfo }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [infoFetching, setInfoFetching] = useState(false);
    const [filteredPlanets, setFilteredPlanets] = useState(planets);

    // Calculate the total number of pages
    let totalPages = Math.ceil(filteredPlanets.length / ITEMS_PER_PAGE);

    // Calculate the planets to display for the current page
    let startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    let displayedPlanets = filteredPlanets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    if (filteredPlanets.length == 0) {
        // Calculate the total number of pages
        totalPages = Math.ceil(planets.length / ITEMS_PER_PAGE);

        // Calculate the planets to display for the current page
        startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        displayedPlanets = planets.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleFilteredPlanetsChange = (newFilteredPlanets) => {
        setFilteredPlanets(newFilteredPlanets);
    };
    const handleInfo = () => {
        setInfoFetching(true);
    };

    const closeOverlay = () => {
        setInfoFetching(false);
        setSelectedPlanetInfo(null);
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        if (currentPage > 1) {
            buttons.push(
                <button key="prev" onClick={() => handlePageChange(currentPage - 1)} className="mx-1 px-3 py-1 text-white bg-[#222]">
                    Previous
                </button>
            );
        }

        const maxButtonsToShow = 3;
        const halfButtonsToShow = Math.floor((maxButtonsToShow - 2) / 2);
        let start = Math.max(2, currentPage - halfButtonsToShow);
        let end = Math.min(totalPages - 1, start + maxButtonsToShow - 2);

        if (end - start < (maxButtonsToShow - 2)) {
            start = Math.max(2, end - (maxButtonsToShow - 2));
        }

        buttons.push(
            <button key={1} onClick={() => handlePageChange(1)} className={`mx-1 px-3 py-1 text-white ${currentPage === 1 ? 'bg-[#ff9d00]' : 'bg-[#222]'}`}>
                1
            </button>
        );

        for (let i = start; i <= end; i++) {
            if (i === 1) continue;
            buttons.push(
                <button key={i} onClick={() => handlePageChange(i)} className={`mx-1 px-3 py-1 text-white ${currentPage === i ? 'bg-[#ff9d00]' : 'bg-[#222]'}`}>
                    {i}
                </button>
            );
        }

        if (totalPages > 1) {
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={`mx-1 px-3 py-1 text-white ${currentPage === totalPages ? 'bg-[#ff9d00]' : 'bg-[#222]'}`}
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        if (currentPage < totalPages) {
            buttons.push(
                <button key="next" onClick={() => handlePageChange(currentPage + 1)} className="mx-1 px-3 py-1 text-white bg-[#222]">
                    Next
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="w-full md:h-[100vh] h-[50vh] relative bg-[#000000] overflow-hidden">
            <PlanetSearch onFilteredPlanetsChange={handleFilteredPlanetsChange} />

            {infoFetching ?
                <div className="absolute inset-0 bg-black flex items-center justify-center z-20">
                    {
                        selectedPlanetInfo ? (
                            <div className="bg-[#00000080] max-w-3xl w-full relative h-full overflow-y-auto">
                                <div className="sticky flex item-end justify-end top-0 right-3 w-full bg-transparent z-50">
                                    <button onClick={closeOverlay} className="text-[#888888] backdrop-blur-xl z-50 bg-[#55555580] py-1 px-2">
                                        Close
                                    </button>
                                </div>
                                <div className="p-5 overflow-y-auto z-50 flex flex-col gap-5 mb-10">
                                    <div className="absolute top-0 left-0 z-40 p-5">
                                        <h2 className="text-2xl font-medium mb-4 text-white">{selectedPlanetInfo.name_of_planet}</h2>
                                        <p className="text-md text-[#888888] mb-4">
                                            {selectedPlanetInfo.info}
                                        </p>
                                        <div className="flex flex-col items-center gap-5 justify-center h-fit">
                                            <img src={`${image}`} alt="" className="max-w-[400px] w-full object-fit object-center" />
                                            <div className="max-w-[400px] w-full bg-[#22222280] h-fit flex items-center justify-center">
                                                <p className="flex items-center justify-center flex-wrap gap-2 text-[0.8rem] p-2">
                                                    {/* <div className="flex gap-2"> */}
                                                    <div className="flex gap-2">
                                                        <span className="text-white">
                                                            Star:
                                                        </span>
                                                        <span className="text-[#ff00a9]">
                                                            {selectedPlanetInfo.star}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="text-white">
                                                            Planet:
                                                        </span>
                                                        <span className="text-[#ff9d00]">
                                                            {selectedPlanetInfo.name_of_planet}
                                                        </span>
                                                    </div>
                                                    {/* </div>
                                                    <div className="flex gap-2"> */}
                                                    <div className="flex gap-2">
                                                        <span className="text-white">
                                                            Type:
                                                        </span>
                                                        <span className="text-[#ff9d00]">
                                                            {selectedPlanetInfo.type}
                                                        </span>
                                                    </div>
                                                    {/* <div className="flex gap-2">
                                                            <span className="text-white">
                                                                Distance:
                                                            </span>
                                                            <span className="text-[#ff9d00]">
                                                                {selectedPlanetInfo.distance || "Unknown"}
                                                            </span>
                                                        </div> */}
                                                    {/* </div> */}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#00000080] p-5 text-white relative h-full w-full flex items-center justify-center">
                                <button onClick={closeOverlay} className="absolute top-3 right-3 text-[#888888] backdrop-blur-xl z-50 bg-transparent py-1 px-2">
                                    Close
                                </button>
                                <div className="flex flex-col gap-5 items-center justify-center w-full">
                                    <DotLottieReact
                                        src="https://lottie.host/b26b496c-e2cd-4b20-97a4-0e4a0964f2e8/AzP7cLCcwp.lottie"
                                        loop
                                        autoplay
                                        style={{ height: '200px' }}
                                    />
                                    <span className=" text-[1.5rem] font-mono tracking-[0.5rem] text-[#ff9d00] text-center">Loading Information</span>
                                </div>
                            </div>
                        )
                    }
                </div>

                :
                <>
                    {
                        planets.length > 0 ?
                            <>
                                <div className="overflow-y-auto h-[calc(100%_-_80px)]">
                                    <CardsSection planets={displayedPlanets} onExplore={onExplore} handleInfo={handleInfo} />
                                </div>
                                <div className="absolute bottom-0 w-full bg-[#00000010] backdrop-blur-lg py-2">
                                    <div className="flex justify-center overflow-x-auto">
                                        {renderPaginationButtons()}
                                    </div>
                                </div>
                            </>
                            :
                            <div className="flex flex-col gap-5 items-center justify-center w-full">
                                <DotLottieReact
                                    src="https://lottie.host/b26b496c-e2cd-4b20-97a4-0e4a0964f2e8/AzP7cLCcwp.lottie"
                                    loop
                                    autoplay
                                    style={{ height: '200px' }}
                                />
                                <span className=" text-[1.5rem] font-mono tracking-[0.5rem] text-[#ff9d00] text-center">Loading</span>
                            </div>
                    }
                </>
            }
        </div>
    );
};

export default InformationSection;

InformationSection.propTypes = {
    planets: PropTypes.array,
    onExplore: PropTypes.func.isRequired,
    selectedPlanetInfo: PropTypes.object
};
