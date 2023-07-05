import PropTypes from "prop-types";

const Input = ({ type, id, name, placeholder }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            className="mb-1 w-full px-3 py-2.5 text-sm md:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        />
    );
};

Input.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default Input;
