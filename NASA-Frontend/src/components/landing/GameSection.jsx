import { Link } from "react-router-dom"

const Game = () => {
    return (
        <div className="sm:p-10 py-10 relative bg-gradient-to-t from-[#151f3c80] via-black to-[#151f3c80] flex flex-col items-center justify-start sm:gap-10" id="game">
            <div className="flex py-5">
                <p className="text-white sm:text-left text-center md:text-[4rem] sm:text-[2rem] text-[1.5rem] z-20 bg-clip-text text-transparent bg-gradient-to-r from-[#ff00a9] to-[#ff9d00]">
                    EXOPLANET EXPLORER GAME
                </p>
            </div>
            <div className="flex md:flex-row flex-col sm:gap-10 w-full items-center justify-bewteen sm:px-0 px-4 gap-4">
                <div className="w-full sm:h-[400px] min-h-[250px] bg-[#0f3257] flex flex-col items-start justify-start z-20 relative overflow-hidden group border border-[#2e2e2e] cursor-pointer hover:shadow-xl hover:shadow-[#0059ff10] transition-all duration-300 ease-in-out sm:px-5 py-5 px-10" style={{ backgroundImage: `url("/bg1.svg")`, backgroundSize: 'cover', backgroundBlendMode: 'overlay', }}>
                    <img src="/planet1.svg" alt="" className="absolute lg:-bottom-[50rem] md:-bottom-[45rem] -bottom-[30rem] md:w-[80rem] md:h-[80rem] transition-transform duration-300 ease-in-out group-hover:-translate-y-10 -z-10" />
                    <div className="flex flex-col items-start justify-start sm:gap-4 gap-2">
                        <span className="text-white text-left font-semibold lg:text-[2.5rem] md:text-[1.8rem] text-[1.5rem]">
                            Explore the exoplanet with your spaceship
                        </span>
                        <p className="text-[#808080] text-left sm:w-[80%] md:text-[1rem] text-[0.8rem]">
                            Fly your spaceship through the exoplanet and collect the information about the exoplanet. Learn about the different types of exoplanets.
                        </p>
                        
                    </div>
                    <Link to="/game" className="text-white sm:text-[1rem] text-[0.8rem] flex bg-gradient-to-r from-[#ff00a9] to-[#ff9d00] px-5 py-2 mt-5 hover:rounded-full transition-all duration-300 ease-in-out">
                        Play Now
                    </Link>
                </div>
                <div className="w-full sm:h-[400px] min-h-[250px] bg-[#0f325780] flex flex-col items-start justify-start z-20 relative overflow-hidden group sm:px-5 py-5 px-10 cursor-pointer border border-[#80808040] hover:shadow-xl hover:shadow-[#0059ff10] transition-all duration-300 ease-in-out" style={{ backgroundImage: `url("/bg2.svg")`, backgroundSize: 'cover', backgroundBlendMode: 'overlay', }}>
                    <img src="/astronaut.svg" alt="" className="absolute lg:-right-[4rem] md:-right-[6rem] -right-0 lg:-bottom-[10rem] md:-bottom-[8rem] sm:-bottom-[8rem] -bottom-[3.5rem] sm:h-[22rem] h-[10rem] transition-transform ease-in-out group-hover:-translate-y-10 group-hover:-translate-x-10 group-hover:-rotate-[10deg]" />
                    <div className="flex flex-col items-start justify-start sm:gap-4 gap-1">
                        <span className="text-white text-left font-semibold lg:text-[2.5rem] md:text-[1.8rem] text-[1.5rem]">
                            Solve the mystery of the exoplanet
                        </span>
                        <p className="text-[#808080] text-left sm:w-[80%] md:text-[1rem] text-[0.8rem]">
                            Test your knowledge about exoplanets in this quiz game. Explore the universe and learn about the different types of exoplanets.
                        </p>
                    </div>
                    <Link to="/quiz" className="text-white sm:text-[1rem] text-[0.8rem] flex bg-gradient-to-r from-[#ff00a9] to-[#ff9d00] px-5 py-2 mt-5 hover:rounded-full transition-all duration-300 ease-in-out">
                        Play Now
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Game;