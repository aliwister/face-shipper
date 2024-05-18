import React from "react";

const Form = ({ setErrorMsg, onSubmit,loading }) => (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto mt-32 p-6 bg-white shadow-md rounded-lg">
        <h5 className="text-2xl font-bold mb-6 text-center">Login</h5>
        <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
            </label>
            <input
                onFocus={()=>setErrorMsg('')}
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
                onFocus={()=>setErrorMsg('')}
                type="password"
                name="password"
                id="password"
                required
                className="mt-1 border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
            />
        </div>
        <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-600 disabled:bg-gray-400 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            {loading? 'Loading...' : 'Login'}
        </button>


    </form>
);

export default Form;
