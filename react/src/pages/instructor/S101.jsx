import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InstructorSidebar from '../../components/InstructorSidebar';
import { BarChart } from '@mui/x-charts';

const S101 = () => {
  const { studentID } = useParams();
  const [studentResults, setStudentResults] = useState([]); // New state for student results
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState({ index: null, value: null });

  const fetchStudentData = async () => {
    try {
      // Fetch student results based on the student ID
      const response = await fetch(`https://nxb4401.uta.cloud/php/getResult.php?UserID=${studentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentResults(data); // Set student results in state
      } else {
        setError('Failed to fetch student results');
      }
    } catch (error) {
      setError('Error fetching student results');
      console.error('Error fetching student results:', error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleRadioChange = (index, value) => {
    setSelectedValue({ index, value });
  };

  const handleSubmission = async (index) => {
    const currentResult = studentResults[index];

    if (selectedValue.index !== index || selectedValue.value === null) {
      alert('Please select Passed (Yes/No) before submitting.');
      return;
    }

    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/updateMarks.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CourseID: currentResult.CourseID,
          UserID: studentID,
          InstructorResult: selectedValue.value === 'Yes' ? 'Pass' : 'Fail',
        }),
      });

      if (response.ok) {
        alert('Student Result submitted successfully');
        fetchStudentData(); // Reload table data
        setSelectedValue({ index: null, value: null }); // Reset selected value
      } else {
        setError('Failed to update InstructorResult');
      }
    } catch (error) {
      setError('Error updating InstructorResult');
      console.error('Error updating InstructorResult:', error);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <InstructorSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Student Progress Monitoring</h3>
            </div>
            <div className="d-flex flex-column align-items-center">
              {/* Bar Chart */}
              {studentResults && studentResults.length > 0 ? (
                <div style={{ margin: '20px 0' }}>
                  <h4>Course Marks Distribution</h4>
                  <BarChart
                    xAxis={[
                      {
                        id: 'courseIDs',
                        data: studentResults.map((result) => result.CourseID), // X-axis Course IDs
                        scaleType: 'band',
                      },
                    ]}
                    series={[
                      {
                        data: studentResults.map((result) => (result.Marks === null ? 0 : result.Marks)), // Y-axis Marks (handle null values)
                      },
                    ]}
                    width={500}
                    height={400}
                  />
                </div>
              ) : (
                <p>No data available for the bar chart.</p>
              )}
            </div>
            <h2 className="mt-5">Progress Summary</h2>
            {error && <div>{error}</div>}
            <div className="table-responsive">
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Course ID</th>
                    <th>Given</th>
                    <th>Passed</th>
                    <th>Marks Obtained</th>
                    <th>Submit</th>
                  </tr>
                </thead>
                <tbody>
                  {studentResults.map((course, index) => (
                    <tr key={course.CourseID}>
                      <td>{course.CourseID}</td>
                      <td>{course.Given}</td>
                        <td>
                            {course.Given === 'No' ? (
                              '-'
                            ) : course.Given === 'Yes' && course.InstructorResult === null ? (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <label style={{ marginRight: '10px' }}>
                                  <input
                                    type="radio"
                                    name={`passed-${index}`}
                                    value="Yes"
                                    onChange={() => handleRadioChange(index, 'Yes')}
                                  />
                                  Pass
                                </label>
                                <label>
                                  <input
                                    type="radio"
                                    name={`passed-${index}`}
                                    value="No"
                                    onChange={() => handleRadioChange(index, 'No')}
                                  />
                                  Fail
                                </label>
                              </div>
                            ) : course.InstructorResult === 'Pass' ? (
                              <span style={{ color: 'green' }}>✓</span>
                            ) : course.InstructorResult === 'Fail' ? (
                              <span style={{ color: 'red' }}>✕</span>
                            ) : (
                              '-'
                            )}
                          </td>
                      <td>{course.Given === 'No' && course.InstructorResult === null ? '-' : course.Marks}</td>
                      <td>
                        {course.Given === 'No' ? (
                          '-'
                        ) : course.InstructorResult === 'Pass' ? (
                          <button className="btn btn-primary" style={{ backgroundColor: 'grey' }} disabled>
                            Submit
                          </button>
                        ) : course.InstructorResult === 'Fail' ? (
                          <button className="btn btn-primary" style={{ backgroundColor: 'grey' }} disabled>
                            Submit
                          </button>
                        ) : (
                          <button className="btn btn-primary" onClick={() => handleSubmission(index)}>
                            Submit
                          </button>
                        )}
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
  );
};

export default S101;
