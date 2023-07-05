import PropTypes from "prop-types";

const ErrorMessage = ({ errors, inputName }) => {
    let errMsg;
    errors.forEach((err) => {
        if (err.path === inputName) {
            errMsg = err.msg;
        }
    });

    // if (!errMsg) return <></>;
    return <p className="text-sm text-red-600 dark:text-red-500">{errMsg}</p>;
};

ErrorMessage.propTypes = {
    errors: PropTypes.array.isRequired,
    inputName: PropTypes.string.isRequired,
};

export default ErrorMessage;
