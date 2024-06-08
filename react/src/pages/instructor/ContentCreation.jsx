import React, { useState, useEffect } from 'react';
import InstructorSidebar from '../../components/InstructorSidebar';

export default function ContentCreation() {
  const [catalogData, setCatalogData] = useState([]);
  
  useEffect(() => {
    // Fetch data from the API
    fetch('https://nxb4401.uta.cloud/php/coursecontent.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCatalogData(data.CourseCatalog); // Set the fetched data to state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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

  const responsiveTableWrapper = {
    overflowX: 'auto',
  };

  const inputStyle = {
    width: '100%', // Set the width of the input to 100% of its container
  };

  const handleInputChange = (e, rowIndex, field) => {
    const updatedCatalog = [...catalogData];
    updatedCatalog[rowIndex][field] = e.target.value;
    setCatalogData(updatedCatalog);
  };

  const handleSubmit = (rowIndex) => {
    const { CourseID, contentLink } = catalogData[rowIndex];
    console.log('CourseID:', CourseID); // Log CourseID to check its value
    console.log('contentLink:', contentLink);
  
    fetch('https://nxb4401.uta.cloud/php/coursecontent.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ CourseId: CourseID, Content: contentLink }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data); // Handle the successful response from the POST request
      })
      .catch((error) => {
        console.error('Error updating content:', error);
        // Log the response to see what's being returned
        
      });
  }; 
  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <InstructorSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title">Course Catalog</h3>
            </div>

            <div className="course-catalog" style={responsiveTableWrapper}>
              <table style={tableStyle}>
                <thead>
                  <tr style={tableHeaderStyle}>
                    <th style={tableCellStyle}>Course ID</th>
                    <th style={tableCellStyle}>Course Name</th>
                    <th style={tableCellStyle}>Content Link</th>
                    <th style={tableCellStyle}>Submit</th>
                  </tr>
                </thead>
                <tbody>
                  {catalogData.map((course, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{course.CourseID}</td>
                      <td style={tableCellStyle}>{course.ClassName}</td>
                      <td style={tableCellStyle}>
                        <input
                                type="text"
                                defaultValue={course.Content}
                                onBlur={(e) => handleInputChange(e, index, 'contentLink')}
                                style={inputStyle}
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
        </div>
      </div>
    </div>
  );
}
