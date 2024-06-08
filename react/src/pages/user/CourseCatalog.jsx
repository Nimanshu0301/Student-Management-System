import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../components/StudentSidebar';

export default function CourseCatalog() {
  const [catalogData, setCatalogData] = useState([
  ]);

  useEffect(() => {
    // Fetch initial data when the component mounts
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/managecourse.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const cleanedData = data.map(course => {
          return {
            ...course,
            CourseID: course.CourseID ? course.CourseID.trim() : ''
            
          };
          
        });
        setCatalogData(cleanedData); 
        console.log(cleanedData);

      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
  };

  const tableHeaderStyle = {
    backgroundColor: '#333',
    color: '#fff',
  };

  const tableCellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  };

  const responsiveTableWrapper = {
    overflowX: 'auto',
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <StudentSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Course Catalog</h3>
            </div>

            <div className="course-catalog" style={responsiveTableWrapper}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderStyle}>
                    <th style={tableCellStyle}>Subject Name</th>
                    <th style={tableCellStyle}>Elective/Core</th>
                    <th style={tableCellStyle}>Course ID</th>
                    <th style={tableCellStyle}>Timing</th>
                    <th style={tableCellStyle}>Credits</th>
                    <th style={tableCellStyle}>Instructor Name</th>
                  </tr>
                </thead>
                <tbody>
                  {catalogData.map((course, index) => (
                    <tr key={index} style={{ backgroundColor: course.color }}>
                      <td style={tableCellStyle}>{course.ClassName}</td>
                      <td style={tableCellStyle}>{course.CourseType}</td>
                      <td style={tableCellStyle}>{course.CourseID ? course.CourseID.trim() : ''}</td>
                      <td style={tableCellStyle}>{course.Timings}</td>
                      <td style={tableCellStyle}>{course.Credits}</td>
                      <td style={tableCellStyle}>{course.Instructor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
