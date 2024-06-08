import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import AdminSidebar from '../../components/AdminSidebar';

const ManageQAOs = () => {
  const [qaos, setQAOs] = useState([]);

  useEffect(() => {
    fetchQAOs();
  }, []);

  const fetchQAOs = async () => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getqaos.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setQAOs(data);
      }
    } catch (error) {
      console.error('Error fetching qaos:', error);
    }
  };

  const handleDelete = async (ID) => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getqaos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: ID }),
      });

      if (response.ok) {
        fetchQAOs();
        console.log('Instructor deleted successfully');
      } else {
        console.error('Error deleting qao');
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
              <h2 style={{ color: '#007bff' }}>Manage QAOs</h2>
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
                  {qaos.map((qao, index) => (
                    <tr key={qao.ID}>
                      <td>{index + 1}</td>
                      <td>{qao.ID}</td>
                      <td>{qao.FirstName} {qao.LastName}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(qao.ID)}>
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

export default ManageQAOs;
