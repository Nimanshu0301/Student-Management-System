import React from 'react';
import StudentSidebar from '../../components/StudentSidebar';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function StudentOverview() {
  const sectionStyle = {
    backgroundColor: '#f7f7f7',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '20px',
  };

  const tableStyle = {
    width: '100%',
  };

  const tableHeaderStyle = {
    backgroundColor: '#333',
    color: '#fff',
  };

  const tableCellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper">
        <StudentSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title" style={{ color: '#007bff' }}>
                Academic Program Overview
              </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <CustomLink to="/StudentProfile">Profile</CustomLink>
                  </li>
                  <li
                    className="breadcrumb-item active"
                    aria-current="page"
                    style={{ color: '#333' }}
                  >
                    Academic Program Overview
                  </li>
                </ol>
              </nav>
            </div>

            <div className="student-overview p-4" style={sectionStyle}>
              <h1 className="text-lg">Bachelor's in Computer Science Engineering</h1>

              <section style={sectionStyle}>
                <h2 className="text-lg">Program Overview</h2>
                <p>
                  The Bachelor's in Computer Science Engineering is a comprehensive program that equips students with the knowledge and skills required to excel in the field of computer science and engineering.
                </p>
              </section>

              <section style={sectionStyle}>
                <h2 className="text-lg">Program Subjects</h2>
                <div className="table-responsive">
                  <table style={tableStyle}>
                    <thead style={tableHeaderStyle}>
                      <tr>
                        <th style={tableCellStyle}>Subject</th>
                        <th style={tableCellStyle}>Total Marks</th>
                        <th style={tableCellStyle}>Passing Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tableCellStyle}>Introduction to Computer Science</td>
                        <td style={tableCellStyle}>100</td>
                        <td style={tableCellStyle}>45%</td>
                      </tr>
                      <tr>
                        <td style={tableCellStyle}>Data Structures and Algorithms</td>
                        <td style={tableCellStyle}>150</td>
                        <td style={tableCellStyle}>55%</td>
                      </tr>
                      <tr>
                        <td style={tableCellStyle}>Software Engineering</td>
                        <td style={tableCellStyle}>120</td>
                        <td style={tableCellStyle}>50%</td>
                      </tr>
                      {/* Add more subjects */}
                    </tbody>
                  </table>
                </div>
              </section>

              <section style={sectionStyle}>
                <h2 className="text-lg">Written Exams</h2>
                <div className="table-responsive">
                  <table style={tableStyle}>
                    <thead style={tableHeaderStyle}>
                      <tr>
                        <th style={tableCellStyle}>Exams</th>
                        <th style={tableCellStyle}>Total Marks</th>
                        <th style={tableCellStyle}>Passing Marks</th>
                        <th style={tableCellStyle}>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={tableCellStyle}>Computer Networks</td>
                        <td style={tableCellStyle}>100</td>
                        <td style={tableCellStyle}>40</td>
                        <td style={tableCellStyle}>November 10, 2023</td>
                      </tr>
                      <tr>
                        <td style={tableCellStyle}>Artificial Intelligence</td>
                        <td style={tableCellStyle}>120</td>
                        <td style={tableCellStyle}>50</td>
                        <td style={tableCellStyle}>December 5, 2023</td>
                      </tr>
                      <tr>
                        <td style={tableCellStyle}>Web Development</td>
                        <td style={tableCellStyle}>50</td>
                        <td style={tableCellStyle}>25</td>
                        <td style={tableCellStyle}>July 15, 2023</td>
                      </tr>
                      <tr>
                        <td style={tableCellStyle}>Database Management</td>
                        <td style={tableCellStyle}>60</td>
                        <td style={tableCellStyle}>30</td>
                        <td style={tableCellStyle}>August 20, 2023</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section style={sectionStyle}>
                <h2 className="text-lg">Learning Outcomes</h2>
                <p>
                  Upon completing this course, students will gain a deep understanding of computer science and engineering principles, including problem-solving, programming, software development, and more. They will be well-prepared for a successful career in the field.
                </p>
              </section>

              <section style={sectionStyle}>
                <h2 className="text-lg">Achievements</h2>
                <p>
                  Graduates of this program will receive a Bachelor's degree in Computer Science Engineering and will be equipped with the knowledge and skills to pursue careers in software development, system analysis, data science, and other related fields.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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