import React from 'react';
import PropTypes from 'prop-types';

const MessageParser = ({ children, actions }) => {

    const parse = (message) => {
        const { checker, userData } = children.props.state;
        console.log("Parsing message with state:");
        console.log("Message:", message);
        console.log("Checker:", checker);
        console.log("UserData:", userData);
    
        if (checker !== null && checker !== undefined) {
            actions.handleUserResponse(message, checker, userData);
        } else {
            console.log("Starting with the first question...");
            actions.askNextQuestion(0, userData); // Start from the first question
        }
    };
    
    return (
        <div>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    parse: parse,
                    actions,
                })
            )}
        </div>
    );
};

export default MessageParser;

MessageParser.propTypes = {
    children: PropTypes.object,
    actions: PropTypes.object,
    state: PropTypes.object,
};