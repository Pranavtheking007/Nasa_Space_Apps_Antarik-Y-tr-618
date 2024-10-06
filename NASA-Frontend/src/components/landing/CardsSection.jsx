import PropTypes from "prop-types";
import "../../styles/cardsSections.css";

const CardsSection = ({ planets, onExplore, handleInfo }) => {

    const images = [
        "/cardThumbnail1.jpeg",
        "/cardThumbnail2.jpeg",
        "/cardThumbnail3.jpeg",
        "/cardThumbnail4.jpeg",
        "/cardThumbnail5.jpeg",
        "/cardThumbnail6.jpeg",
        "/cardThumbnail7.jpeg",
        "/cardThumbnail8.jpeg",
        "/cardThumbnail9.jpeg",
        "/cardThumbnail10.jpeg"
    ];

    return (
        <div id="cards-grid">
            {
                planets.map((planet, index) => (
                    <div key={index} className="group flex flex-col items-center justify-center p-2 backdrop-blur-lg transition-all hover:bg-[#22222280]">
                        <div className="overflow-hidden w-full h-[200px] relative">
                            <img src={images[index % images.length]} alt="Card Thumbnail" className="w-full h-full object-cover"/>
                            <button onClick={() => {onExplore(planet, index), handleInfo()}} className="absolute right-0 bottom-0 z-10 translate-y-full border border-[#ff9d00] text-[#ff9d00] px-2 py-1 text-sm transition-transform duration-300 ease-in-out group-hover:translate-y-0 hover:bg-[#ff00a9] hover:text-white hover:border-white">
                                <i className="ri-link"></i> Explore
                            </button>
                        </div>
                        <span className="text-white text-center mt-2">{planet}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default CardsSection;

CardsSection.propTypes = {
    planets: PropTypes.array,
    onExplore: PropTypes.func.isRequired
};