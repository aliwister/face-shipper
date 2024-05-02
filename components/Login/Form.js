import React from "react";

const Form = ({ errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <h5>Login</h5>
    <div>
      <input
        type="text"
        name="username"
        required
        label="Username"
        variant="outlined"
      />
    </div>
    <div>
      <input
        type="password"
        name="password"
        required
        label="Password"
        variant="outlined"
      />
    </div>
    <button type="submit">Login</button>

    {errorMessage && <h5>{errorMessage}</h5>}
  </form>
);

export default Form;
