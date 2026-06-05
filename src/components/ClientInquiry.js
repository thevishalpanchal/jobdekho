import "./ClientInquiry.css";
import { useState } from "react";

function ClientInquiry() {

    const [selectedPlan, setSelectedPlan] = useState("Growth");

    return (
        <div className="client-inquiry-page">

            {/* Header */}

            <div className="inquiry-header">

                <div className="inquiry-icon">
                    📋
                </div>

                <h1>
                    Client <span>Inquiry</span>
                </h1>

                <p>
                    Tell us your hiring needs and we'll craft the perfect solution.
                </p>

            </div>

            {/* Plan Cards */}

            <div className="plan-cards">

                <div
                    className={`plan-card ${selectedPlan === "Starter" ? "featured" : ""}`}
                    onClick={() => setSelectedPlan("Starter")}
                >
                    <h3>Starter</h3>

                    <h2>₹9,999</h2>

                    <ul>
                        <li>✓ 5 Job Posts</li>
                        <li>✓ Email Support</li>
                        <li>✓ Basic Analytics</li>
                    </ul>
                </div>

                <div
                    className={`plan-card ${selectedPlan === "Growth" ? "featured" : ""}`}
                    onClick={() => setSelectedPlan("Growth")}
                >
                    <h3>Growth</h3>

                    <h2>₹29,999</h2>

                    <ul>
                        <li>✓ Unlimited Jobs</li>
                        <li>✓ Advanced Analytics</li>
                        <li>✓ Priority Support</li>
                    </ul>
                </div>

                <div
                    className={`plan-card ${selectedPlan === "Enterprise" ? "featured" : ""}`}
                    onClick={() => setSelectedPlan("Enterprise")}
                >
                    <h3>Enterprise</h3>

                    <h2>Custom</h2>

                    <ul>
                        <li>✓ Dedicated Manager</li>
                        <li>✓ API Access</li>
                        <li>✓ White Label</li>
                    </ul>
                </div>

            </div>

            {/* Company Form */}
            <div className="selected-plan">
                Selected Plan:
                <span>{selectedPlan}</span>
            </div>
            <div className="company-form">

                <h3>Company Details</h3>

                <div className="form-grid">

                    <input
                        type="text"
                        placeholder="Company Name"
                    />

                    <input
                        type="text"
                        placeholder="Contact Person"
                    />

                    <input
                        type="email"
                        placeholder="Business Email"
                    />

                    <input
                        type="tel"
                        placeholder="Phone Number"
                    />

                    <input
                        type="text"
                        placeholder="Monthly Hiring Volume"
                    />

                    <input
                        type="text"
                        placeholder="Monthly Budget"
                    />

                </div>

                <textarea
                    rows="5"
                    placeholder="Describe your hiring requirements..."
                ></textarea>

                <button>
                    Submit Inquiry
                </button>

            </div>

        </div>
    );
}

export default ClientInquiry;