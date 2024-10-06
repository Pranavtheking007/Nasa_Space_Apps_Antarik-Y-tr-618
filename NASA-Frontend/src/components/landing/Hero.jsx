import Form from "./Form";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import PropTypes from "prop-types";
import StarrySky from "../reusables/StarsBg";

const Hero = () => {

    const {user} = useSelector(state => state.user);
    const [formVisible, setFormVisible] = useState(false);

    const [scrollToGame, setScrollToGame] = useState(false);

    useEffect(() => {
        if (user && scrollToGame) {
            const gameSection = document.getElementById("game");
            if (gameSection) {
                gameSection.scrollIntoView({ behavior: "smooth" });
            }
            setScrollToGame(false); // Reset scroll state after scrolling
        }
    }, [user, scrollToGame]);

    useGSAP(() => {
        const tl = gsap.timeline();
        tl.from('.hero-heading', {
            duration: 0.5,
            y: -100,
            opacity: 0
        })
        tl.from('hr', {
            duration: 0.5,
            width: 0,
            opacity: 0
        })
        tl.from('.hero-sub-heading', {
            duration: 0.5,
            x: -100,
            opacity: 0
        })
        tl.from('.vertical-text-div', {
            duration: 0.5,
            x: -100,
            opacity: 0
        })
        tl.from('.vertical-text', {
            duration: 0.5,
            x: -100,
            opacity: 0
        })
        tl.from('.button', {
            duration: 0.5,
            y: 100,
            opacity: 0,
            stagger: 0.2
        })
        tl.from('.vertical-img-div', {
            duration: 0.5,
            x: -100,
            opacity: 0
        })
        tl.from('.vertical-img', {
            duration: 0.5,
            x: -100,
            opacity: 0,
            stagger: 0.2
        })
    });

    return (
        <div className="flex sm:flex-row flex-col min-h-screen w-full relative bg-gradient-to-t from-[#151f3c80] to-black">
            <StarrySky />
            <div className="flex">
                <div className="bg-[#88888810] flex vertical-text-div flex-col items-center justify-end md:gap-[4rem] gap-[2rem] sm:pb-20 pb-10 pt-5 z-20">
                    <p className='text-white -rotate-90 vertical-text font-mono md:w-[100px] sm:w-[80px] w-[60px] whitespace-nowrap mx-auto my-0 md:text-[0.9rem] text-[0.8rem]'>Become an Interstellar Explorer Today</p>
                    <hr className="w-1 h-[100px] bg-white mx-auto my-0" />
                </div>
                <div className="w-full flex flex-col gap-12 sm:items-start items-center justify-start sm:mt-[6rem] mt-[5rem] md:pl-10 pl-5">
                    <div className="sm:p-0 px-5 flex flex-col items-start w-full gap-3">
                        <h1 className='text-white md:text-[3.5rem] sm:text-[2.5rem] text-[1.5rem] sm:font-light uppercase sm:text-left flex hero-heading'>Explore New World Beyond <br className="hidden sm:block" /> Our Solar System</h1>
                        <hr className="h-1 sm:max-w-[60%] max-w-[80%] w-full bg-gradient-to-r from-[#ff00a9] to-[#ff9d00] border-none" />
                    </div>
                    <p className="text-[#aaaaaa] text-left sm:text-[1.25rem] leading-normal md:w-[60%] sm:w-full md:p-0 px-5 flex hero-sub-heading">Venture into the depths of space and explore the mysteries of exoplanets. Interact with distant worlds through engaging games, solve space challenges, and uncover the secrets of alien planets. Your journey to the stars begins here!</p>
                    <div className="text-white flex  sm:gap-10 gap-4 w-full sm:p-0 px-5 pb-10">
                        <button className="button border py-2 px-4 hover:bg-white hover:text-black"
                            onClick={() => {
                                if (user) {
                                    setScrollToGame(true)
                                } else  { 
                                    setFormVisible(true)
                                }
                            }
                        }>
                            Start journey
                        </button>
                        <a href="https://science.nasa.gov/exoplanets/" className="button flex items-center gap-2 ">Know more <i className="ri-arrow-right-s-line leading-[0.8rem] mt-1"></i></a>
                    </div>
                </div>
            </div>
            <div className="sm:bg-[#88888810] sm:h-screen flex sm:flex-col flex-row overflow-x-auto sm:overflow-x-hidden sm:w-[300px] w-full sm:p-0 sm:gap-0 gap-5 pl-5 vertical-img-div no-scrollbar snap-x snap-mandatory">
                <img src="https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e002172/GSFC_20171208_Archive_e002172~orig.jpg?w=1280&h=1024&fit=clip&crop=faces%2Cfocalpoint" alt="" className='sm:max-w-[200px] sm:w-full w-[200px] sm:h-full h-[200px] object-cover sm:border-none border border-[#88888840] vertical-img snap-start' />
                <img src="https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e000132/GSFC_20171208_Archive_e000132~large.jpg?w=1920&h=1080&fit=clip&crop=faces%2Cfocalpoint" alt="" className='sm:max-w-[200px] sm:w-full w-[200px] sm:h-full h-[200px] object-cover sm:border-none border border-[#88888840] vertical-img snap-center' />
                <img src="https://images-assets.nasa.gov/image/PIA22098/PIA22098~orig.jpg?w=1068&h=600&fit=clip&crop=faces%2Cfocalpoint" alt="" className='sm:max-w-[200px] sm:w-full w-[200px] sm:h-full h-[200px] object-cover sm:border-none border border-[#88888840] vertical-img snap-center' />
                <img src="https://images-assets.nasa.gov/image/ACD20-0044-001/ACD20-0044-001~large.jpg?w=1920&h=1080&fit=clip&crop=faces%2Cfocalpoint" alt="" className='sm:max-w-[200px] sm:w-full w-[200px] sm:h-full h-[200px] object-cover sm:border-none border border-[#88888840] vertical-img snap-center' />
            </div>
            {
                !user && formVisible && <Form setFormVisible={setFormVisible} setScrollToGame={setScrollToGame}/>
            }
        </div>
    )
}

export default Hero

Hero.propTypes = {
    setScrollToGame: PropTypes.func
}