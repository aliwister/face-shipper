import React from "react";

const Form = ({ errorMessage, onSubmit }) => (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-8">
        <h5 className="text-lg font-semibold mb-4">Login</h5>
        <div className="mb-4">
            <input
                type="text"
                name="username"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Username"
            />
        </div>
        <div className="mb-4">
            <input
                type="password"
                name="password"
                required
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Password"
            />
        </div>
        <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Login
        </button>

        {errorMessage && <h5 className="text-red-500 mt-4">{errorMessage}</h5>}
    </form>
);

export default Form;
