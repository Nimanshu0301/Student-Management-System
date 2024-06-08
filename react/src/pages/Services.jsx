import React, { Fragment } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import image1 from '../images/serviceImage1.jpg'
import image2 from '../images/serviceImage2.jpg'
import image3 from '../images/serviceImage3.png'
import Header from '../components/Header';


export default function Services() {
  const containerStyle = {
    textAlign: 'center',
    color: '#333',
  };

  const cardStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    margin: '20px auto',
    maxWidth: '800px',
  };

  const headerStyle = {
    color: '#2793FD',
  };

  const noBulletStyle = {
    listStyleType: 'none',
    paddingLeft: '0',
  };

  return (
    <Fragment>
      <Header/>
      <div style={containerStyle}>
        <br/>
        <br/>
        <h1>Our Services</h1>
        <br/>
          <div style={cardStyle}>
          <Carousel>
                <div>
                    <img src={image1} alt='Cybersecurity'/>
                    <p className="legend">Cybersecurity</p>
                </div>
                <div>
                    <img src={image2} alt='Data Science'/>
                    <p className="legend">Data Science</p>
                </div>
                <div>
                    <img src={image3} alt='Computer Science'/>
                    <p className="legend">Computer Science</p>
                </div>
          </Carousel>
          <h2 style={headerStyle}>Bachelor's Degree</h2>
          <ul style={noBulletStyle}>
            <li>Bachelor of Science in Computer Science</li>
            <li>Bachelor of Engineering in Computer Science</li>
          </ul>

          <h2 style={headerStyle}>Master's Degree</h2>
          <ul style={noBulletStyle}>
            <li>Master of Science in Computer Science</li>
            <li>Master of Engineering in Computer Science</li>
            <li>Master of Technology in Computer Science</li>
          </ul>

          <h2 style={headerStyle}>Specialized Courses</h2>
          <ul style={noBulletStyle}>
            <li>Machine Learning and Artificial Intelligence</li>
            <li>Software Engineering</li>
            <li>Data Science</li>
            <li>Cybersecurity</li>
            <li>Database Management</li>
          </ul>
          <br/>
        <br/>
        </div>
      </div>
      <br/>
        <br/>
    </Fragment>
  );
}
