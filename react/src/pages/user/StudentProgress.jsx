import React, { useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts'; // Import the BarChart component
import StudentSidebar from '../../components/StudentSidebar';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const StudentProgress = () => {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourseData = async () => {
    const userID = sessionStorage.getItem('UserID');

    try {
      const response = await fetch(`https://nxb4401.uta.cloud/php/getResult.php?UserID=${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setCourseData(data);
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      setError('Error fetching Course Data');
      console.error('Error fetching Course Data:', error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);


  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <StudentSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Student Progress</h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <CustomLink to="/StudentProfile">Profile</CustomLink>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Student Progress
                  </li>
                </ol>
              </nav>
            </div>

            <h2 className="mt-5">Progress Summary</h2>
            {error && <div>{error}</div>}
            <div className="table-responsive">
              {/* Bar Chart */}
              {courseData && courseData.length > 0 ? (
                <div style={{ margin: '20px 0' }}>
                  <h4>Course Marks Distribution</h4>
                  <BarChart
                    xAxis={[
                      {
                        id: 'courseIDs',
                        data: courseData.map(course => course.CourseID), // X-axis Course IDs
                        scaleType: 'band',
                      }
                    ]}
                    series={[
                      {
                        data: courseData.map(course => course.Marks === null ? 0 : course.Marks), // Y-axis Marks (handle null values)
                      }
                    ]}
                    width={500}
                    height={400}
                  />
                </div>
              ) : (
                <p>No data available for the bar chart.</p>
              )}

              {/* Table */}
              <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Course ID</th>
                    <th>Given</th>
                    <th>Instructor Result</th>
                    <th>QAO Result</th>
                    <th>Marks Value</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5">Loading...</td>
                    </tr>
                  ) : (
                    courseData.map((course, index) => (
                      <tr key={index}>
                        <td>{course.CourseID}</td>
                        <td>
                          {course.Given === 'Yes' ? (
                            <span style={{ color: 'green', fontSize: '1.2rem' }}>&#10004;</span>
                          ) : (
                            <span style={{ color: 'red', fontSize: '1.2rem' }}>&#10008;</span>
                          )}
                        </td>
                        <td>
                          {course.InstructorResult === null ? '-' :
                            (course.InstructorResult === 'Pass' ? (
                              <span style={{ color: 'green', fontSize: '1.2rem' }}>&#10004;</span>
                            ) : (
                              <span style={{ color: 'red', fontSize: '1.2rem' }}>&#10008;</span>
                            ))}
                        </td>
                        <td>
                          {course.QAOResult === null ? '-' :
                            (course.QAOResult === 'Pass' ? (
                              <span style={{ color: 'green', fontSize: '1.2rem' }}>&#10004;</span>
                            ) : (
                              <span style={{ color: 'red', fontSize: '1.2rem' }}>&#10008;</span>
                            ))}
                        </td>
                        <td>{course.Marks ? course.Marks : 'N/A'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}

export default StudentProgress;
