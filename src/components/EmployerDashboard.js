import "./EmployerDashboard.css";
import axios from "axios";
import { useState, useEffect } from "react";
import API_BASE_URL from "../config";

function EmployerDashboard({
    user,
    logout
}) {

    // ACTIVE SECTION

    const [activeSection, setActiveSection]
        = useState("dashboard");

    // JOB LIST

    const [jobs, setJobs] = useState([]);

    // SKILLS

    const [skillInput,
        setSkillInput]
        = useState("");

    const [requiredSkills,
        setRequiredSkills]

        = useState([]);

    // JOB FORM DATA

    const [jobData, setJobData]
        = useState({

            title: "",
            company: "",
            location: "",
            salary: "",
            experience: "",
            openings: "",
            deadline: "",
            jobType: "",
            workMode: "",
            description: ""

        });

    const [applicants,
        setApplicants]
        = useState([]);

    // FETCH EMPLOYER JOBS

    useEffect(() => {

        if (user && user.id) {

            axios.get(
                `${API_BASE_URL}/jobs/employer/${user.id}`
            )

                .then(response => {

                    setJobs(response.data);

                })

                .catch(error => {

                    console.log(error);

                });



            axios.get(
                `${API_BASE_URL}/applications/employer/${user.id}`
            )

                .then(response => {

                    setApplicants(
                        response.data
                    );

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

            [e.target.name]:
                e.target.value

        });

    };

    // GENERATE AI JOB DESCRIPTION

    const generateJD = () => {

        const text =

            `We are hiring a ${jobData.title} for ${jobData.company} located in ${jobData.location}.

Required Skills:
${requiredSkills}

Responsibilities:
- Develop scalable applications
- Collaborate with teams
- Debug and maintain code
- Write production-ready applications

Salary Package:
${jobData.salary}

Preferred candidate should have strong communication and problem-solving skills.`;

        setJobData({

            ...jobData,

            description: text

        });

    };

    // ADD JOB

    const addJob = () => {

        axios.post(
            `${API_BASE_URL}/jobs`,

            {
                ...jobData,

                requiredSkills:
                    requiredSkills,

                employer: {

                    id: user.id

                }
            }
        )

            .then(response => {

                alert("Job Added Successfully");

                // REFRESH JOB LIST

                axios.get(
                    `${API_BASE_URL}/jobs/employer/${user.id}`
                )

                    .then(response => {

                        setJobs(response.data);

                    });

                // CLEAR FORM

                setJobData({

                    title: "",
                    company: "",
                    location: "",
                    salary: "",
                    description: ""

                });

                setRequiredSkills([]);

                // AUTO OPEN MANAGE JOBS

                setActiveSection("manage");

            })

            .catch(error => {

                console.log(error);

            });

    };

    // DELETE JOB

    const deleteJob = (id) => {

        axios.delete(
            `${API_BASE_URL}/jobs/${id}`
        )

            .then(() => {

                setJobs(
                    jobs.filter(
                        job => job.id !== id
                    )
                );

            })

            .catch(error => {

                console.log(error);

            });

    };


    const handleSkillKeyDown = (e) => {

        // ADD SKILL

        if (
            e.key === "Enter"
        ) {

            e.preventDefault();

            if (

                skillInput.trim() !== ""

                &&

                !requiredSkills.includes(
                    skillInput.trim()
                )

            ) {

                setRequiredSkills([

                    ...requiredSkills,

                    skillInput.trim()

                ]);

                setSkillInput("");

            }

        }

        // REMOVE LAST SKILL

        if (

            e.key === "Backspace"

            &&

            skillInput === ""

        ) {

            setRequiredSkills(

                requiredSkills.slice(
                    0,
                    requiredSkills.length - 1
                )

            );

        }

    };

    return (

        <div className="employer-container">

            {/* SIDEBAR */}

            <div className="employer-sidebar">

                <h2>
                    Ardhnarishwar
                </h2>

                <ul>

                    <li
                        onClick={() =>
                            setActiveSection("dashboard")
                        }
                    >
                        Dashboard
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection("postjob")
                        }
                    >
                        Post Job
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection("manage")
                        }
                    >
                        Manage Jobs
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection("applicants")
                        }
                    >
                        Applicants
                    </li>

                    <li
                        onClick={logout}
                    >
                        Logout
                    </li>

                </ul>

            </div>

            {/* MAIN CONTENT */}

            <div className="employer-main">

                {/* DASHBOARD */}

                {
                    activeSection ===
                    "dashboard" && (

                        <div className="dashboard-home">

                            <h1>
                                Welcome Back,
                                {" "}
                                {user.name}
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
                                        AI Enabled
                                    </h2>

                                    <p>
                                        Smart Hiring
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
                                        jobs
                                            .slice(0, 3)
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
                    activeSection ===
                    "postjob" && (

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

                                <input
                                    type="text"
                                    name="experience"
                                    placeholder="Experience Required"

                                    value={jobData.experience}

                                    onChange={handleChange}
                                />

                                <input
                                    type="number"
                                    name="openings"
                                    placeholder="Number of Openings"

                                    value={jobData.openings}

                                    onChange={handleChange}
                                />

                                <input
                                    type="date"
                                    name="deadline"

                                    value={jobData.deadline}

                                    onChange={handleChange}
                                />
                                <select
                                    name="jobType"

                                    value={jobData.jobType}

                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Job Type
                                    </option>

                                    <option>
                                        Full Time
                                    </option>

                                    <option>
                                        Part Time
                                    </option>

                                    <option>
                                        Internship
                                    </option>

                                    <option>
                                        Remote
                                    </option>

                                </select>

                                <select
                                    name="workMode"

                                    value={jobData.workMode}

                                    onChange={handleChange}
                                >

                                    <option value="">
                                        Select Work Mode
                                    </option>

                                    <option>
                                        Work From Office
                                    </option>

                                    <option>
                                        Hybrid
                                    </option>

                                    <option>
                                        Remote
                                    </option>

                                </select>

                                <div className="skills-box">

                                    {

                                        requiredSkills.map((skill, index) => (

                                            <div
                                                key={index}
                                                className="skill-chip"
                                            >

                                                <span>
                                                    {skill}
                                                </span>

                                                <button

                                                    type="button"

                                                    className="remove-skill"

                                                    onClick={() =>

                                                        setRequiredSkills(

                                                            requiredSkills.filter(

                                                                (_, i) =>
                                                                    i !== index

                                                            )

                                                        )

                                                    }
                                                >

                                                    ✖

                                                </button>

                                            </div>

                                        ))

                                    }

                                    <input
                                        type="text"

                                        placeholder={

                                            requiredSkills.length === 0
                                                ?
                                                "Add Required Skills"
                                                :
                                                ""

                                        }

                                        value={skillInput}

                                        onChange={(e) =>
                                            setSkillInput(e.target.value)
                                        }

                                        onKeyDown={handleSkillKeyDown}

                                        className="skill-input"
                                    />

                                </div>

                                <button
                                    className="ai-btn"

                                    onClick={generateJD}
                                >
                                    ✨ Generate Description
                                </button>

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
                    activeSection ===
                    "manage" && (

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

                                            <button
                                                className="delete-btn"

                                                onClick={() =>
                                                    deleteJob(job.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    ))
                                }

                            </div>

                        </div>

                    )
                }

                {/* APPLICANTS */}

                {
                    activeSection ===
                    "applicants" && (

                        <div>

                            <h1>
                                Applicants
                            </h1>

                            {
                                applicants.length > 0 ? (

                                    applicants.map(app => (

                                        <div
                                            className="posted-job-card"
                                            key={app.id}
                                        >

                                            <h3>
                                                {app.candidate.name}
                                            </h3>

                                            <p>

                                                Applied For:
                                                {" "}

                                                {app.job.title}

                                            </p>
                                            <p>

                                                ATS Score:
                                                {" "}

                                                <b>

                                                    {app.atsScore}%

                                                </b>

                                            </p>
                                            <button
                                                className="resume-btn"
                                            >

                                                📄 View Resume

                                            </button>

                                        </div>

                                    ))

                                ) : (

                                    <p>
                                        No Applicants Yet
                                    </p>

                                )
                            }

                        </div>


                    )
                }

            </div>

        </div >

    );

}

export default EmployerDashboard;