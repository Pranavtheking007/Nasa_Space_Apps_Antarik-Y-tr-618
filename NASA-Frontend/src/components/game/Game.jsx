import { useEffect, useRef, useState } from 'react';
import '../../styles/game.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Game = () => {
    const { user } = useSelector(state => state.user);
    const { exoplanets } = useSelector(state => state.exoplanets);

    const canvasRef = useRef(null);
    const finalScoreRef = useRef(null);
    const restartButtonRef = useRef(null);
    const gameOverPopupRef = useRef(null);
    const spaceshipImageRef = useRef(null);
    const asteroidImageRef = useRef(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [randomInfo, setRandomInfo] = useState(null);
    console.log(exoplanets);
    useEffect(() => {
        if (!gameStarted) return;

        async function getRandomInfo() {
            const randomInfos = await axios.post('https://nasa-backend-y9iw.onrender.com/game_info_route', {
                age: user.age,
                planet: Math.floor(Math.random() * exoplanets.length)
            });

            setRandomInfo(randomInfos.data);
            console.log(randomInfos.data);
        }

        getRandomInfo();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const gameOverPopup = gameOverPopupRef.current;
        const finalScore = finalScoreRef.current;
        const restartButton = restartButtonRef.current;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let spaceship = {
            x: canvas.width / 2 - 25,
            y: canvas.height - 175,
            width: 120,
            height: 200,
            speed: 7,
            isMovingLeft: false,
            isMovingRight: false,
        };

        let bullets = [];
        let asteroids = [];
        let score = 0;
        let gameOver = false;

        let keys = {};
        window.addEventListener("keydown", (e) => (keys[e.code] = true));
        window.addEventListener("keyup", (e) => (keys[e.code] = false));

        const handleTouchStart = (e) => {
            const touchX = e.touches[0].clientX;
            if (touchX < window.innerWidth / 2) {
                spaceship.isMovingLeft = true;
            } else {
                spaceship.isMovingRight = true;
            }
        };

        const handleTouchEnd = () => {
            spaceship.isMovingLeft = false;
            spaceship.isMovingRight = false;
        };

        const handleTouchShoot = () => {
            createBullet();
        };

        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchend", handleTouchEnd);

        canvas.addEventListener("touchstart", (e) => {
            if (e.touches.length === 1) {
                handleTouchShoot();
            }
        });

        function createBullet() {
            bullets.push({
                x: spaceship.x + spaceship.width / 2 - 5,
                y: spaceship.y,
                width: 5,
                height: 10,
                speed: 10,
            });
        }

        function createAsteroid() {
            const size = Math.random() * 30 + 20;
            asteroids.push({
                x: Math.random() * (canvas.width - size),
                y: -size,
                width: size,
                height: size,
                speed: Math.random() * 3 + 2,
            });
        }

        function update() {
            if (gameOver) return;

            if (keys["ArrowLeft"] && spaceship.x > 0) spaceship.x -= spaceship.speed;
            if (keys["ArrowRight"] && spaceship.x < canvas.width - spaceship.width)
                spaceship.x += spaceship.speed;

            if (spaceship.isMovingLeft && spaceship.x > 0) {
                spaceship.x -= spaceship.speed;
            }
            if (spaceship.isMovingRight && spaceship.x < canvas.width - spaceship.width) {
                spaceship.x += spaceship.speed;
            }

            bullets.forEach((bullet, index) => {
                bullet.y -= bullet.speed;
                if (bullet.y < 0) bullets.splice(index, 1);
            });

            asteroids.forEach((asteroid, index) => {
                asteroid.y += asteroid.speed;

                if (
                    asteroid.y + asteroid.height > spaceship.y &&
                    asteroid.x < spaceship.x + spaceship.width &&
                    asteroid.x + asteroid.width > spaceship.x
                ) {
                    endGame();
                }

                if (asteroid.y > canvas.height) asteroids.splice(index, 1);

                bullets.forEach((bullet, bulletIndex) => {
                    if (
                        bullet.y < asteroid.y + asteroid.height &&
                        bullet.x > asteroid.x &&
                        bullet.x < asteroid.x + asteroid.width
                    ) {
                        asteroids.splice(index, 1);
                        bullets.splice(bulletIndex, 1);
                        score += 10;
                    }
                });
            });
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(
                spaceshipImageRef.current,
                spaceship.x,
                spaceship.y,
                spaceship.width,
                spaceship.height
            );

            bullets.forEach((bullet) => {
                ctx.fillStyle = "red";
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
            });

            asteroids.forEach((asteroid) => {
                ctx.drawImage(
                    asteroidImageRef.current,
                    asteroid.x,
                    asteroid.y,
                    asteroid.width,
                    asteroid.height
                );
            });

            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + score, 10, 30);
        }

        function endGame() {
            gameOver = true;
            finalScore.innerText = score;
            gameOverPopup.style.display = "flex";
        }

        function restartGame() {
            gameOverPopup.style.display = "none";
            gameOver = false;
            score = 0;
            spaceship.x = canvas.width / 2 - 25;
            bullets = [];
            asteroids = [];
            gameLoop();
        }

        function gameLoop() {
            if (!gameOver) {
                update();
                draw();
                requestAnimationFrame(gameLoop);
            }
        }

        const asteroidInterval = setInterval(createAsteroid, 1000);
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                createBullet();
            }
        });

        restartButton.addEventListener("click", restartGame);
        gameLoop();

        return () => {
            window.removeEventListener("keydown", (e) => (keys[e.code] = true));
            window.removeEventListener("keyup", (e) => (keys[e.code] = false));
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
            clearInterval(asteroidInterval);
        };
    }, [gameStarted]);

    return (
        <div id="rocket-game">
            <canvas ref={canvasRef} id="gameCanvas"></canvas>

            {/* {
                randomInfo && (
                    <div className="flex items-center justify-center absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl p-5 gap-10 sm:max-w-[400px] w-full h-screen bg-[#55555550] text-white overflow-y-auto">
                        <div className="flex flex-col items-center justify-center gap-5">
                            <h2>{randomInfo.title}</h2>
                            <p>{randomInfo.result}</p>
                            <button onClick={() => setRandomInfo(null)} className="py-2 px-4 border text-white">Close</button>
                        </div>
                    </div>
                )
            } */}
            {!gameStarted && (
                <div className="absolute top-1/2 left-1/2 transform-gpu -translate-x-1/2 -translate-y-1/2 flex flex-col backdrop-blur-xl items-center px-4 justify-center gap-10 h-screen w-full bg-[#55555550] text-white">
                    <h1 className="text-white text-3xl mb-5">Rocket Game</h1>
                    <div className="flex flex-col gap-2 items-start justify-center">
                        <h2>Instructions:</h2>
                        <p className='text-left text-[#dddddd]'>1. Use the left and right arrow keys to move the spaceship.</p>
                        <p className='text-left text-[#dddddd]'>2. Press the space bar to shoot.</p>
                        <p className='text-left text-[#dddddd]'>3. Avoid the exoplanets and shoot them down.</p>
                        <p className='text-left text-[#dddddd]'>4. On mobile, tap the left or right side of the screen to move the spaceship.</p>
                        <p className='text-left text-[#dddddd]'>5. Tap the screen to shoot.</p>
                    </div>
                    <div className='flex gap-5 items-center justify-center'>
                        <button onClick={() => setGameStarted(true)} className="start-button border bg-gradient-to-r from-[#ff00a9] to-[#ff9d00] py-2 px-4 text-white hover:bg-gradient-to-r hover:from-transparent hover:to-transparent hover:border hover:border-white transition-all">
                            Start game
                        </button>
                        <Link to="/" className='py-2 px-4 border hover:bg-white hover:text-black transition-all'>Exit game</Link>
                    </div>
                </div>
            )}

            {gameStarted &&
                <Link to="/" className="pause-button absolute top-5 right-5 bg-gradient-to-r from-[#ff00a9] to-[#ff9d00] py-2 px-4 text-white">
                    Exit Game
                </Link>
            }

            <div ref={gameOverPopupRef} id="gameOverPopup" className="popup overflow-y-auto">
                <div className="popup-content flex flex-col backdrop-blur-xl p-5 items-center justify-center gap-5 sm:max-w-[400px] w-full py-10 sm:h-fit h-screen bg-[#55555550] relative text-white">
                    <h2>Game Over!</h2>
                    {/* <div className='flex flex-col'>
                        <p className="text-sm">Fun fact: {randomInfo?.result}</p>
                    </div> */}
                    <div className="flex flex-col gap-4">
                        <p>Your Score: <span ref={finalScoreRef} id="finalScore"></span></p>
                        <div className='flex gap-5 items-center justify-center'>
                            <button ref={restartButtonRef} className='bg-gradient-to-r from-[#ff00a9] to-[#ff9d00] py-2 px-4'>Play Again</button>
                            <Link to="/" className='py-2 px-4 border'>Exit game</Link>
                        </div>
                    </div>
                </div>
            </div>

            <img ref={spaceshipImageRef} id="spaceshipImage" src="/rocket.svg" alt="Spaceship" style={{ display: 'none' }} className='z-10' />
            <img ref={asteroidImageRef} id="asteroidImage" src="/planet1.svg" alt="Asteroid" style={{ display: 'none' }} className='z-10' />
        </div>
    );
};

export default Game;
