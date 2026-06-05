import "./Blacklist.css";
import {
  FaShieldAlt,
  FaSearch,
  FaPlus,
  FaTrash,
  FaBuilding,
  FaUser
} from "react-icons/fa";

function Blacklist() {

  const blacklistData = [
    {
      id: 1,
      name: "Fake Recruiter Co.",
      type: "Company",
      reason: "Fraudulent job postings",
      risk: "High"
    },
    {
      id: 2,
      name: "John Spam",
      type: "User",
      reason: "Repeated spam applications",
      risk: "Medium"
    },
    {
      id: 3,
      name: "ScamJobs Ltd.",
      type: "Company",
      reason: "Payment fraud reported",
      risk: "High"
    }
  ];

  return (

    <div className="blacklist-page">

      <div className="blacklist-header">

        <div className="blacklist-icon">
          <FaShieldAlt />
        </div>

        <h1>
          Blacklist <span>Manager</span>
        </h1>

        <p>
          Flag and manage fraudulent users,
          companies and suspicious activity.
        </p>

      </div>

      <div className="blacklist-actions">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search blacklist..."
          />

        </div>

        <button className="add-blacklist-btn">

          <FaPlus />

          Add to Blacklist

        </button>

      </div>

      <div className="blacklist-list">

        {blacklistData.map((item) => (

          <div
            key={item.id}
            className="blacklist-card"
          >

            <div className="card-left">

              <div className="card-icon">

                {item.type === "Company"
                  ? <FaBuilding />
                  : <FaUser />
                }

              </div>

              <div>

                <h3>
                  {item.name}

                  <span className="type-badge">
                    {item.type}
                  </span>

                </h3>

                <p>
                  ⚠ {item.reason}
                </p>

              </div>

            </div>

            <div className="card-right">

              <span
                className={`risk-badge ${
                  item.risk.toLowerCase()
                }`}
              >
                {item.risk}
              </span>

              <button className="delete-btn">
                <FaTrash />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Blacklist;