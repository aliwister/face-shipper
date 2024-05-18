import React from "react";

const Form = ({ errorMessage, onSubmit }) => (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-32 p-6 bg-white shadow-md rounded-lg">
        <h5 className="text-2xl font-bold mb-6 text-center">Login</h5>
        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
            </label>
            <input
                type="text"
                name="username"
                id="username"
                required
                className="mt-1 border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter your username"
            />
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
            </label>
            <input
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Login
        </button>

        {errorMessage && (
            <p className="mt-4 text-center text-red-600 bg-red-100 border border-red-400 rounded p-2">
                {errorMessage}
            </p>
        )}
    </form>
);

export default Form;
