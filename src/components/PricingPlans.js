import "./PricingPlans.css";
import {
    FaRocket,
    FaCrown,
    FaRoute,
    FaUserTie,
    FaGem,
    FaBuilding
} from "react-icons/fa";

function PricingPlans() {

    return (

        <div className="pricing-page">

            <div className="pricing-header">

                <div className="pricing-icon">
                    <FaGem />
                </div>

                <h1>
                    Pricing <span>Plans</span>
                </h1>

                <p>
                    Choose the perfect recruitment plan for your business.
                </p>

            </div>

            <div className="pricing-cards">

                {/* Starter */}

                <div className="pricing-card">

                    <div className="plan-icon starter">
                        <FaRocket />
                    </div>

                    <h3>Starter</h3>

                    <h2>₹9,999</h2>

                    <span>/month</span>

                    <button>
                        Get Started
                    </button>

                    <ul>
                        <li>✓ 5 Job Posts</li>
                        <li>✓ Resume Search</li>
                        <li>✓ Email Support</li>
                        <li>✓ Basic Analytics</li>
                        <li>✗ AI Matching</li>
                        <li>✗ Dedicated Manager</li>
                    </ul>

                </div>

                {/* Growth */}

                <div className="pricing-card featured">

                    <div className="popular-badge">
                        Most Popular
                    </div>

                    <div className="plan-icon growth">
                        <FaCrown />
                    </div>

                    <h3>Growth</h3>

                    <h2>₹29,999</h2>

                    <span>/month</span>

                    <button>
                        Get Started
                    </button>

                    <ul>
                        <li>✓ Unlimited Jobs</li>
                        <li>✓ AI Job Matching</li>
                        <li>✓ Resume Search</li>
                        <li>✓ Advanced Analytics</li>
                        <li>✓ Priority Support</li>
                        <li>✓ Interview Scheduling</li>
                    </ul>

                </div>

                {/* Enterprise */}

                <div className="pricing-card">

                    <div className="plan-icon enterprise">
                        <FaBuilding />
                    </div>

                    <h3>Enterprise</h3>

                    <h2>Custom</h2>

                    <span>Pricing</span>

                    <button>
                        Contact Sales
                    </button>

                    <ul>
                        <li>✓ Unlimited Everything</li>
                        <li>✓ Dedicated Manager</li>
                        <li>✓ White Label</li>
                        <li>✓ ATS Integration</li>
                        <li>✓ API Access</li>
                        <li>✓ Custom Branding</li>
                    </ul>

                </div>

            </div>

            {/* FAQ */}

            <div className="faq-section">

                <h2>
                    Questions? We have answers
                </h2>

                <div className="faq-grid">

                    <div className="faq-card">
                        <h4>Can I change plans later?</h4>
                        <p>
                            Yes, you can upgrade or downgrade anytime.
                        </p>
                    </div>

                    <div className="faq-card">
                        <h4>Is there a free trial?</h4>
                        <p>
                            Yes, we offer a 14-day free trial.
                        </p>
                    </div>

                    <div className="faq-card">
                        <h4>Which payment methods are accepted?</h4>
                        <p>
                            Credit Card, Debit Card, UPI and Net Banking.
                        </p>
                    </div>

                    <div className="faq-card">
                        <h4>Can I cancel anytime?</h4>
                        <p>
                            Absolutely. No long-term contract required.
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default PricingPlans;