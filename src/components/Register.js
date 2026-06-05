import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function Register() {

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.post(`${API_BASE_URL}/users/register`, user)
            .then(response => {

                alert("Registration Successful");

                console.log(response.data);

            })
            .catch(error => {

                console.log(error);

            });

    };

    return (

        <div className="card">

            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter Name"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={handleChange}
                />

                <br /><br />

                <select
                    name="role"
                    onChange={handleChange}
                >

                    <option value="">
                        Select Role
                    </option>

                    <option value="candidate">
                        Candidate
                    </option>

                    <option value="employer">
                        Employer
                    </option>

                </select>

                <br /><br />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );
}

export default Register;