import { useState } from "react";
import AdminSideBar from "../adminsidebar";
import { Link } from "react-router-dom";


const Subjects=()=>{
             // State to toggle sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const handleSideBar = (e) => {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

  return (
    <>
      <div className="d-flex topdiv vh-100">
        {/* TeacherSidebar - Toggled visibility */}
        {sidebarVisible && <AdminSideBar />}

        <div className="flex-grow-1">
          {/* Top Bar */}
          <div className="custom-topbar d-flex justify-content-between align-items-center py-2 px-3 shadow-sm">
          <div className="d-flex ">
              <button className="btn ms-3 me-3 click-custom" onClick={handleSideBar}>
                {sidebarVisible ? (
                  <i className="fa fa-times" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-bars" aria-hidden="true"></i>
                )}
              </button>
              <div className="d-flex flex-column ">
            <h3 className="m-0">Welcome John Doe Mushin</h3>
            <p>Tue April 16 2025</p>

            </div>
            </div>
            <button className="btn btn-outline-danger me-xl-5">Log out</button>
          </div>

          
               {sidebarVisible && (
            <div className="d-block d-sm-none custom-brown p-3">
              <ul className="nav flex-column text-center">
                <li className="nav-item mb-2">
                  <Link to="/admin_dashboard" className="nav-link text-nav">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/admin/users" className="nav-link text-nav">
                    View Students
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/admin/teachers" className="nav-link text-nav">
                    View Teachers
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/admin/academics/pendingresults" className="nav-link text-nav">
                    View Uploaded Results
                  </Link>
                </li>
                <li className="nav-item mb-2">
                  <Link to="/admin/academics/receipts" className="nav-link text-nav">
                    Payment History
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div className="container my-5">
  <div className="mb-3 text-end bg-shadow ">
  {/* <h4 className="mb-4">Subjects Offered</h4> */}
    <Link to="#" className="btn btn-primary">Add New Subject</Link>
  </div>
  <table className="table table-hover table-striped">
    <thead className="table-dark text-center">
      <tr>
        <th>#</th>
        <th>Subject Name</th>
        <th>Code</th>
        <th>Assigned Teacher</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody className="text-center">
      <tr>
        <td>1</td>
        <td>English Language</td>
        <td>ENG101</td>
        <td>Mr. Adewale</td>
        <td>
          <Link to="#" className="btn btn-sm btn-warning">Edit</Link>
          <Link to="#" className="btn btn-sm btn-danger">Delete</Link>
        </td>
      </tr>
      {/* <!-- more subjects --> */}
    </tbody>
  </table>
</div>



        </div>
      </div>
    </>
  );
}
export default Subjects