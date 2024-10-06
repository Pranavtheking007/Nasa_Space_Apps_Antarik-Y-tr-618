import PropTypes from 'prop-types';
import { useRef } from 'react';

const StartBtn = (props) => {

    const startBtnRef = useRef(null);
    const startInteraction = () => {
        props.actions.askNextQuestion(0, props.state.userData);
        const startBtn = startBtnRef.current;
        if (startBtn) {
            startBtn.style.display = 'none';
        }
    };

    return (
        <div className='ml-20' ref={startBtnRef}>
            <button className='py-2 px-4 text-white bg-[#0048ff] rounded-full' onClick={startInteraction}>Start quiz</button>
        </div>
    );
};

export default StartBtn;

StartBtn.propTypes = {
    actions: PropTypes.object,
    state: PropTypes.object,
};