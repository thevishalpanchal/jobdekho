import "./AdminDashboard.css";
import axios from "axios";
import API_BASE_URL from "../config";

import {
    useEffect,
    useState
} from "react";

function AdminDashboard({
    user,
    logout
}) {

    const [users, setUsers]
        = useState([]);

    const [jobs, setJobs]
        = useState([]);

    const [activeSection,
        setActiveSection]
        = useState("dashboard");

    // FETCH USERS + JOBS

    useEffect(() => {

        fetchUsers();
        fetchJobs();

    }, []);

    const fetchUsers = () => {

        axios.get(
            `${API_BASE_URL}/users`
        )

            .then(response => {

                setUsers(response.data);

            })

            .catch(error => {

                console.log(error);

            });

    };

    const fetchJobs = () => {

        axios.get(
            `${API_BASE_URL}/jobs`
        )

            .then(response => {

                setJobs(response.data);

            })

            .catch(error => {

                console.log(error);

            });

    };

    // DELETE USER

    const deleteUser = (id) => {

        axios.delete(
    `${API_BASE_URL}/users/${id}`
)

            .then(response => {

                alert("User Deleted");

                fetchUsers();

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

            .then(response => {

                alert("Job Deleted");

                fetchJobs();

            })

            .catch(error => {

                console.log(error);

            });

    };

    return (

        <div className="admin-container">

            {/* SIDEBAR */}

            <div className="admin-sidebar">

                <h2>
                    Ardhnarishwar
                </h2>

                <p>
                    Admin Panel
                </p>

                <ul>

                    <li
                        onClick={() =>
                            setActiveSection("dashboard")}
                    >
                        Dashboard
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection("users")}
                    >
                        Users
                    </li>

                    <li
                        onClick={() =>
                            setActiveSection("jobs")}
                    >
                        Jobs
                    </li>

                    <li onClick={logout}>
                        Logout
                    </li>

                </ul>

            </div>

            {/* MAIN */}

            <div className="admin-main">

                {/* DASHBOARD */}

                {
                    activeSection === "dashboard"
                    && (

                        <div>

                            <h1>
                                Admin Dashboard
                            </h1>

                            <div className="stats-grid">

                                <div className="stat-box">

                                    <h2>
                                        {users.length}
                                    </h2>

                                    <p>
                                        Total Users
                                    </p>

                                </div>

                                <div className="stat-box">

                                    <h2>
                                        {
                                            users.filter(
                                                user =>
                                                    user.role ===
                                                    "candidate"
                                            ).length
                                        }
                                    </h2>

                                    <p>
                                        Candidates
                                    </p>

                                </div>

                                <div className="stat-box">

                                    <h2>
                                        {
                                            users.filter(
                                                user =>
                                                    user.role ===
                                                    "employer"
                                            ).length
                                        }
                                    </h2>

                                    <p>
                                        Employers
                                    </p>

                                </div>

                                <div className="stat-box">

                                    <h2>
                                        {jobs.length}
                                    </h2>

                                    <p>
                                        Total Jobs
                                    </p>

                                </div>

                            </div>

                        </div>

                    )
                }

                {/* USERS */}

                {
                    activeSection === "users"
                    && (

                        <div>

                            <h1>
                                All Users
                            </h1>

                            <div className="table-container">

                                <table>

                                    <thead>

                                        <tr>

                                            <th>Name</th>

                                            <th>Email</th>

                                            <th>Role</th>

                                            <th>Action</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            users.map(user => (

                                                <tr
                                                    key={user.id}
                                                >

                                                    <td>
                                                        {user.name}
                                                    </td>

                                                    <td>
                                                        {user.email}
                                                    </td>

                                                    <td>
                                                        {user.role}
                                                    </td>

                                                    <td>

                                                        <button
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                deleteUser(user.id)}
                                                        >
                                                            Delete
                                                        </button>

                                                    </td>

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    )
                }

                {/* JOBS */}

                {
                    activeSection === "jobs"
                    && (

                        <div>

                            <h1>
                                All Jobs
                            </h1>

                            <div className="jobs-grid">

                                {
                                    jobs.map(job => (

                                        <div
                                            className="job-card"
                                            key={job.id}
                                        >

                                            <h3>
                                                {job.title}
                                            </h3>

                                            <p>
                                                {job.company}
                                            </p>

                                            <p>
                                                {job.location}
                                            </p>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteJob(job.id)}
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

            </div>

        </div>

    );
}

export default AdminDashboard;