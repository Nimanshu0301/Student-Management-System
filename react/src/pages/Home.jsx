import React from 'react';
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import Header from '../components/Header';


export default function Home() {
  return (
    <div>
     <Header/>
      <div className="banner">
        <div className="container">
          <div className="slider">
            <div className="callbacks_container">
              <ul className="rslides" id="slider">
                <li>
                  <h3>Student Management System</h3>
                  <p>Registered Users can Login Here</p>
                  <div className="readmore">
                  <CustomLink to="/Login" >Login</CustomLink>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="welcome">
        <div className="container">
          <h2>Welcome!</h2>
          <p>
            A Student Management System is a comprehensive software solution designed to streamline and enhance the
            administration of educational institutions. It enables efficient management of student data, including
            enrollment, attendance, grades, and personal information.
          </p>
        </div>
      </div>

      <div className="testimonials">
        <div className="container">
          <div className="testimonial-nfo">
            <h3>Public Notices</h3>
            <div className="scrolling-text" style={{ height: '350px', overflowY: 'scroll' }}>
              <a href="" target="_blank" style={{ color: '#fff' }}>
              We are delighted to announce our immense pride in the Student Management System website developed and maintained by Us. This website provides an enhanced and streamlined experience for all our stakeholders
              </a>
              <hr />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
