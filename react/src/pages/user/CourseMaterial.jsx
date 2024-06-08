import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../components/StudentSidebar';

export default function CourseMaterial() {
  const [catalogData, setCatalogData] = useState([]);
  
  useEffect(() => {
    fetch('https://nxb4401.uta.cloud/php/coursecontent.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.CourseCatalog)) {
          setCatalogData(data.CourseCatalog); // Set the fetched data to state
        } else {
          console.error('Data received is not in the expected format');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const tableCellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  };

  const viewLinkStyle = {
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  const openPdf = (pdfLink) => {
    window.open(pdfLink, '_blank');
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <StudentSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Course Material</h3>
            </div>

            <div className="course-material">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Course Name</th>
                      <th>Course ID</th>
                      <th>Access Material</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogData.length > 0 ? ( // Check if catalogData is not empty
                      catalogData.map((course, index) => (
                        <tr key={index}>
                          <td style={tableCellStyle}>{course.ClassName}</td>
                          <td style={tableCellStyle}>{course.CourseID}</td>
                          <td style={tableCellStyle}>
                            <span
                              style={viewLinkStyle}
                              onClick={() => openPdf(course.Content)}
                            >
                              View
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3">No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
