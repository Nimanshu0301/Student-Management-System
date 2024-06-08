import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import QAOSidebar from '../../components/QAOSidebar';

const ManageInstructors = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getinstructors.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setInstructors(data);
      }
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  };

  const handleDelete = async (ID) => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getinstructors.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: ID }),
      });

      if (response.ok) {
        fetchInstructors();
        console.log('Instructor deleted successfully');
      } else {
        console.error('Error deleting instructor');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <QAOSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h2 style={{ color: '#007bff' }}>Manage Instructors</h2>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Instructor User Id</th>
                    <th>Instructor Name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((instructor, index) => (
                    <tr key={instructor.ID}>
                      <td>{index + 1}</td>
                      <td>{instructor.ID}</td>
                      <td>{instructor.FirstName} {instructor.LastName}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(instructor.ID)}>
                          <FaTrash />
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
};

export default ManageInstructors;
