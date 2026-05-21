import "./CVMaker.css";
import { useState } from "react";
import html2pdf from "html2pdf.js";

function CVMaker() {

    const [cvData, setCvData] = useState({

        firstName:"",
        middleName:"",
        lastName:"",
        designation:"",
        phone:"",
        email:"",
        location:"",
        linkedin:"",
        summary:"",
        skills:"",
        experience:"",
        projects:"",
        education:"",
        certifications:""

    });

    const handleChange = (e) => {

        console.log(cvData.experience);     
        setCvData({
            ...cvData,
            [e.target.name]: e.target.value
        });

    };

    // DOWNLOAD PDF

    const downloadPDF = () => {

    const element =
    document.getElementById(
        "resume-template"
    );

    const options = {

        margin:0.5,

        filename:
        "Resume.pdf",

        image:{
            type:"jpeg",
            quality:1
        },

        html2canvas:{
            scale:2
        },

        jsPDF:{
            unit:"in",
            format:"a4",
            orientation:"portrait"
        }

    };

    html2pdf()
    .set(options)
    .from(element)
    .save();

};

    // DOWNLOAD WORD

    const downloadWord = () => {

        const content = `

${cvData.firstName}
${cvData.middleName}
${cvData.lastName}

${cvData.designation}

Phone: ${cvData.phone}

Email: ${cvData.email}

Location: ${cvData.location}

LinkedIn:
${cvData.linkedin}

PROFESSIONAL SUMMARY

${cvData.summary}

TECHNICAL SKILLS

${cvData.skills}

WORK EXPERIENCE

${cvData.experience}

PROJECTS

${cvData.projects}

EDUCATION

${cvData.education}

CERTIFICATIONS

${cvData.certifications}

`;

        const downloadWord = () => {

    const content =
    document.getElementById(
        "resume-template"
    ).innerHTML;

    const html = `

    <html>

    <head>

    <meta charset='utf-8'>

    <title>
        Resume
    </title>

    </head>

    <body>

    ${content}

    </body>

    </html>

    `;

    const blob =
    new Blob(
        [html],
        {
            type:
            "application/msword"
        }
    );

    const link =
    document.createElement("a");

    link.href =
    URL.createObjectURL(blob);

    link.download =
    "Resume.doc";

    link.click();

};

    };

    return (

        <div className="cv-container">

            {/* FORM */}

            <div className="cv-form">

                <h1>
                    CV Maker
                </h1>

                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="middleName"
                    placeholder="Middle Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="designation"
                    placeholder="Designation"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    onChange={handleChange}
                />

                <textarea
                    name="summary"
                    placeholder="Professional Summary"
                    onChange={handleChange}
                ></textarea>

                <textarea
                    name="skills"
                    placeholder="Technical Skills"
                    onChange={handleChange}
                ></textarea>

                <textarea
                 name="experience"
                 placeholder="Work Experience"
                 value={cvData.experience}
                 onChange={handleChange}
                ></textarea>

                <textarea
                    name="projects"
                    placeholder="Projects"
                    onChange={handleChange}
                ></textarea>

                <textarea
                    name="education"
                    placeholder="Education"
                    onChange={handleChange}
                ></textarea>

                <textarea
                    name="certifications"
                    placeholder="Certifications & Learning"
                    onChange={handleChange}
                ></textarea>

                <div className="cv-buttons">

                    <button onClick={downloadPDF}>
                        Download PDF
                    </button>

                   {/* <button onClick={downloadWord}>
                      Download Word
                    </button> */}

                </div>

            </div>

            {/* RESUME PREVIEW */}

                            <div
                    className="cv-preview"
                    id="resume-template"
                >

                <h1>

                    {cvData.firstName}
                    {" "}

                    {cvData.middleName}
                    {" "}

                    {cvData.lastName}

                </h1>

                <h3>
                    {cvData.designation}
                </h3>

                <p>

                    📞 {cvData.phone}

                    {" | "}

                    ✉ {cvData.email}

                    {" | "}

                    📍 {cvData.location}

                </p>

                <p>
                    LinkedIn:
                    {" "}
                    {cvData.linkedin}
                </p>

                <hr />

                <h2>
                    PROFESSIONAL SUMMARY
                </h2>

                <p>
                    {cvData.summary}
                </p>

                <h2>
                    TECHNICAL SKILLS
                </h2>

                <p>
                    {cvData.skills}
                </p>

                <h2>
                    WORK EXPERIENCE
                </h2>

                <p style={{
                    whiteSpace:"pre-line"
                }}>
                    {cvData.experience}
                </p>

                <h2>
                    PROJECTS
                </h2>

                <p style={{
                   whiteSpace:"pre-line"
                    }}>
               {cvData.projects}
                </p>

                <h2>
                    EDUCATION
                </h2>

                <p style={{
                   whiteSpace:"pre-line"
                    }}>
               {cvData.education}
                </p>

                <h2>
                    CERTIFICATIONS & LEARNING
                </h2>

                <p style={{
                   whiteSpace:"pre-line"
                    }}>
               {cvData.certifications}
                </p>

            </div>

        </div>

    );
}

export default CVMaker;