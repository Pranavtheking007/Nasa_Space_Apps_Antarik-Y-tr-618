import { useState, useEffect } from "react";
import anime from "animejs";

const StarrySky = () => {
    const [num] = useState(60);
    const [vw] = useState(
        Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    );
    const [vh] = useState(
        Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    );

    // Function to animate starry night
    const starryNight = () => {
        anime({
            targets: ["#sky .star"],
            opacity: [
                {
                    duration: 700,
                    value: "0",
                },
                {
                    duration: 700,
                    value: "1",
                },
            ],
            easing: "linear",
            loop: true,
            delay: (el, i) => 50 * i,
        });
    };

    // Function to animate shooting stars
    const shootingStars = () => {
        anime({
            targets: ["#shootingstars .wish"],
            easing: "linear",
            loop: true,
            delay: (el, i) => 1000 * i,
            opacity: [
                {
                    duration: 700,
                    value: "1",
                },
            ],
            width: [
                {
                    value: "150px",
                },
                {
                    value: "0px",
                },
            ],
            translateX: 350,
        });
    };

    // Helper functions to get random values
    const randomRadius = () => Math.random() * 0.7 + 0.6;
    const getRandomX = () => Math.floor(Math.random() * Math.floor(vw)).toString();
    const getRandomY = () => Math.floor(Math.random() * Math.floor(vh)).toString();

    // Run animations when the component mounts
    useEffect(() => {
        starryNight();
        shootingStars();
    }, []);

    return (
        <div id="App" className="-z-20">
            <svg id="sky">
                {[...Array(num)].map((_, y) => (
                    <circle
                        cx={getRandomX()}
                        cy={getRandomY()}
                        r={randomRadius()}
                        stroke="none"
                        strokeWidth="0"
                        fill="white"
                        key={y}
                        className="star"
                    />
                ))}
            </svg>
            <div id="shootingstars">
                {[...Array(60)].map((_, y) => (
                    <div
                        key={y}
                        className="wish"
                        style={{
                            left: `${getRandomY()}px`,
                            top: `${getRandomX()}px`,
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default StarrySky;