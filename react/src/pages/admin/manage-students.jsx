import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import AdminSidebar from '../../components/AdminSidebar';

const ManageStudents = () => {
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

  const handleDelete = async (ID) => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getstudents.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: ID }),
      });

      if (response.ok) {
        fetchStudents();
        console.log('Student deleted successfully');
      } else {
        console.error('Error deleting student');
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
              <h2 style={{ color: '#007bff' }}>Manage Users</h2>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Student User Id</th>
                    <th>Student Name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.ID}>
                      <td>{index + 1}</td>
                      <td>{student.ID}</td>
                      <td>{student.FirstName} {student.LastName}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(student.ID)}>
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

export default ManageStudents;
