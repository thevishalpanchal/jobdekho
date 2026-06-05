import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
function AddJob() {

    const [job, setJob] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: ""
    });

    const handleChange = (e) => {

        setJob({
            ...job,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        axios.post(`${API_BASE_URL}/jobs`, job)
            .then(response => {
                alert("Job Added Successfully");
            })
            .catch(error => {
                console.log(error);
            });

    };

    return (

        <div className="card">

            <h1>Post Job</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="salary"
                    placeholder="Salary"
                    onChange={handleChange}
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                ></textarea>

                <br /><br />

                <button type="submit">
                    Add Job
                </button>

            </form>

        </div>
    );
}

export default AddJob;