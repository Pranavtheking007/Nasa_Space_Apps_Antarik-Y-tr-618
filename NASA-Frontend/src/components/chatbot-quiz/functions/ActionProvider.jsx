import React, { useEffect, useState } from 'react';
import { createClientMessage } from 'react-chatbot-kit';
// import { questions } from './questions';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const [isInResponseMode, setIsInResponseMode] = useState(false);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [answeredQuestions] = useState(new Set());
    const { user } = useSelector(state => state.user);
    const questions = user.questions;
    const updateState = (message, checker) => {
        toggleInputVisibility(true);
        hidePrevQuestionsOptions();

        console.log("State updated:", message);
        setState((prev) => ({
            ...prev,
            messages: [...prev.messages, message],
            checker,
        }));
    };

    const toggleInputVisibility = (shouldHide) => {
        const inputContainer = document.querySelector('.react-chatbot-kit-chat-input-container');
        if (inputContainer) {
            inputContainer.style.display = shouldHide ? 'none' : 'flex'; // Use 'flex' to restore original styling
        }
    };

    useEffect(() => {
        toggleInputVisibility(true); // Hide input on component mount without any questions

    }, []);

    const hidePrevQuestionsOptions = () => {
        const inputContainer = document.querySelectorAll('.customOptions');
        if (inputContainer) {
            inputContainer.forEach(container => {
                container.classList.add('hidden'); // Hide each options container
            });
        }
    }

    const askNextQuestion = (currentIndex, userData) => {
        if (currentIndex === questions.length) {
            toggleInputVisibility(false); // Show input when all questions are answered
        }

        // Find the next unanswered question
        while (currentIndex < questions.length) {
            if (!answeredQuestions.has(currentIndex)) {
                const question = questions[currentIndex];

                setState((prev) => ({
                    ...prev,
                    currentQuestion: question,
                }));

                const message = createChatBotMessage(question.question, {
                    widget: question.customOptions ? "customOptions" : (question.type === "boolean" ? "booleanOptions" : null),
                    customOptions: question.customOptions
                });

                updateState(message, currentIndex + 1);
                return; // Exit after asking the question
            }
            currentIndex++;
        }
        // If all questions are answered, process final data
        processFinalData(userData);
    };

    function formatDynamicText(text) {
        // Split the text into lines
        const lines = text.split('\n').filter(line => line.trim() !== '');

        let isList = false; // Track if we are inside a list
        let result = ''; // This will store the final formatted string

        lines.forEach((line) => {
            // Handle bold text (lines containing **...**)
            if (line.startsWith('**')) {
                const formattedLine = line.replace(/\*\*(.*?)\*\*/g, (match, p1) => `**${p1}**`);
                result += `${formattedLine}\n`;
            }

            // Handle bullet points (lines starting with '*')
            else if (line.trim().startsWith('*')) {
                if (!isList) {
                    isList = true;
                }
                result += `- ${line.replace('*', '').trim()}\n`; // Use '-' for bullet points
            } else {
                if (isList) {
                    isList = false;
                }
                // For normal text lines, just add them with a line break
                result += `${line}\n`;
            }
        });

        return result.trim(); // Trim extra newlines at the end
    }



    const handleUserResponse = async (response, checker, userData) => {

        const currentQuestion = questions[checker - 1];

        if (isInResponseMode) {
            // Show loading message
            const loadingMessage = createChatBotMessage("Loading...", { loading: true });
            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, loadingMessage]
            }));

            try {
                let userQuestion = response;


                // POST request to quiz_route
                const apiResponse = await axios.post('https://nasa-backend-y9iw.onrender.com/chatbot_route', {
                    question: userQuestion,
                    age: user.age,
                    session_id: 123,
                });
                const apiMessage = apiResponse.data.result; // Adjust based on your API response structure
                const formatedBotMessage = formatDynamicText(apiMessage);
                const message = createChatBotMessage(formatedBotMessage);

                // Remove loading message and display API response
                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages.slice(0, -1), message] // Remove loading message and add API message
                }));
            } catch (error) {
                console.error('Error handling user response:', error);
                const errorMessage = createChatBotMessage("There was an error processing your response. Please try again.");
                setState((prev) => ({
                    ...prev,
                    messages: [...prev.messages.slice(0, -1), errorMessage] // Remove loading message and add error message
                }));
            }
        } else {
            if (typeof checker === 'number' && checker > 0 && checker <= questions.length) {
                const field = questions[checker - 1].field;
                userData[field] = response;
                let isCorrect = false;
                if (currentQuestion.customOptions) {
                    isCorrect = response === currentQuestion.correctAnswer;
                }


                if (currentQuestion.type == "boolean" || currentQuestion?.customOptions) {
                    const clientMessage = createClientMessage(response);
                    setState((prev) => ({
                        ...prev,
                        messages: [...prev.messages, clientMessage]
                    }));

                }

                if (isCorrect) {
                    setCorrectAnswersCount((prev) => prev + 1);
                }
                setState((prev) => ({
                    ...prev,
                    userData,
                    currentQuestion: questions[checker - 1],

                }));
                console.log('User response:', { field, response, userData });
                askNextQuestion(checker, userData);
            } else {
                console.error("Checker value is out of bounds or undefined:", checker);
            }
        }
    };

    const processFinalData = async () => {
        try {
            hidePrevQuestionsOptions();
            let finalMessage;
            const score = correctAnswersCount;
            const totalQuestions = questions.length;
    
            // Define the message based on the user's score
            if (score === 0) {
                finalMessage = createChatBotMessage(`Oops! You didn't get any correct answers this time. Don't worry space explorer, you can discover more about exoplanets ! 🌍🚀`);
            } else if (score <= 3) {
                finalMessage = createChatBotMessage(`You answered ${score} out of ${totalQuestions} questions correctly. You're starting your cosmic journey! Keep learning, and you'll become a space expert in no time! 🪐✨`);
            } else if (score <= 6) {
                finalMessage = createChatBotMessage(`Good job! You answered ${score} out of ${totalQuestions} questions correctly! You're on your way to becoming an exoplanet expert. Keep up the great work! 🌍🚀`);
            } else if (score <= 9) {
                finalMessage = createChatBotMessage(`Amazing! You answered ${score} out of ${totalQuestions} questions correctly! You're really knowledgeable about exoplanets. Keep exploring the cosmos! 🌠🪐`);
            } else if (score === totalQuestions) {
                finalMessage = createChatBotMessage(`Incredible! You got a perfect score of ${totalQuestions} out of ${totalQuestions}! You're a true cosmic genius! 🚀🪐✨`);
            } else {
                finalMessage = createChatBotMessage(`Great job, space explorer! 🚀 You answered ${score} out of ${totalQuestions} questions correctly! 🌍✨ If you're curious about exoplanets or have any cosmic questions, feel free to ask! 🪐`);
            }
    
            // Update state with the final message
            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, finalMessage],
            }));
            setIsInResponseMode(true);
            toggleInputVisibility(false); // Hide input during API response
    
        } catch (error) {
            console.error('Error processing final data:', error);
            const errorMessage = createChatBotMessage("There was an error processing your data. Please try again.");
            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, errorMessage],
            }));
        }
    };

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        askNextQuestion,
                        handleUserResponse,
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;

ActionProvider.propTypes = {
    createChatBotMessage: PropTypes.func,
    setState: PropTypes.func,
    children: PropTypes.node,
};