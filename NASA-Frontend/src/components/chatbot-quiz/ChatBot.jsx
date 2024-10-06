
import StarrySky from "../reusables/StarsBg";
import 'react-chatbot-kit/build/main.css';
import '../../styles/chatbot.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { userDetails } from "../../redux/action";
import { useEffect } from 'react';
import BotLogic from "./BotLogic";

const ChatBot = () => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const parseApiResponse = (response) => {
        const cleanedResponse = response.replace(/\n/g, ''); // Remove newline characters
        return JSON.parse(cleanedResponse); // Parse the cleaned response
    };

    const generateQuizQuestion = async (formData) => {

        try {
            const apiResponse = await axios.post('https://nasa-backend-y9iw.onrender.com/quiz_route', {
                age: formData.age,
            });
            const result = apiResponse.data.result;
            const parsedQuestions = parseApiResponse(result);

            console.log(parsedQuestions);
            dispatch(userDetails({ ...formData, questions: parsedQuestions }));
            console.log(formData);

        } catch (error) {
            console.error('Error generating quiz questions:', error);
        }
    };

    useEffect(() => {
        // Generate quiz questions when the user object is available only once
        if (user) {
            generateQuizQuestion(user);
        }



    }, []);

    const handleBackToHome = () => {
        generateQuizQuestion(user)
    };

    return (
        <div className="Chatbot">
            <StarrySky />
            <BotLogic />
            <Link to="/" className='text-white absolute top-3 right-5 bg-slate-900 py-2 px-4' style={{ fontSize: 'clamp(0.8rem, 1vw, 1rem)' }}>Back to home</Link>
        </div>
    )
}

export default ChatBot;