import PropTypes from "prop-types";

const ThreeDPlanet = ({ iframeLink }) => {

    const baseLink = "https://eyes.nasa.gov/apps/exo/#/planet/TOI-3568_b"
    console.log(iframeLink, "iframe link");

    return (
        <div className="w-full md:h-[100vh] h-[55vh] flex items-center relative">
            <iframe src={iframeLink || baseLink} className="w-full md:h-[100vh] h-[55vh] flex"></iframe>
        </div>
    )
}

export default ThreeDPlanet;

ThreeDPlanet.propTypes = {
    iframeLink: PropTypes.string
};