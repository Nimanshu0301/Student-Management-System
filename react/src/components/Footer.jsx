import React from 'react'
import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function Footer() {
  return (
    <footer >
<div className="footer">
    <div className="container">
      <div className="col-md-6 footer-left">
        <ul>
        <li><CustomLink to="/" >Home</CustomLink></li>
        <li><CustomLink to="/About">About</CustomLink></li>
        <li><CustomLink to="/Contact" >Contact</CustomLink></li>
        <li><CustomLink to="/Services" >Services</CustomLink></li>
        <li><CustomLink to="/Login" >Login </CustomLink></li>
        <li><CustomLink to="/SignUp">SignUp </CustomLink></li>
        <li><CustomLink to="http://sxb4316.uta.cloud/" external>Blog</CustomLink></li>
        </ul>
      </div>
      <div className="col-md-3 footer-middle">
        <h3>Address</h3>
        <div className="address">
          <p>701 S Nedderman Dr, Arlington TX 76019
          </p>
        </div>
        <div className="phone">
          <p>7896541236</p>
        </div>
      </div>
      <div className="col-md-3 footer-right">
        <h3>SMS</h3>
        <p>A Student Management System is a comprehensive software solution designed to streamline and enhance the administration of educational institutions. It enables efficient management of student data, including enrollment, attendance, grades, and personal information.</p>
      </div>
      <div className="clearfix"> </div> 
    </div>
  </div>
<div className="copyright">
    <div className="container">
      <div className="copyright-left">
      <p>© 2023 Student Management System </p>
      </div>
      <div className="copyright-right">
        <ul>
          <li><a href="#" className="twitter"> </a></li>
          <li><a href="#" className="twitter facebook"> </a></li>
          <li><a href="#" className="twitter chrome"> </a></li>
          <li><a href="#" className="twitter pinterest"> </a></li>
          <li><a href="#" className="twitter linkedin"> </a></li>
          <li><a href="#" className="twitter dribbble"> </a></li>
        </ul>
      </div>
      <div className="clearfix"> </div>
      
    </div>

    </div>
</footer>
  )
}
function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
