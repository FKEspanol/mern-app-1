import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import people from "@iconify-icons/mdi/people-group";
import Input from "../reusable/Input";
import ErrorMessage from "./ErrorMessage";

import { ClientError } from "../../error/clientError";

let formBody = {};
const Layout = () => {
    const [errors, setErrors] = useState();
    const navigate = useNavigate();
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
            const response = await fetch("http://localhost:8000/createUser", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(formBody),
            });

            const data = await response.json();
            // console.log(data);
            if (data.errors) {
                console.log(errors);
                throw new ClientError(data.errors);
            } else {
                navigate("/");
            }
        } catch (error) {
            if (error instanceof ClientError) {
                setErrors([...error.errors]);
            } else {
                console.log(error);
            }
        }
    };
    return (
        <div className="w-full h-screen">
            <div className="grid lg:grid-cols-2 h-full">
                <div className="relative bg-dark flex justify-center items-center px-3">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2">
                        <Icon
                            icon={people}
                            className="text-9xl text-primary mb-3"
                        />
                        <h1 className="text-3xl sm:text-5xl xl:text-7xl text-white uppercase font-bold mb-5">
                            Mern Stack
                        </h1>
                        <p className="text-lg text-white">
                            Connect with friends and the world around you on
                            Mern Stack app.
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center w-full bg-darkWhite px-3">
                    <div className="w-full sm:w-auto">
                        <h2 className="text-4xl text-center uppercase font-bold text-dark mb-10">
                            Create User !
                        </h2>
                        <form
                            onChange={onChange}
                            onSubmit={onSubmit}
                            className="w-full sm:max-w-[500px] sm:min-w-[500px] flex flex-col p-8 sm:p-10 bg-white"
                        >
                            <div className="mb-6 grid sm:grid-cols-2">
                                <div className="sm:mr-3">
                                    <label
                                        htmlFor="username-success"
                                        className="block mb-2 text-sm font-medium text-smoke"
                                    >
                                        First Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Your First Name"
                                    />
                                    {errors && (
                                        <ErrorMessage
                                            errors={errors}
                                            inputName="firstName"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="username-success"
                                        className="block mb-2 text-sm font-medium text-smoke"
                                    >
                                        Last Name
                                    </label>
                                    <Input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Your Last Name"
                                    />
                                    {errors && (
                                        <ErrorMessage
                                            errors={errors}
                                            inputName="lastName"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="username-success"
                                    className="block mb-2 text-sm font-medium text-smoke"
                                >
                                    Username
                                </label>
                                <Input
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Your username"
                                />
                                {errors && (
                                    <ErrorMessage
                                        errors={errors}
                                        inputName="username"
                                    />
                                )}
                            </div>
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
                                to="/"
                                className="py-2.5 px-5 mb-2 text-sm font-medium block text-gray-900 text-center focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                LOGIN
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
