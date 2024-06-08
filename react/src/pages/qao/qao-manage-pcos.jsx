import React, { useState, useEffect } from 'react';
import { FaTrash } from "react-icons/fa";
import QAOSidebar from '../../components/QAOSidebar';

const ManagePCOs = () => {
  const [pcos, setPCOs] = useState([]);

  useEffect(() => {
    fetchPCOs();
  }, []);

  const fetchPCOs = async () => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getpcos.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPCOs(data);
      }
    } catch (error) {
      console.error('Error fetching pcos:', error);
    }
  };

  const handleDelete = async (ID) => {
    try {
      const response = await fetch('https://nxb4401.uta.cloud/php/getpcos.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ID: ID }),
      });

      if (response.ok) {
        fetchPCOs();
        console.log('Instructor deleted successfully');
      } else {
        console.error('Error deleting pco');
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
              <h2 style={{ color: '#007bff' }}>Manage Program Coordinators</h2>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>Program Coordinator User Id</th>
                    <th>Program Coordinator Name</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {pcos.map((pco, index) => (
                    <tr key={pco.ID}>
                      <td>{index + 1}</td>
                      <td>{pco.ID}</td>
                      <td>{pco.FirstName} {pco.LastName}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(pco.ID)}>
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

export default ManagePCOs;
