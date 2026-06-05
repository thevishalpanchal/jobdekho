import "./ContactUs.css";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaHeadset
} from "react-icons/fa";

function ContactUs() {

  return (

    <section className="contact-page">

      <div className="contact-header">

        <div className="support-icon">
          <FaHeadset />
        </div>

        <h1>
          Contact <span>Support</span>
        </h1>

        <p>
          We're here to help. Reach out and we'll get back to you within hours.
        </p>

      </div>

      <div className="contact-cards">

        <div className="contact-card">
          <FaEnvelope />
          <h4>EMAIL US</h4>
          <p>support@ardhnarishwar.com</p>
        </div>

        <div className="contact-card">
          <FaPhone />
          <h4>CALL US</h4>
          <p>+91 XXXXX XXXXX</p>
        </div>

        <div className="contact-card">
          <FaMapMarkerAlt />
          <h4>VISIT US</h4>
          <p>Noida Sector 63</p>
        </div>

        <div className="contact-card">
          <FaClock />
          <h4>SUPPORT HOURS</h4>
          <p>Mon-Sat 9AM-7PM</p>
        </div>

      </div>

      <div className="contact-grid">

        <div className="contact-form">

          <h3>💬 Send a Message</h3>

          <input placeholder="Your Name" />

          <input placeholder="Email Address" />

          <select>
            <option>Select Topic</option>
            <option>Technical Issue</option>
            <option>Candidate Support</option>
            <option>Employer Support</option>
            <option>Billing</option>
          </select>

          <textarea
            rows="6"
            placeholder="Describe your issue..."
          ></textarea>

          <button>Send Message</button>

        </div>

        <div className="faq-box">

          <h3>⚡ Quick Answers</h3>

          <div className="faq-item">
            How do I reset my password?
          </div>

          <div className="faq-item">
            How long does it take to get a response?
          </div>

          <div className="faq-item">
            Can I change my account role?
          </div>

          <div className="faq-item">
            Is my data secure?
          </div>

        </div>

      </div>

    </section>

  );
}

export default ContactUs;