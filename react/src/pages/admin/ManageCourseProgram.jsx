import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function ManageCourseProgram() {

  const generateRandomCourseID = () => {
    // Generate a random string as CourseID
    const randomString = Math.random().toString(36).substring(2, 10);
    return `CS_${randomString}`;
  };

  const handleAddCourse = () => {
    // Create a new row with default values or empty strings
    const newCourse = {
      CourseID: generateRandomCourseID(), // You may want to generate a unique ID
      ClassName: '',
      CourseType: '',
      Timings: '',
      Credits: '',
      Instructor: '',
    };

    // Add the new row to the catalog data
    setCatalogData((prevData) => [...prevData, newCourse]);
  };

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
        setCatalogData(data); // Update state with fetched data
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

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    marginBottom: 20,
  };

  const dropdownOptions = ['Selective', 'Core'];

  const responsiveTableWrapper = {
    overflowX: 'auto',
  };

  const handleInputChange = (e, rowIndex, field) => {
    const updatedCatalog = [...catalogData];
    updatedCatalog[rowIndex][field] = e.target.value;
    setCatalogData(updatedCatalog);
  };

  const handleSubmit = async (row) => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/managecourse.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(row), // Sending the specific row data for update
      });
  
      if (response.ok) {
        // Successfully updated data
        console.log('Data updated successfully');
      } else {
        // Handle error scenarios
        console.error('Error updating data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <AdminSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Manage Course and Program</h3>
            </div>

            <div className="course-catalog" style={responsiveTableWrapper}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderStyle}>
                    <th style={tableCellStyle}>Course ID</th>
                    <th style={tableCellStyle}>Subject Name</th>
                    <th style={tableCellStyle}>Elective/Core</th>
                    <th style={tableCellStyle}>Timing</th>
                    <th style={tableCellStyle}>Credits</th>
                    <th style={tableCellStyle}>Instructor Name</th>
                    <th style={tableCellStyle}>Edit</th>
                  </tr>
                </thead>
                <tbody>
                {catalogData.map((course, index) => (
                   <tr key={index}>
                      <td style={tableCellStyle}>{course.CourseID}</td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          value={course.ClassName}
                          onChange={(e) => handleInputChange(e, index, 'ClassName')}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <select
                          value={course.CourseType}
                          onChange={(e) => handleInputChange(e, index, 'CourseType')}
                        >
                          {dropdownOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          value={course.Timings}
                          onChange={(e) => handleInputChange(e, index, 'Timings')}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          value={course.Credits}
                          onChange={(e) => handleInputChange(e, index, 'Credits')}
                        />
                      </td>
                      <td style={tableCellStyle}>
                        <input
                          type="text"
                          value={course.Instructor}
                          onChange={(e) => handleInputChange(e, index, 'Instructor')}
                        />
                      </td>
                      <td style={tableCellStyle}>
                      <button onClick={() => handleSubmit(course)} style={buttonStyle}>
                        Submit
                      </button>
                      </td>
                     </tr>
                      ))}
                </tbody>
              </table>
              <button onClick={handleAddCourse} style={buttonStyle}>
          Add Course
        </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
