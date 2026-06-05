import "./CandidateDashboard.css";
import axios from "axios";
import ChatBot from "./ChatBot";
import API_BASE_URL from "../config";


import {
    useEffect,
    useState
} from "react";

import CVMaker from "./CVMaker";

function CandidateDashboard({
    user,
    logout
}) {

    const [atsFile,
        setAtsFile]
        = useState(null);

    const [selectedJob,
        setSelectedJob]
        = useState("");

    const [atsResult,
        setAtsResult]
        = useState(null);
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

    const [

        profileData,

        setProfileData

    ]

        = useState({

            fullName: "",

            headline: "",

            location: "",

            phone: "",

            email: "",

            linkedin: "",

            github: "",

            portfolio: "",

            skills: [],

            education: "",

            experience: "",

            bio: ""

        });


    const [

        profileImage,

        setProfileImage

    ]

        = useState(null);

    // RESUME FILE

    const [resumeFile, setResumeFile]
        = useState(null);

    // SAVED PROFILE

    const [savedProfile, setSavedProfile]
        = useState(null);

    const [showChatBot,
        setShowChatBot]
        = useState(false);

    const scanResume = () => {

        if (!atsFile) {

            alert(
                "Please upload PDF"
            );

            return;

        }

        const formData =
            new FormData();

        formData.append(
            "file",
            atsFile
        );

        axios.post(
            `${API_BASE_URL}/ats/scan`,
            formData,


            {

                headers: {

                    "Content-Type":
                        "multipart/form-data"

                }

            }

        )

            .then(response => {

                setAtsResult(
                    response.data
                );

            })

            .catch(error => {

                console.log(error);

                alert(
                    "ATS Scan Failed"
                );

            });

    };

    // FETCH DATA

    useEffect(() => {

        // FETCH JOBS

        axios.get(
            `${API_BASE_URL}/jobs`
        )

            .then(response => {

                setJobs(response.data);

            })

            .catch(error => {

                console.log(error);

            });

        // FETCH PROFILE

        axios.get(
            `${API_BASE_URL}/profile/${user.id}`
        )

            .then(response => {

                if (response.data) {

                    setSavedProfile(
                        response.data
                    );

                    if (response.data.profileImage) {

                        setProfileImage(
                            `${API_BASE_URL}/uploads/${response.data.profileImage}`
                        );

                    }

                    setProfileData({

                        fullName:
                            response.data.fullName || "",

                        email:
                            response.data.email || "",

                        headline:
                            response.data.headline || "",

                        location:
                            response.data.location || "",

                        phone:
                            response.data.phone || "",

                        linkedin:
                            response.data.linkedin || "",

                        github:
                            response.data.github || "",

                        portfolio:
                            response.data.portfolio || "",

                        bio:
                            response.data.bio || "",

                        skills:
                            response.data.skills || [],

                        education:
                            response.data.education || "",

                        experience:
                            response.data.experience || ""

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
            `${API_BASE_URL}/applications`,
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

        const { name, value } = e.target;

        setProfileData({

            ...profileData,

            [name]:

                name === "skills"

                    ?

                    value.split(",")

                    :

                    value

        });

    };

    // SAVE PROFILE

    const saveProfile = () => {

        if (

            !profileData.fullName

            ||

            !profileData.email

            ||

            !profileData.location

            ||

            !profileData.headline

            ||

            !profileData.phone

            ||

            !profileData.skills

            ||

            !profileData.education

        ) {

            alert(
                "Please fill all required fields"
            );

            return;

        }

        const formData =
            new FormData();

        formData.append(

            "skills",

            Array.isArray(
                profileData.skills
            )

                ?

                profileData.skills.join(",")

                :

                profileData.skills

        );

        formData.append(
            "fullName",
            profileData.fullName
        );

        formData.append(
            "email",
            profileData.email
        );

        formData.append(
            "headline",
            profileData.headline
        );

        formData.append(
            "location",
            profileData.location
        );

        formData.append(
            "phone",
            profileData.phone
        );

        formData.append(
            "linkedin",
            profileData.linkedin
        );

        formData.append(
            "github",
            profileData.github
        );

        formData.append(
            "portfolio",
            profileData.portfolio
        );

        formData.append(
            "bio",
            profileData.bio
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



        if (

            profileImage

            &&

            typeof profileImage !==
            "string"

        ) {

            formData.append(

                "profileImage",

                profileImage

            );

        }

        axios.post(
            `${API_BASE_URL}/profile/upload`,
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

                    fullName:
                        response.data.fullName || "",

                    email:
                        response.data.email || "",

                    headline:
                        response.data.headline || "",

                    location:
                        response.data.location || "",

                    phone:
                        response.data.phone || "",

                    linkedin:
                        response.data.linkedin || "",

                    github:
                        response.data.github || "",

                    portfolio:
                        response.data.portfolio || "",

                    bio:
                        response.data.bio || "",

                    skills:
                        response.data.skills || [],

                    education:
                        response.data.education || "",

                    experience:
                        response.data.experience || ""

                });

                alert(
                    "Profile Saved"
                );

                setProfileData({

                    fullName: "",

                    headline: "",

                    location: "",

                    phone: "",

                    email: "",

                    linkedin: "",

                    github: "",

                    portfolio: "",

                    skills: [],

                    education: "",

                    experience: "",

                    bio: ""

                });

                setResumeFile(null);

                setProfileImage(null);

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

                <div className="logo-section">

                    <img
                        src="/logo.png"
                        alt="Ardhnarishwar Logo"
                        className="sidebar-logo-img"
                    />

                    <h1 className="sidebar-mobile-logo">
                        Ardhnarishwar
                    </h1>

                </div>


                <br />



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

                    <li
                        onClick={() =>
                            setActiveSection(
                                "ats"
                            )}
                    >

                        ATS Checker

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

                            {/* PROFILE IMAGE */}

                            <div className="profile-header-section">

                                <div className="profile-image-upload">
                                    <img

                                        src={

                                            profileImage

                                                ?

                                                typeof profileImage === "string"

                                                    ?

                                                    profileImage

                                                    :

                                                    URL.createObjectURL(
                                                        profileImage
                                                    )

                                                :

                                                "/default-profile.png"

                                        }

                                        alt="Profile"

                                        className="profile-preview-image"

                                    />



                                    <label
                                        htmlFor="profileImageInput"

                                        className="edit-image-btn"
                                    >

                                        ✏️

                                    </label>

                                    <input

                                        id="profileImageInput"

                                        type="file"

                                        accept="image/*"

                                        style={{
                                            display: "none"
                                        }}

                                        onChange={(e) =>

                                            setProfileImage(
                                                e.target.files[0]
                                            )

                                        }

                                    />

                                </div>

                            </div>

                            <label>

                                Full Name

                                <span className="required-star">
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={profileData.fullName}
                                onChange={handleProfileChange}
                            />

                            <label>

                                Professional Headline

                                <span className="required-star">
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="headline"
                                value={profileData.headline}
                                onChange={handleProfileChange}
                            />

                            <label>

                                Location

                                <span className="required-star">
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="location"
                                value={profileData.location}
                                onChange={handleProfileChange}
                            />

                            <label>

                                Phone Number

                                <span className="required-star">
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleProfileChange}
                            />

                            <label>

                                Email

                                <span className="required-star">
                                    *
                                </span>

                            </label>

                            <input
                                type="email"
                                name="email"
                                value={profileData.email}
                                onChange={handleProfileChange}
                            />


                            <label>

                                Skills

                                <span className="required-star">
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="skills"
                                value={

                                    Array.isArray(
                                        profileData.skills
                                    )

                                        ?

                                        profileData.skills.join(",")

                                        :

                                        profileData.skills

                                }
                                onChange={handleProfileChange}
                            />

                            <label>

                                Education

                                <span className="required-star">
                                    *
                                </span>

                            </label>

                            <input
                                type="text"
                                name="education"
                                value={profileData.education}
                                onChange={handleProfileChange}
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

                            <input
                                type="text"
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                value={profileData.linkedin}
                                onChange={handleProfileChange}
                            />


                            <input
                                type="text"
                                name="portfolio"
                                placeholder="Portfolio URL"
                                value={profileData.portfolio}
                                onChange={handleProfileChange}
                            />

                            <textarea

                                name="bio"

                                placeholder="About Me"

                                value={
                                    profileData.bio
                                }

                                onChange={
                                    handleProfileChange
                                }

                            ></textarea>

                            {/* RESUME */}

                            <label className="custom-file-upload">

                                <i className="fa-solid fa-file-arrow-up"></i>

                                Upload Resume (PDF)

                                <input

                                    type="file"

                                    accept=".pdf"

                                    onChange={(e) =>

                                        setResumeFile(
                                            e.target.files[0]
                                        )

                                    }

                                />

                            </label>

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

                                                src={

                                                    savedProfile?.profileImage

                                                        ?

                                                        `${API_BASE_URL}/uploads/`

                                                        +

                                                        savedProfile.profileImage

                                                        :

                                                        "/default-profile.png"

                                                }

                                                alt="Profile"

                                                className="profile-preview-image"

                                            />

                                            <div className="profile-details">

                                                <h2>
                                                    {user.name}
                                                </h2>

                                                <h4>

                                                    {
                                                        savedProfile?.skills

                                                            ?

                                                            savedProfile.skills[0]

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

                {
                    activeSection ===
                    "ats"

                    && (

                        <div className="ats-section">

                            <h1>
                                ATS Resume Checker
                            </h1>

                            {/* JOB SELECT */}

                            <select

                                value={selectedJob}

                                onChange={(e) =>

                                    setSelectedJob(
                                        e.target.value
                                    )

                                }

                            >

                                <option value="">
                                    Select Job
                                </option>

                                {

                                    jobs.map(job => (

                                        <option
                                            key={job.id}
                                            value={job.id}
                                        >

                                            {job.title}

                                        </option>

                                    ))

                                }

                            </select>

                            {/* PDF UPLOAD */}

                            <input

                                type="file"

                                accept=".pdf"

                                onChange={(e) => {

                                    const file =
                                        e.target.files[0];

                                    if (

                                        file

                                        &&

                                        file.type !==
                                        "application/pdf"

                                    ) {

                                        alert(
                                            "Only PDF files allowed"
                                        );

                                        return;

                                    }

                                    setAtsFile(file);

                                }}

                            />

                            {/* BUTTON */}

                            <button
                                onClick={scanResume}
                            >

                                Scan Resume

                            </button>

                            {/* RESULT */}

                            {

                                atsResult && (

                                    <div className="ats-result">

                                        <h2>

                                            ATS Score:
                                            {" "}

                                            {atsResult.score}%

                                        </h2>

                                        <p>

                                            Matched Skills:
                                            {" "}

                                            {

                                                atsResult
                                                    .matchedSkills
                                                    .join(", ")

                                            }

                                        </p>

                                        <p>

                                            Missing Skills:
                                            {" "}

                                            {

                                                atsResult
                                                    .missingSkills
                                                    .join(", ")

                                            }

                                        </p>

                                    </div>

                                )

                            }

                        </div>

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

        </div >

    );
}

export default CandidateDashboard;