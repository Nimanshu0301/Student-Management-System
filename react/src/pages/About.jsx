import React, { Fragment } from 'react';
import imageBanner from '../images/abt.jpg'
import Header from '../components/Header';

const About = () => {
  const containerStyle = {
    textAlign: 'start',
  };

  const fontColorStyle = {
    color: '#7b8898',
    face: 'Mercury SSm A, Mercury SSm B, Georgia, Times, Times New Roman, Microsoft YaHei New, Microsoft Yahei, ????, ??, SimSun, STXihei, ????, serif',
  };

  const spanStyle = {
    fontSize: '24px',
  };

  return (
    <Fragment>
      <Header/>
      <div className="banner banner5">
        <div className="container">
          <h2>About</h2>
        </div>
      </div>

      <div className="about">
        <div className="container">
          <div className="about-info-grids">
            <div className="col-md-5 abt-pic">
              <img src={imageBanner} className="img-responsive" alt="" />
            </div>
            <div className="col-md-7 abt-info-pic" style={containerStyle}>
              <p>
                <div style={containerStyle}>
                  <font style={fontColorStyle}>
                    <span style={spanStyle}>
                      A Student Management System is a comprehensive software solution designed to streamline and enhance the administration of educational institutions. It enables efficient management of student data, including enrollment, attendance, grades, and personal information. This system simplifies the communication between students, teachers, and administrators, facilitating better academic and administrative processes. It helps educational institutions maintain accurate records, track student progress, and improve overall efficiency in managing student-related tasks.
                    </span>
                  </font>
              </div>
              </p>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
