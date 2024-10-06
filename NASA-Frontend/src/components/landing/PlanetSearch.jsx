// import { useState, useEffect } from "react";
// import axios from "axios";

// const PlanetSearch = () => {
//     const [planetsList, setPlanetsList] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredPlanets, setFilteredPlanets] = useState([]);

//     useEffect(() => {
//         const fetchPlanets = async () => {
//             try {
//                 const response = await axios.get("https://nasa-backend-y9iw.onrender.com/planets_list_route");
//                 setPlanetsList(response.data.planets_list);
//             } catch (error) {
//                 console.error("Error fetching planets list:", error);
//             }
//         };

//         fetchPlanets();
//     }, []);

//     const handleSearchChange = (e) => {
//         const query = e.target.value;
//         setSearchTerm(query);

//         if (query.length > 0) {
//             const filtered = planetsList.filter((planet) =>
//                 planet.toLowerCase().includes(query.toLowerCase())
//             );
//             setFilteredPlanets(filtered);
//         } else {
//             setFilteredPlanets([]);
//         }
//     };

//     const handlePlanetClick = (planet) => {
//         setSearchTerm(planet);
//         setFilteredPlanets([]);
//     };

//     return (
//         <div className="flex items-center justify-between py-1 px-[1.25rem] gap-4">
//             <span className="text-white whitespace-nowrap">Exoplanet Search</span>
//             <div className="relative max-w-[400px] w-full">
//                 <input type="text" placeholder="Search for a planet" value={searchTerm} onChange={handleSearchChange} className="border-none outline-none focus:ring-0 p-2 w-full max-w-[400px] bg-[#55555540] backdrop-blur-lg placeholder:text-[#888888] text-white" />
//                 {filteredPlanets.length > 0 && (
//                     <ul className="autocomplete-suggestions max-h-48 overflow-y-auto z-10 bg-[#5555580] backdrop-blur-lg text-white w-full">
//                         {filteredPlanets.map((planet, index) => (
//                             <li key={index} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handlePlanetClick(planet)} >
//                                 {planet}
//                             </li>
//                         ))}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PlanetSearch;





import { useState, useEffect } from "react";
import axios from "axios";

const PlanetSearch = ({ onFilteredPlanetsChange }) => {
    const [planetsList, setPlanetsList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPlanets, setFilteredPlanets] = useState([]);

    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const response = await axios.get("https://nasa-backend-y9iw.onrender.com/planets_list_route");
                setPlanetsList(response.data.planets_list);
            } catch (error) {
                console.error("Error fetching planets list:", error);
            }
        };

        fetchPlanets();
    }, []);

    useEffect(() => {
        // Notify parent component when filtered planets change
        onFilteredPlanetsChange(filteredPlanets);
    }, [filteredPlanets, onFilteredPlanetsChange]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.length > 0) {
            const filtered = planetsList.filter((planet) =>
                planet.toLowerCase().includes(query.toLowerCase())
            );
            console.log(filtered);
            setFilteredPlanets(filtered);
        } else {
            setFilteredPlanets([]);
        }
    };

    const handlePlanetClick = (planet) => {
        setSearchTerm(planet);
        setFilteredPlanets([]);
    };

    return (
        <div className="flex items-center justify-between py-1 px-[1.25rem] gap-4">
            <span className="text-white whitespace-nowrap">Exoplanet Search</span>
            <div className="relative max-w-[400px] w-full">
                <input
                    type="text"
                    placeholder="Search for a planet"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="border-none outline-none focus:ring-0 p-2 w-full max-w-[400px] bg-[#55555540] backdrop-blur-lg placeholder:text-[#888888] text-white"
                />
                {filteredPlanets.length > 0 && (
                    <ul className="autocomplete-suggestions max-h-48 overflow-y-auto z-10 bg-[#5555580] backdrop-blur-lg text-white w-full">
                        {filteredPlanets.map((planet, index) => (
                            <li
                                key={index}
                                className="p-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handlePlanetClick(planet)}
                            >
                                {planet}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default PlanetSearch;