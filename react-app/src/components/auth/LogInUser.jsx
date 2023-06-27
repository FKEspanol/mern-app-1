import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import people from "@iconify-icons/mdi/people-group";
const LogInUser = () => {
    return (
        <div className="w-full h-screen">
            <div className="grid lg:grid-cols-2 h-full">
                <div className="bg-dark flex justify-center items-center px-3">
                    <div>
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
                <div className="flex justify-center items-center bg-darkWhite px-3">
                    <div className="w-full sm:w-auto">
                        <h2 className="text-4xl uppercase font-bold text-dark mb-10">
                            Login User !
                        </h2>
                        <form className="w-full sm:max-w-[450px] sm:min-w-[450px] flex flex-col">
                            <div className="mb-6">
                                <label
                                    htmlFor="username-success"
                                    className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="username-success"
                                    className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
                                />
                                <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                                    <span className="font-medium">
                                        Alright!
                                    </span>{" "}
                                    Username available!
                                </p>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="username-success"
                                    className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="username-success"
                                    className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
                                />
                                <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                                    <span className="font-medium">
                                        Alright!
                                    </span>{" "}
                                    Username available!
                                </p>
                            </div>
                            <button
                                type="button"
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
