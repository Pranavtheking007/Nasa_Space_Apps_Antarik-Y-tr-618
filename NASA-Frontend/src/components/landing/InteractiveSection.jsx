import { useEffect, useState } from "react"
import InformationSection from "./InformationSection"
import ThreeDPlanet from "./ThreeDPlanet"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { planetList } from "../../redux/action";

const InteractiveSection = () => {

    const { user } = useSelector(state => state.user);
    const [planets, setPlanets] = useState([]);
    const [selectedPlanetInfo, setSelectedPlanetInfo] = useState(null);
    const [image, setImage] = useState("");
    const [iframeLink, setIframeLink] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await axios.get("https://nasa-backend-y9iw.onrender.com/planets_list_route");
                setPlanets(response.data.planets_list);
                dispatch(planetList(response.data.planets_list));
                // console.log(response.data)
                // console.log(planet, "planet");
            } catch (error) {
                console.error("Error fetching planets list:", error);
            }
        };

        fetchPlanets();
    }, []);

    const handleExplore = async (planet) => {
        // console.log(planet, link,"planet and link");
        try {
            const response = await axios.post("https://nasa-backend-y9iw.onrender.com/info_route", { age: parseInt(user.age), planet: planet });
            setSelectedPlanetInfo(JSON.parse(response.data.result));
            console.log(JSON.parse(response.data.result));
            setIframeLink(response.data.planet_url);
            setImage(response.data.image_url);
            // console.log(response.data, "planet info");
        } catch (error) {
            console.error("Error fetching planet details:", error);
        }
    };

    return (
        <div className="flex flex-col items-center pt-10 bg-gradient-to-b from-[#151f3c80] to-black" id="3d">
            <div className="flex py-10 bg-gradient-to-t from-[#00000080] to-transparent w-full items-center justify-center">
                <p className="text-transparent text-center md:text-[4rem] sm:text-[2rem] text-[1.5rem] z-20 bg-clip-text bg-gradient-to-r from-[#ff00a9] to-[#ff9d00]">
                    3D Interaction and Information
                </p>
            </div>
            <div className="flex md:flex-row flex-col w-full">
                <InformationSection planets={planets} onExplore={handleExplore} selectedPlanetInfo={selectedPlanetInfo} setSelectedPlanetInfo={setSelectedPlanetInfo} image={image} />
                <ThreeDPlanet iframeLink={iframeLink}/>
            </div>
        </div>
    )
}

export default InteractiveSection
