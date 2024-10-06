import PropTypes from 'prop-types';

const CustomOptionsWidget = (props) => {
   
    const {actions, state} = props;
    const {customOptions } = state.currentQuestion;
    if (!state.showWidget) return null;

    
    // Check if question is defined and has customOptions
    const options = customOptions || [];

    const handleClick = (response) => {
        actions.handleUserResponse(response, props.state.checker, props.state.userData);
    };

    return (
        <div className='flex gap-4 flex-wrap customOptions'>
            {options.length > 0 && (
                options.map((option, index) => (
                    <button  className=' text-white py-2 px-6 bg-[#0048ff80] rounded-full text-left'  key={index} onClick={() => handleClick(option)}>
                        {option}
                    </button>
                ))
            ) }
        </div>
    );
};

export default CustomOptionsWidget;

CustomOptionsWidget.propTypes = {
    actions: PropTypes.object,
    state: PropTypes.object,
};