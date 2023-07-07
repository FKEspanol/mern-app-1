import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import people from "@iconify-icons/mdi/people-group";
import Input from "../reusable/Input";
import { ClientError } from "../../error/clientError";
import ErrorMessage from "./ErrorMessage";

let formBody = {};
const LogInUser = () => {
    const [errors, setErrors] = useState([]);
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    const [token, setToken] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        formBody = {
            ...formBody,
            [name]: value,
        };
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:8000/loginUser", {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(formBody),
            });

            const data = await res.json();
            if (data.errors) {
                throw new ClientError(data.errors);
            }
            setData(data);
            setIsLoggedIn(true);
        } catch (error) {
            if (error instanceof ClientError) {
                setErrors(error.errors);
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        setUser(data.user);
        setToken(data.token);
    }, [data]);

    return (
        <div className="w-full h-screen">
            <div className="grid lg:grid-cols-2 h-full">
                <div className="relative bg-dark px-3">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
                        <Icon
                            icon={people}
                            className="text-9xl text-primary mb-3"
                        />
                        {isLoggedIn && (
                            <h1 className="text-xl sm:text-5xl xl:text-7xl text-white uppercase font-bold mb-5">
                                {user?.fullName}
                            </h1>
                        )}
                        <h1 className="text-3xl sm:text-5xl xl:text-7xl text-white uppercase font-bold mb-5">
                            Mern Stack
                        </h1>
                        <p className="text-lg text-white">
                            Connect with friends and the world around you on
                            Mern Stack app.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center bg-darkWhite px-3">
                    <div className="w-full sm:w-auto">
                        <h2 className="text-4xl text-center uppercase font-bold text-dark mb-10">
                            Login User !
                        </h2>
                        <form
                            onSubmit={onSubmit}
                            onChange={onChange}
                            className="w-full sm:max-w-[500px] sm:min-w-[500px] flex flex-col p-8 sm:p-10 bg-white"
                        >
                            <div className="mb-6">
                                <label
                                    htmlFor="username-success"
                                    className="block mb-2 text-sm font-medium text-smoke"
                                >
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Your Email"
                                />
                                {errors && (
                                    <ErrorMessage
                                        errors={errors}
                                        inputName="email"
                                    />
                                )}
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="username-success"
                                    className="block mb-2 text-sm font-medium text-smoke"
                                >
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Your Password"
                                />
                                {errors && (
                                    <ErrorMessage
                                        errors={errors}
                                        inputName="password"
                                    />
                                )}
                            </div>
                            <button
                                type="submit"
                                className="py-2.5 px-5 mb-2 text-sm font-medium block text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                SUBMIT
                            </button>
                            <Link
                                to="/createUser"
                                className="py-2.5 px-5 mb-2 text-sm font-medium block text-gray-900 text-center focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                CREATE ACCOUNT
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInUser;
