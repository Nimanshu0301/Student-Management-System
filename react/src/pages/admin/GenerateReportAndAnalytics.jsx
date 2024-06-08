import React, { useState, useEffect } from 'react';
import { BarChart, PieChart } from '@mui/x-charts';
import AdminSidebar from '../../components/AdminSidebar';

const GenerateReportAndAnalytics = () => {
  const [divisionData, setDivisionData] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [passedStudents, setPassedStudents] = useState([]);

  useEffect(() => {
    fetch('https://nxb4401.uta.cloud/php/reports.php')
      .then((response) => response.json())
      .then((data) => {
        const userTypes = data.UserTypeCounts
          .filter((item) => item.UserType)
          .map(({ UserType, Count }) => ({ label: UserType, value: Number(Count) }));
        setDivisionData(userTypes);

        const subjectsPassed = data.PassedCounts;
        setSubjects(subjectsPassed.map((item) => item.CourseID));
        setPassedStudents(subjectsPassed.map((item) => Number(item.MarksCount)));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartContainerStyles = {
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'auto',
    maxWidth: '100%',
  };

  const chartStyles = {
    margin: '10px',
    overflow: 'auto',
    maxWidth: '100%',
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <AdminSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 style={{ color: '#007bff' }}>Generate Report & Analytics</h2>
            </div>

            <div style={chartContainerStyles}>
              {/* Pie Chart */}
              <div style={chartStyles}>
                <h4>Division of Number of Roles</h4>
                {divisionData && divisionData.length > 0 ? (
                  <PieChart series={[{ data: divisionData }]} width={620} height={320} />
                ) : (
                  <p>No data available for the pie chart.</p>
                )}
              </div>

              {/* Bar Chart */}
              <div style={chartStyles}>
                <h4>Number of Students Exam Given in Each Subject</h4>
                {subjects && subjects.length > 0 && passedStudents && passedStudents.length > 0 ? (
                  <BarChart
                    xAxis={[
                      {
                        id: 'barCategories',
                        data: subjects,
                        scaleType: 'band',
                      }
                    ]}
                    series={[
                      {
                        data: passedStudents,
                      }
                    ]}
                    width={500}
                    height={400}
                  />
                ) : (
                  <p>No data available for the bar chart.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportAndAnalytics;
