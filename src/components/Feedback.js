import "./Feedback.css";
import { useState } from "react";
import {
  FaComments,
  FaStar,
  FaPaperPlane
} from "react-icons/fa";

function Feedback() {

  const [rating, setRating] = useState(5);

  return (

    <div className="feedback-page">

      <div className="feedback-header">

        <div className="feedback-icon">
          <FaComments />
        </div>

        <h1>
          Share Your <span>Feedback</span>
        </h1>

        <p>
          Your feedback helps us improve Ardhnarishwar for everyone.
        </p>

      </div>

      <div className="feedback-container">

        {/* LEFT */}

        <div className="feedback-form-card">

          <h2>✨ Your Experience</h2>

          <div className="emoji-rating">

            <span onClick={() => setRating(1)}>😡</span>
            <span onClick={() => setRating(2)}>😕</span>
            <span onClick={() => setRating(3)}>😐</span>
            <span onClick={() => setRating(4)}>😊</span>
            <span onClick={() => setRating(5)}>🤩</span>

          </div>

          <select>
            <option>Select Category</option>
            <option>Jobs</option>
            <option>CV Builder</option>
            <option>AI Matching</option>
            <option>Interview</option>
          </select>

          <textarea
            rows="6"
            placeholder="Tell us what you loved or what we can improve..."
          />

          <div className="feedback-row">

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Email"
            />

          </div>

          <button className="feedback-submit-btn">

            <FaPaperPlane />

            Submit Feedback

          </button>

        </div>

        {/* RIGHT */}

        <div className="feedback-right">

          <div className="review-card">

            <h3>Recent Reviews</h3>

            <div className="review-item">

              <strong>Rahul S.</strong>

              <div className="stars">
                ⭐⭐⭐⭐⭐
              </div>

              <p>
                AI Job Matching helped me find
                my dream role.
              </p>

            </div>

            <div className="review-item">

              <strong>Priya M.</strong>

              <div className="stars">
                ⭐⭐⭐⭐
              </div>

              <p>
                Excellent experience and smooth UI.
              </p>

            </div>

          </div>

          <div className="ratings-card">

            <h3>Platform Ratings</h3>

            <div className="rating-bar">

              <span>Job Quality</span>

              <div className="bar">
                <div style={{ width: "95%" }} />
              </div>

            </div>

            <div className="rating-bar">

              <span>UI / UX</span>

              <div className="bar">
                <div style={{ width: "90%" }} />
              </div>

            </div>

            <div className="rating-bar">

              <span>Support</span>

              <div className="bar">
                <div style={{ width: "92%" }} />
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Feedback;