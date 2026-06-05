import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

function Jobs() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        axios.get(`${API_BASE_URL}/jobs`)
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, []);

    return (

        <div>

            <h1>Available Jobs</h1>

            {
                jobs.map(job => (

                    <div key={job.id} className="card">

                        <h2>{job.title}</h2>

                        <p><b>Company:</b> {job.company}</p>

                        <p><b>Location:</b> {job.location}</p>

                        <p><b>Salary:</b> {job.salary}</p>

                        <p>{job.description}</p>

                        <button>Apply</button>

                    </div>

                ))
            }

        </div>
    );
}

export default Jobs;