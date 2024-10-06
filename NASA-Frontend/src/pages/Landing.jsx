import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/landing/Hero";
import Game from "../components/landing/GameSection";
import InteractiveSection from "../components/landing/InteractiveSection";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import { useEffect } from "react";
import axios from 'axios';
import { userDetails } from "../redux/action";

const Landing = () => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const parseApiResponse = (response) => {
        const cleanedResponse = response.replace(/\n/g, '');
        return JSON.parse(cleanedResponse);
    };

    const generateQuizQuestion = async (userData) => {
        try {
            const userAge = parseInt(userData.age);
            const apiResponse = await axios.post('https://nasa-backend-y9iw.onrender.com/quiz_route', {age: userAge});
            // console.log(apiResponse);

            const result = apiResponse.data.result;
            const parsedQuestions = parseApiResponse(result);
            dispatch(userDetails({ ...userData, questions: parsedQuestions }));
            
        } catch (error) {
            console.error('Error generating quiz questions:', error);
        }
    };

    // useEffect(() => {
    //     if (user) {
    //         generateQuizQuestion(user);
    //     }
    // }, [user]);

    return (
        <>
            <Header />
            <Hero />
            {user &&
                <>
                    <Game />
                    <InteractiveSection />
                    <Footer />
                </>
            }
        </>
    )
}

export default Landing