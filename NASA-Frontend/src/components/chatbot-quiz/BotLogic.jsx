import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Chatbot from 'react-chatbot-kit';
import config from './functions/config';
import ActionProvider from './functions/ActionProvider';
import MessageParser from './functions/MessageParser';
import { useSelector } from 'react-redux';

const BotLogic = () => {

    const { user } = useSelector(state => state.user);

    return (
        <div>
            {
                user.questions ?
                    <Chatbot config={config(user)} messageParser={MessageParser} actionProvider={ActionProvider} headerText="Antariks Bot" />
                    :
                    <div className="flex flex-col gap-5 items-center justify-center w-full h-screen">
                        <DotLottieReact
                            src="https://lottie.host/b26b496c-e2cd-4b20-97a4-0e4a0964f2e8/AzP7cLCcwp.lottie"
                            loop
                            autoplay
                            style={{ height: '300px' }}
                        />
                        <span className="font-black text-[1.5rem] font-mono tracking-[1rem] text-[#ff9d00]">LOADING</span>
                    </div>
            }
        </div>
    )
}

export default BotLogic
