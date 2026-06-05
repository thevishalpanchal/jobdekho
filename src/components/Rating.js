import "./Rating.css";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

function Rating() {

  const [ratings, setRatings] = useState({
    platform: 0,
    recruiter: 0,
    jobs: 0,
    support: 0
  });

  const renderStars = (category) => {

    return [1, 2, 3, 4, 5].map((star) => (

      <FaStar
        key={star}
        className={
          star <= ratings[category]
            ? "star active-star"
            : "star"
        }
        onClick={() =>
          setRatings({
            ...ratings,
            [category]: star
          })
        }
      />

    ));

  };

  const handleSubmitRating = () => {

    console.log(ratings);

   Swal.fire({

  icon: "success",

  title: "Thank You!",

  html: `
    <div style="text-align:left">
      <p><b>Platform:</b> ${ratings.platform}/5 ⭐</p>
      <p><b>Recruiter:</b> ${ratings.recruiter}/5 ⭐</p>
      <p><b>Jobs:</b> ${ratings.jobs}/5 ⭐</p>
      <p><b>Support:</b> ${ratings.support}/5 ⭐</p>
    </div>
  `,

  confirmButtonText: "Awesome!",

  background: "#0f172a",

  color: "#ffffff",

  confirmButtonColor: "#8b5cf6"

});

  };

  return (

    <div className="rating-page">

      <div className="rating-header">

        <div className="rating-icon">
          <FaStar />
        </div>

        <h1>
          Rate Your <span>Experience</span>
        </h1>

        <p>
          Help us improve by rating different aspects of the platform.
        </p>

      </div>

      <div className="rating-container">

        {/* LEFT SIDE */}

        <div className="rating-form-card">

          <h3>⭐ Rate Categories</h3>

          <div className="rating-category">

            <span>Platform Experience</span>

            <div className="stars">
              {renderStars("platform")}
            </div>

          </div>

          <div className="rating-category">

            <span>Recruiter Quality</span>

            <div className="stars">
              {renderStars("recruiter")}
            </div>

          </div>

          <div className="rating-category">

            <span>Job Listings</span>

            <div className="stars">
              {renderStars("jobs")}
            </div>

          </div>

          <div className="rating-category">

            <span>Customer Support</span>

            <div className="stars">
              {renderStars("support")}
            </div>

          </div>

          <textarea
            rows="4"
            placeholder="Additional Comments..."
          />

          <button
            className="submit-rating-btn"
            onClick={handleSubmitRating}
          >
            Submit Rating
          </button>

        </div>

        {/* RIGHT SIDE */}

        <div className="rating-right">

          <div className="top-rated-card">

            <h3>🏆 Top Rated</h3>

            <div className="company-item">
              <span>TechCorp India</span>
              <strong>⭐ 4.9</strong>
            </div>

            <div className="company-item">
              <span>Infosys HR Team</span>
              <strong>⭐ 4.8</strong>
            </div>

            <div className="company-item">
              <span>Wipro Talent</span>
              <strong>⭐ 4.7</strong>
            </div>

            <div className="company-item">
              <span>Google India</span>
              <strong>⭐ 4.9</strong>
            </div>

          </div>

          <div className="stats-card">

            <h3>📊 Platform Stats</h3>

            <div className="stats-grid">

              <div>
                <h2>4.8★</h2>
                <p>Avg Rating</p>
              </div>

              <div>
                <h2>12K+</h2>
                <p>Reviews</p>
              </div>

              <div>
                <h2>98%</h2>
                <p>Satisfaction</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default Rating;