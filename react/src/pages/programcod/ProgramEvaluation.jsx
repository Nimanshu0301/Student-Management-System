import React, { useState, useEffect } from 'react';
import PCODSidebar from '../../components/PCODSidebar';

export default function ProgramEvaluation() {
  const [catalogData, setCatalogData] = useState([]);

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/pgeval.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCatalogData(data); // Update state with fetched data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleApprovalChange = (index) => {
    const updatedCatalogData = [...catalogData];
    updatedCatalogData[index].Approved = updatedCatalogData[index].Approved === '1' ? '0' : '1';
    setCatalogData(updatedCatalogData);
  };

  const handleSubmit = async (index) => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/pgeval.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(catalogData[index]),
      });

      if (response.ok) {
        console.log('Data updated successfully');
        fetchCourseData(); // Refresh data after successful submission
      } else {
        console.error('Error updating data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 20,
  };

  const openPdf = (pdfLink) => {
    window.open(pdfLink, '_blank');
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <PCODSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Program Evaluation</h3>
            </div>

            <div className="course-material">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>Course Name</th>
                      <th>Course ID</th>
                      <th>Access Material</th>
                      <th>Approval</th>
                      <th>Submit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catalogData.map((course, index) => (
                      <tr key={index}>
                        <td style={tableCellStyle}>{course.ClassName}</td>
                        <td style={tableCellStyle}>{course.CourseID}</td>
                        <td style={tableCellStyle}>
                          <span style={viewLinkStyle} onClick={() => openPdf(course.Content)}>
                            View
                          </span>
                        </td>
                        <td style={tableCellStyle}>
                          <input
                            type="checkbox"
                            checked={course.Approved === '1'}
                            onChange={() => handleApprovalChange(index)}
                          />
                        </td>
                        <td style={tableCellStyle}>
                          <button onClick={() => handleSubmit(index)} style={buttonStyle}>
                            Submit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <br /><br />
          </div>
        </div>
      </div>
    </div>
  );
}
