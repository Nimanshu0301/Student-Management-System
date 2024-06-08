import React, { useState, useEffect } from 'react';
import QAOSidebar from '../../components/QAOSidebar';
import { Link } from 'react-router-dom';

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '8px 16px',
  border: 'none',
  cursor: 'pointer',
};

const tableCellStyle = {
  padding: '10px',
  border: '1px solid #000',
  listStyleType: 'none',
};

const QAOStudentsAssessment = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getstudents.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleGradeClick = (studentID) => {
    // Perform any additional actions needed before navigation
    console.log("Grade button clicked for student ID: ", studentID);
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <QAOSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Assessment Creation and Grading</h3>
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
                Click Button to grade students
              </h1>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Sr. No</th>
                      <th>Student ID</th>
                      <th>Student Name</th>
                      <th>Student Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.ID}>
                        <td style={tableCellStyle}>{index + 1}</td>
                        <td style={tableCellStyle}>{student.ID}</td>
                        <td style={tableCellStyle}>
                          {student.FirstName} {student.LastName}
                        </td>
                        <td style={tableCellStyle}>
                          <Link
                            to={`/QAOS101/${student.ID}`}
                            onClick={() => handleGradeClick(student.ID)} // Handle additional actions
                          >
                            <button style={buttonStyle}>Grade</button>
                          </Link>
                        </td>
                      </tr>
                    ))}
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

export default QAOStudentsAssessment;
