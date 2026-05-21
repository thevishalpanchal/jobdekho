import "./CandidateDashboard.css";
import axios from "axios";
import ChatBot from "./ChatBot";


import {
    useEffect,
    useState
} from "react";

import CVMaker from "./CVMaker";

function CandidateDashboard({
    user,
    logout
}) {

    // JOBS

    const [jobs, setJobs]
        = useState([]);

    // SEARCH

    const [searchTerm, setSearchTerm]
        = useState("");

    // ACTIVE SECTION

    const [activeSection, setActiveSection]
        = useState("dashboard");

    // PROFILE DATA

    const [profileData, setProfileData]
        = useState({
            skills: "",
            education: "",
            experience: "",
            resume: ""
        });

    // RESUME FILE

    const [resumeFile, setResumeFile]
        = useState(null);

    // SAVED PROFILE

    const [savedProfile, setSavedProfile]
        = useState(null);

    const [showChatBot,
        setShowChatBot]
        = useState(false);

    // FETCH DATA

    useEffect(() => {

        // FETCH JOBS

        axios.get(
            "http://localhost:8085/jobs"
        )

            .then(response => {

                setJobs(response.data);

            })

            .catch(error => {

                console.log(error);

            });

        // FETCH PROFILE

        axios.get(
            `http://localhost:8085/profile/${user.id}`
        )

            .then(response => {

                if (response.data) {

                    setSavedProfile(
                        response.data
                    );

                    setProfileData({

                        skills:
                            response.data.skills,

                        education:
                            response.data.education,

                        experience:
                            response.data.experience

                    });

                }

            })

            .catch(error => {

                console.log(error);

            });

    }, [user.id]);

    // APPLY JOB

    const applyJob = (job) => {

        axios.post(
            "http://localhost:8085/applications",
            {
                candidate: user,
                job: job
            }
        )

            .then(response => {

                alert(
                    "Applied Successfully"
                );

            })

            .catch(error => {

                console.log(error);

            });

    };

    // HANDLE PROFILE INPUT

    const handleProfileChange = (e) => {

        setProfileData({

            ...profileData,

            [e.target.name]:
                e.target.value

        });

    };

    // SAVE PROFILE

    const saveProfile = () => {

        const formData =
            new FormData();

        formData.append(
            "skills",
            profileData.skills
        );

        formData.append(
            "education",
            profileData.education
        );

        formData.append(
            "experience",
            profileData.experience
        );

        formData.append(
            "userId",
            user.id
        );

        if (resumeFile) {

            formData.append(
                "file",
                resumeFile
            );

        }

        axios.post(
            "http://localhost:8085/profile/upload",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data"
                }
            }
        )

            .then(response => {

                setSavedProfile(
                    response.data
                );

                setProfileData({

                    skills:
                        response.data.skills,

                    education:
                        response.data.education,

                    experience:
                        response.data.experience

                });

                alert(
                    "Profile Saved"
                );

            })

            .catch(error => {

                console.log(error);

            });

    };

    // FILTER JOBS

    const filteredJobs =
        jobs.filter(job =>

            job.title
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )

            ||

            job.company
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )

            ||

            job.location
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )

        );

    const profileCompletion = [

        savedProfile?.skills,

        savedProfile?.education,

        savedProfile?.experience,

        savedProfile?.resume

    ].filter(Boolean).length * 25;

    return (

        <div className="dashboard-container">

            {/* SIDEBAR */}

            <div className="sidebar">

                <h1 className="mobile-logo">
                    JobDekho
                </h1>

                <h2>


                    <br />



                </h2>
                <ul>

                    <li
                        onClick={() =>
                            setActiveSection(
                                "dashboard"
                            )}
                    >
                        Dashboard
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection(
                                "profile"
                            )}
                    >
                        My Profile
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection(
                                "jobs"
                            )}
                    >
                        Jobs
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection(
                                "cvmaker"
                            )}
                    >
                        CV Maker
                    </li>

                    <li onClick={logout}>
                        Logout
                    </li>

                </ul>

            </div>

            {/* MAIN CONTENT */}

            <div className="main-content">

                {/* DASHBOARD */}

                {
                    activeSection ===
                    "dashboard"

                    && (

                        <div className="dashboard-home">

                            <h1>

                                Welcome Back,
                                {" "}
                                {user.name}

                            </h1>

                            <p className="dashboard-text">

                                Explore opportunities
                                and track your
                                applications.

                            </p>

                            {/* STATS */}

                            <div className="stats-container">

                                <div className="stat-card">

                                    <h2>
                                        {jobs.length}
                                    </h2>

                                    <p>
                                        Total Jobs
                                    </p>

                                </div>

                                <div className="stat-card">

                                    <h2>
                                        12
                                    </h2>

                                    <p>
                                        Applied Jobs
                                    </p>

                                </div>

                                <div className="stat-card">

                                    <h2>
                                        Complete
                                    </h2>

                                    <p>
                                        Profile Status
                                    </p>

                                </div>

                                <div className="stat-card">

                                    <h2>
                                        Uploaded
                                    </h2>

                                    <p>
                                        Resume
                                    </p>

                                </div>

                            </div>

                            {/* RECENT JOBS */}

                            <div className="recent-jobs">

                                <h2>
                                    Latest Opportunities
                                </h2>

                                <div className="jobs-container">

                                    {
                                        jobs.length > 0

                                            ? (

                                                jobs
                                                    .slice(0, 3)
                                                    .map(job => (

                                                        <div
                                                            className="job-card"
                                                            key={job.id}
                                                        >

                                                            <h2>
                                                                {job.title}
                                                            </h2>

                                                            <p>

                                                                <b>
                                                                    Company:
                                                                </b>

                                                                {" "}

                                                                {job.company}

                                                            </p>

                                                            <p>

                                                                <b>
                                                                    Location:
                                                                </b>

                                                                {" "}

                                                                {job.location}

                                                            </p>

                                                        </div>

                                                    ))

                                            )

                                            : (

                                                <p>
                                                    No jobs available
                                                </p>

                                            )

                                    }

                                </div>

                            </div>

                        </div>

                    )
                }

                {/* PROFILE */}

                {
                    activeSection ===
                    "profile"

                    && (

                        <div className="profile-section">

                            <h2>
                                My Profile
                            </h2>

                            <input
                                type="text"
                                name="skills"
                                placeholder="Skills"
                                value={profileData.skills}
                                onChange={
                                    handleProfileChange
                                }
                            />

                            <input
                                type="text"
                                name="education"
                                placeholder="Education"
                                value={
                                    profileData.education
                                }
                                onChange={
                                    handleProfileChange
                                }
                            />

                            <input
                                type="text"
                                name="experience"
                                placeholder="Experience"
                                value={
                                    profileData.experience
                                }
                                onChange={
                                    handleProfileChange
                                }
                            />

                            {/* RESUME */}

                            <input
                                type="file"
                                onChange={(e) =>

                                    setResumeFile(
                                        e.target.files[0]
                                    )

                                }
                            />

                            <button
                                onClick={saveProfile}
                            >

                                {
                                    savedProfile

                                        ?

                                        "Update Profile"

                                        :

                                        "Save Profile"

                                }

                            </button>

                            {/* SAVED PROFILE */}

                            {
                                savedProfile && (

                                    <div className="modern-profile-card">

                                        {/* TOP SECTION */}

                                        <div className="profile-top">

                                            <img
                                                src="https://i.pravatar.cc/150"
                                                alt="profile"
                                                className="profile-image"
                                            />

                                            <div className="profile-details">

                                                <h2>
                                                    {user.name}
                                                </h2>

                                                <h4>

                                                    {
                                                        savedProfile?.skills

                                                            ?

                                                            savedProfile.skills
                                                                .split(",")[0]

                                                            :

                                                            "No Skills Added"
                                                    }

                                                </h4>

                                                <p>

                                                    📍

                                                    {
                                                        savedProfile?.location

                                                        ||

                                                        "Location not added"
                                                    }
                                                </p>

                                                {/* PROGRESS */}

                                                <div className="progress-section">

                                                    <div className="progress-text">

                                                        <span>
                                                            Profile Completion
                                                        </span>

                                                        <span>
                                                            {profileCompletion}%
                                                        </span>

                                                    </div>

                                                    <div className="progress-bar">

                                                        <div
                                                            className="progress-fill"

                                                            style={{
                                                                width:
                                                                    `${profileCompletion}%`
                                                            }}
                                                        >

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                        {/* PROFILE INFO */}

                                        <div className="profile-info">

                                            <div className="info-box">

                                                <h4>
                                                    Skills
                                                </h4>

                                                <p>
                                                    {savedProfile.skills}
                                                </p>

                                            </div>

                                            <div className="info-box">

                                                <h4>
                                                    Education
                                                </h4>

                                                <p>
                                                    {savedProfile.education}
                                                </p>

                                            </div>

                                            <div className="info-box">

                                                <h4>
                                                    Experience
                                                </h4>

                                                <p>
                                                    {savedProfile.experience}
                                                </p>

                                            </div>

                                            <div className="info-box">

                                                <h4>
                                                    Resume
                                                </h4>

                                                <p>
                                                    {savedProfile.resume}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                )
                            }

                        </div>

                    )
                }

                {/* JOBS */}

                {
                    activeSection ===
                    "jobs"

                    && (

                        <>

                            <div className="top-bar">

                                <h1>
                                    Available Jobs
                                </h1>

                                <input
                                    type="text"
                                    placeholder="Search jobs..."
                                    className="search-box"
                                    value={searchTerm}
                                    onChange={(e) =>

                                        setSearchTerm(
                                            e.target.value
                                        )

                                    }
                                />

                            </div>

                            <div className="jobs-container">

                                {
                                    filteredJobs.map(job => (

                                        <div
                                            className="job-card"
                                            key={job.id}
                                        >

                                            <h2>
                                                {job.title}
                                            </h2>

                                            <p>

                                                <b>
                                                    Company:
                                                </b>

                                                {" "}

                                                {job.company}

                                            </p>

                                            <p>

                                                <b>
                                                    Location:
                                                </b>

                                                {" "}

                                                {job.location}

                                            </p>

                                            <p>

                                                <b>
                                                    Salary:
                                                </b>

                                                {" "}

                                                {job.salary}

                                            </p>

                                            <button
                                                onClick={() =>
                                                    applyJob(job)}
                                            >
                                                Apply Now
                                            </button>

                                        </div>

                                    ))
                                }

                            </div>

                        </>

                    )
                }

                {/* CV MAKER */}

                {
                    activeSection ===
                    "cvmaker"

                    && (

                        <CVMaker />

                    )
                }

            </div>

            {/* FLOATING AI BUTTON */}

            <button
                className="ai-button"
                onClick={() =>

                    setShowChatBot(
                        !showChatBot
                    )

                }
            >

                🤖

            </button>

            {
                showChatBot
                && (

                    <div className="chatbot-popup">

                        <ChatBot />

                    </div>

                )
            }

        </div>

    );
}

export default CandidateDashboard;