import React from "react";
import "./App.css";
import useForm from "./useForm";
import validate from "./LoginFormValidationRules";

const App = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );

  function login() {
    console.log("No errors, submit callback called!");
  }

  return (
    <div className="App-header">
      <div className="conatiner">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              value={values.email || ""}
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="alert alert-danger">{errors.email}</p>
            )}
          </div>

          <div className="form-group">
            <input
              value={values.password || ""}
              type="password"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="alert alert-danger">{errors.password}</p>
            )}
          </div>

          <button type="submit" className="btn btn-success btn-block">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
