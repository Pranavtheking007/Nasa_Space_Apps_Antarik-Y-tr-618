import { useState } from 'react';
import PropTypes from 'prop-types';

const BooleanOptions = (props) => {

    const [showOptions, setShowOptions] = useState(true);
    
    const { state} = props;
    
    if (!state.showWidget) return null;

    const handleClick = (response) => {
        setShowOptions(false);
        props.actions.handleUserResponse(response, props.state.checker, props.state.userData);
    };

    return (

        <div>
            {showOptions && 
                <div>
                    <button  className='start-btn' onClick={() => handleClick("Yes")}>Yes</button>
                    <button  className='start-btn slow-btn' onClick={() => handleClick("No")}>No</button>
                </div>
            }
        </div>
    );
};

export default BooleanOptions;

BooleanOptions.propTypes = {
    actions: PropTypes.object,
    state: PropTypes.object,
};