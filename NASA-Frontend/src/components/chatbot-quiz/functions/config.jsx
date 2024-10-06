import { createChatBotMessage } from 'react-chatbot-kit';
import Avatar from '../Avatar';
import StartBtn from '../StartBtn';
import StartSlow from '../StartSlow';
import data from './data';
import DipslayImage from '../DipslayImage';
import BooleanOptions from '../BooleanOptions';
import CustomOptionsWidget from '../CustomOptionsWidget';
import UserAvatar from '../UserAvatar';

// Modify config to accept 'user' as a parameter
const config = (user) => ({
    botName: "Exo Guide",
    initialMessages: [
        createChatBotMessage(`Welcome ${user?.name || 'User'}. I am Antariks Bot, your Exoplanet Guide and quiz master. This is a quiz to test your knowledge on exoplanets and to help you learn more about them. Let's get started!`, {
            widget: "startBtn"
        })
    ],
    customComponents: {
        botAvatar: (props) => <Avatar {...props} />,
        userAvatar: (props) => <UserAvatar {...props} />,
    },
    state: {
        currentQuestionIndex: null, // Initialize to null or 0
        data,
        showWidget: true,
        userData: {
            name: user?.name || "", // Use the user data passed as a parameter
            age: user?.age || 0,
            gender: "",
            delayedSpeech: false,
            socialInteractionIssues: false,
            repetitiveBehaviors: false,
            sensitivity: false,
            birthHistory: "",
            birthWeight: "",
            complications: "",
            rolledOver: 0,
            satWithoutSupport: 0,
            walkedIndependently: 0,
            firstWords: 0,
            limitedVocabulary: false,
            earInfections: false,
            illnesses: false,
            familyHistory: false,
            neurologicalDisorders: false,
            livingSituation: "",
            siblingsCount: 0,
            educationProgram: "",
            peerInteractions: false,
            eyeContact: false,
            handFlapping: false,
            cranialNerves: false,
            motorFunction: "",
            sensoryFunction: "",
            coordination: "",
            conversationDifficulty: false,
            intenseInterests: false,
            repetitiveMovements: false,
            hearingTest: "",
            geneticTesting: "",
            neuroImaging: "",
            exoplanetDefinition: "",
            detectionMethod: "",
            keplerMission: "",
            closestExoplanet: "",
            interestReason: "",
            hotJupiter: "",
            studyChallenge: "",
            transitRole: "",
            habitableCharacteristics: "",
            exoplanetCount: "",
            // other fields...
        },
    },
    widgets: [
        {
            widgetName: "startBtn",
            widgetFunc: (props) => <StartBtn {...props} />,
        },
        {
            widgetName: "startSlow",
            widgetFunc: (props) => <StartSlow {...props} />,
        },
        {
            widgetName: "booleanOptions",
            widgetFunc: (props) => <BooleanOptions {...props} />,
        },
        {
            widgetName: "customOptions",
            widgetFunc: (props) => <CustomOptionsWidget {...props} />,
        },
        {
            widgetName: "finalImage",
            widgetFunc: (props) => <DipslayImage {...props} />,
        },
    ]
});

export default config;
