import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { userDetails } from "../../redux/action";

const Form = ({setFormVisible, setScrollToGame}) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        id: uuidv4(),
    });    

    const handleSubmit = (e) => {
        e.preventDefault();
        setScrollToGame(true);
        dispatch(userDetails(formData));
        setFormVisible(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    return (
        <div className="flex items-center justify-center w-full absolute z-[50] my-auto left-0 right-0 h-screen bg-[#00000080]">
            <form onSubmit={handleSubmit} className="flex flex-col backdrop-blur-xl p-5 items-center justify-center gap-10 sm:max-w-[400px] w-full py-10 sm:h-fit h-screen bg-[#55555550] relative">
                <span className="absolute top-2 right-2 text-[#888888] cursor-pointer" onClick={() => setFormVisible(false)}>Close</span>
                <div className="flex flex-col gap-10 w-full items-center">
                    <input type="text" placeholder="Enter name" name="" id="name" onChange={handleChange} value={formData.name} className="bg-transparent border-b border-[#808080] focus:ring-0 outline-none w-full text-white" required />
                    <input type="number" placeholder="Enter your age" name="" id="age" onChange={handleChange} value={formData.age} className="no-spinner bg-transparent border-b border-[#808080] focus:ring-0 outline-none w-full text-white" required />
                    <button type="submit" className="text-white border flex py-2 px-4 max-w-[200px] w-full items-center justify-center hover:text-black hover:bg-white">Submit</button>
                </div>
                <p className="text-[#888888]">
                    This form is for seamless user experience and does not save or share any data enterd by user.
                </p>
            </form>
        </div>
    )
}

export default Form

Form.propTypes = {
    setFormVisible: PropTypes.func,
    setScrollToGame: PropTypes.func
}