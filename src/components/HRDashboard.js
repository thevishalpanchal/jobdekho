import "./HRDashboard.css";
import { useState } from "react";
import CountUp from "react-countup";

import {
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaBullseye,
  FaHeartbeat,
  FaCheckCircle,
  FaTimesCircle,
  FaUserPlus,
  FaChartLine,
  FaClipboardList
} from "react-icons/fa";

function HRDashboard() {

  const [activeTab, setActiveTab] =
    useState("overview");

  return (

    <div className="hr-dashboard">

      <div className="dashboard-header">

        <div>

          <h1>HR Dashboard</h1>

          <p>
            Thursday, May 14, 2026
          </p>

        </div>

        <div className="dashboard-tabs">

          <button
            className={
              activeTab === "overview"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab("overview")
            }
          >
            Overview
          </button>

          <button
            className={
              activeTab === "pipeline"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab("pipeline")
            }
          >
            Pipeline
          </button>

          <button
            className={
              activeTab === "interviews"
                ? "active-tab"
                : ""
            }
            onClick={() =>
              setActiveTab("interviews")
            }
          >
            Interviews
          </button>

        </div>

      </div>

      <div className="stats-grid">

        <div className="stat-card purple">

          <FaBriefcase />

          <h2>
            <CountUp
              end={24}
              duration={2}
            />
          </h2>

          <p>Open Positions</p>

        </div>

        <div className="stat-card green">

          <FaUsers />

          <h2>
            <CountUp
              end={186}
              duration={2}
            />
          </h2>

          <p>Active Candidates</p>

        </div>

        <div className="stat-card orange">

          <FaCalendarAlt />

          <h2>
            <CountUp
              end={8}
              duration={2}
            />
          </h2>

          <p>Interviews Today</p>

        </div>

        <div className="stat-card blue">

          <FaBullseye />

          <h2>
            <CountUp
              end={5}
              duration={2}
            />
          </h2>

          <p>Offers Pending</p>

        </div>

      </div>

      {activeTab === "overview" && (

        <div className="dashboard-content">

          <div className="activity-card">

            <h3>
              <FaHeartbeat />
              Recent Activity
            </h3>

            <div className="activity-item">
              <FaCheckCircle />
              Offer sent to Ananya Roy
            </div>

            <div className="activity-item">
              <FaCalendarAlt />
              Interview scheduled with Karan Malhotra
            </div>

            <div className="activity-item">
              <FaTimesCircle />
              Application rejected for Ravi Gupta
            </div>

            <div className="activity-item">
              <FaUserPlus />
              New application from Divya Nair
            </div>

          </div>

          <div className="week-card">

            <h3>
              <FaChartLine />
              This Week
            </h3>

            <div className="progress-box">
              <span>Applications Received</span>
              <span>47/60</span>
            </div>

            <div className="progress">
              <div
                className="progress-fill purple-fill"
                style={{ width: "78%" }}
              />
            </div>

            <div className="progress-box">
              <span>Interviews Conducted</span>
              <span>23/30</span>
            </div>

            <div className="progress">
              <div
                className="progress-fill green-fill"
                style={{ width: "76%" }}
              />
            </div>

            <div className="progress-box">
              <span>Offers Extended</span>
              <span>8/10</span>
            </div>

            <div className="progress">
              <div
                className="progress-fill orange-fill"
                style={{ width: "80%" }}
              />
            </div>

            <div className="progress-box">
              <span>Positions Filled</span>
              <span>5/8</span>
            </div>

            <div className="progress">
              <div
                className="progress-fill blue-fill"
                style={{ width: "62%" }}
              />
            </div>

          </div>

        </div>

      )}

      {activeTab === "pipeline" && (

        <div className="pipeline-section">

          <h2>Hiring Pipeline</h2>

          <div className="pipeline-cards">

            <div className="pipeline-card">
              <h2>186</h2>
              <p>Applied</p>
            </div>

            <div className="pipeline-card">
              <h2>124</h2>
              <p>Screened</p>
            </div>

            <div className="pipeline-card">
              <h2>56</h2>
              <p>Interview</p>
            </div>

            <div className="pipeline-card">
              <h2>18</h2>
              <p>Offer</p>
            </div>

            <div className="pipeline-card">
              <h2>9</h2>
              <p>Hired</p>
            </div>

          </div>

        </div>

      )}

      {activeTab === "interviews" && (

        <div className="interview-section">

          <h2>
            <FaClipboardList />
            Today's Interviews
          </h2>

          <div className="interview-card">
            Rahul Sharma - 10:00 AM
          </div>

          <div className="interview-card">
            Priya Mehta - 11:30 AM
          </div>

          <div className="interview-card">
            Amit Kumar - 2:00 PM
          </div>

          <div className="interview-card">
            Sneha Patel - 3:30 PM
          </div>

          <div className="interview-card">
            Vikram Singh - 5:00 PM
          </div>

        </div>

      )}

    </div>

  );

}

export default HRDashboard;