import React from 'react';
import QAOSidebar from '../../components/QAOSidebar';

const pageStyle = {
  fontFamily: 'Arial, sans-serif',
  backgroundColor: '#f4f4f4',
  padding: '20px',
};

const headerStyle = {
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '20px 0',
};

const sectionStyle = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  margin: '20px 0',
};

const contentStyle = {
  lineHeight: '1.6',
  margin: '10px 0',
};

const QualityAssurancePage = () => {
  return (
    <div className="container-scroller">
    <div className="container-fluid page-body-wrapper">
      <QAOSidebar />
      <div className="main-panel">
        <div className="content-wrapper">
    <div style={pageStyle}>
      <h1 style={headerStyle}>Quality Assurance Policies and Processes</h1>
      <section style={sectionStyle}>
        <h2>About Quality Assurance</h2>
        <p style={contentStyle}>
          Quality assurance is a systematic process that ensures the quality and
          consistency of our services, products, and processes. At our
          organization, we are committed to maintaining the highest standards of
          quality.
        </p>
        <h2>Our Commitment to Quality</h2>
        <p style={contentStyle}>
          We believe that quality is not just a goal; it's a way of life. Our
          commitment to quality is reflected in every aspect of our operations.
        </p>
        <h2>Quality Assurance Processes</h2>
        <p style={contentStyle}>
          Our quality assurance processes include regular inspections, audits,
          and evaluations to identify areas for improvement. We also encourage
          feedback from our customers and stakeholders to continuously enhance
          our quality standards.
        </p>
      </section>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default QualityAssurancePage;
