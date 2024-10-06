import { useState, useEffect } from "react";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            if (scrollY >= window.innerHeight) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`flex items-center justify-center w-full fixed z-40 text-white transition-all py-4`}>
            <span className={`tracking-[0.25rem] font-thin font-mono py-2 px-4 backdrop-blur-lg bg-[#00000010]`}>EXOPLANET</span>
        </header>
    );
};

export default Navbar;
