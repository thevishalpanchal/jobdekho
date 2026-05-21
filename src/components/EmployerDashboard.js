import "./EmployerDashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";

function EmployerDashboard({
    user,
    logout
}) {

    // ACTIVE SECTION

    const [activeSection, setActiveSection]
    = useState("dashboard");

    // JOB LIST

    const [jobs, setJobs] = useState([]);

    // JOB FORM DATA

    const [jobData, setJobData] = useState({
        title:"",
        company:"",
        location:"",
        salary:"",
        description:""
    });

    // FETCH EMPLOYER JOBS

   useEffect(() => {

    if(user && user.id){

        axios.get(
            `http://localhost:8085/jobs/employer/${user.id}`
        )

        .then(response => {

            setJobs(response.data);

        })

        .catch(error => {

            console.log(error);

        });

    }

}, [user]);

    // HANDLE INPUT CHANGE

    const handleChange = (e) => {

        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });

    };

    // ADD JOB

    const addJob = () => {

        axios.post(
            "http://localhost:8085/jobs",
            {
                ...jobData,
                employer:user
            }
        )

        .then(response => {

            alert("Job Added Successfully");

            // REFRESH JOB LIST

            axios.get(
                `http://localhost:8085/jobs/employer/${user.id}`
            )

            .then(response => {

                setJobs(response.data);

            });

            // CLEAR FORM

            setJobData({
                title:"",
                company:"",
                location:"",
                salary:"",
                description:""
            });

            // AUTO OPEN MANAGE JOBS

            setActiveSection("manage");

        })

        .catch(error => {

            console.log(error);

        });

    };

    return (

        <div className="employer-container">

            {/* SIDEBAR */}

            <div className="employer-sidebar">

                <h2>
                    JobDekho
                </h2>

                <ul>

                    <li
                        onClick={() =>
                        setActiveSection("dashboard")}
                    >
                        Dashboard
                    </li>

                    <li
                        onClick={() =>
                        setActiveSection("postjob")}
                    >
                        Post Job
                    </li>

                    <li
                        onClick={() =>
                        setActiveSection("manage")}
                    >
                        Manage Jobs
                    </li>

                    <li>
                        Applicants
                    </li>

                    <li onClick={logout}>
                        Logout
                    </li>

                </ul>

            </div>

            {/* MAIN CONTENT */}

            <div className="employer-main">

                {/* DASHBOARD */}

                {
                activeSection === "dashboard" && (

                    <div className="dashboard-home">

                        <h1>
                            Welcome Back, {user.name}
                        </h1>

                        <p className="dashboard-subtitle">
                            Manage jobs and track
                            applicants easily.
                        </p>

                        {/* STATS */}

                        <div className="stats-container">

                            <div className="stat-card">

                                <h2>
                                    {jobs.length}
                                </h2>

                                <p>
                                    Total Jobs Posted
                                </p>

                            </div>

                            <div className="stat-card">

                                <h2>
                                    24
                                </h2>

                                <p>
                                    Total Applicants
                                </p>

                            </div>

                            <div className="stat-card">

                                <h2>
                                    {jobs.length}
                                </h2>

                                <p>
                                    Active Jobs
                                </p>

                            </div>

                            <div className="stat-card">

                                <h2>
                                    Complete
                                </h2>

                                <p>
                                    Company Profile
                                </p>

                            </div>

                        </div>

                        {/* RECENT JOBS */}

                        <div className="recent-jobs">

                            <h2>
                                Recent Posted Jobs
                            </h2>

                            <div className="jobs-grid">

                                {
                                    jobs.slice(0,3)
                                    .map(job => (

                                        <div
                                            className="job-box"
                                            key={job.id}
                                        >

                                            <h3>
                                                {job.title}
                                            </h3>

                                            <p>
                                                {job.location}
                                            </p>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    </div>

                )
                }

                {/* POST JOB */}

                {
                activeSection === "postjob" && (

                    <>

                        <h1>
                            Post New Job
                        </h1>

                        <div className="job-form">

                            <input
                                type="text"
                                name="title"
                                placeholder="Job Title"
                                value={jobData.title}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="company"
                                placeholder="Company Name"
                                value={jobData.company}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={jobData.location}
                                onChange={handleChange}
                            />

                            <input
                                type="text"
                                name="salary"
                                placeholder="Salary Package"
                                value={jobData.salary}
                                onChange={handleChange}
                            />

                            <textarea
                                name="description"
                                placeholder="Job Description"
                                value={jobData.description}
                                onChange={handleChange}
                            ></textarea>

                            <button onClick={addJob}>
                                Post Job
                            </button>

                        </div>

                    </>

                )
                }

                {/* MANAGE JOBS */}

                {
                activeSection === "manage" && (

                    <div>

                        <h1>
                            Posted Jobs
                        </h1>

                        <div className="posted-jobs">

                            {
                                jobs.map(job => (

                                    <div
                                        className="posted-job-card"
                                        key={job.id}
                                    >

                                        <h3>
                                            {job.title}
                                        </h3>

                                        <p>
                                            <b>Company:</b>
                                            {" "}
                                            {job.company}
                                        </p>

                                        <p>
                                            <b>Location:</b>
                                            {" "}
                                            {job.location}
                                        </p>

                                        <p>
                                            <b>Salary:</b>
                                            {" "}
                                            {job.salary}
                                        </p>

                                        <p>
                                            {job.description}
                                        </p>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                )
                }

            </div>

        </div>

    );
}

export default EmployerDashboard;