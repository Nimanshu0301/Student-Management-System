import React, { useState, useEffect } from 'react';
import StudentSidebar from '../../components/StudentSidebar';


const GiveExam = () => {
  const [catalogData, setCatalogData] = useState([]);
  const [hasTakenExams, setHasTakenExams] = useState({});

  useEffect(() => {
    fetch('https://nxb4401.uta.cloud/php/coursecontent.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.CourseCatalog && Array.isArray(data.CourseCatalog)) {
          setCatalogData(data.CourseCatalog);
          checkExams(data.CourseCatalog);
        } else {
          console.error('Invalid data format');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);;

  const checkExams = (courseCatalog) => {
    const userId = sessionStorage.getItem('UserID');
    
    if (userId) {
      courseCatalog.forEach((course) => {
        fetch(`https://nxb4401.uta.cloud/php/checkUserExam.php?CourseID=${course.CourseID}&UserID=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((examData) => {
            setHasTakenExams((prev) => ({
              ...prev,
              [course.CourseID]: examData.examExists,
            }));
          })
          .catch((error) => {
            console.error('Error checking exams:', error);
          });
      });
    } else {
      console.error('User ID not available');
    }
  };
  
  const handleMonitoring = (courseId) => {
    sessionStorage.setItem('CourseID', courseId.toString());
    window.location.href = '/CS101';
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <StudentSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Exam and Assessment Portal</h3>
            </div>
            <div style={{ margin: '20px' }}>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  color: '#333',
                }}
              >
                Choose a Subject to Give Exam
              </h1>
              <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Course ID</th>
              <th>Subject Name</th>
              <th>Exam</th>
            </tr>
          </thead>
          <tbody>
             {Array.isArray(catalogData) && catalogData.length > 0 ? (
              catalogData.map((course, index) => (
                <tr key={index}>
                  <td>{course.CourseID}</td>
                  <td>{course.ClassName}</td>
                  <td>
                  <button
                    style={{
                      backgroundColor: hasTakenExams[course.CourseID] ? 'green' : '#007bff',
                      color: 'white',
                      padding: '8px 16px',
                      border: 'none',
                      cursor: hasTakenExams[course.CourseID] ? 'not-allowed' : 'pointer',
                    }}
                    onClick={() => handleMonitoring(course.CourseID)}
                    disabled={hasTakenExams[course.CourseID]}
                  >
                    {hasTakenExams[course.CourseID] ? 'Submitted' : 'Start'}
                  </button>
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
};

export default GiveExam;
