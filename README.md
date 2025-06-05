
Element	Color	Hex	Usage
Background	White	#FFFFFF	For the main background
Primary/Accent Color	Chocolate Brown	#4E342E	For buttons, headers, highlights
Card Background	Light Brown (optional)	#EFE7E1	Soft contrast for cards
Text Color	Dark Brown	#3E2723	For headlines/text on white
Border Color	Soft Tan	#D7CCC8	Subtle card or section separators
 Typography:
Use a clean font like Poppins, Nunito, or Roboto.

// List of subjects being done

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminSideBar from "../adminsidebar";


const bApp='http://localhost:4000';
const ListofStudent=()=>{
             // State to toggle sidebar visibility
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [selectedClass,setSelectedClass]=useState("SS2");
  const [loading,setLoading]=useState(false);
  const [students,setStudents]=useState([])
  const [showModal,setShowModal]=useState(false)
  const [selectedStudent,setSelectedStudent]=useState(null)
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);


  const navigate=useNavigate()
  const handleSideBar = (e) => {
    e.preventDefault();
    setSidebarVisible(!sidebarVisible); // Toggle sidebar visibility
  };

      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        const handleClassChange=(e)=> setSelectedClass(e.target.value);


    const handleModal=(student)=>{
      setSelectedStudent(student);
      setShowModal(true)
    };

    const closeModal=()=> {
      setShowModal(false);
      setSelectedStudent(null);
    }

    const handleUpdateStudent = async (studentData) => {
  try {
    const response = await fetch(`${bApp}/api/update-student/${studentData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
      credentials: "include",
    });

    if (!response.ok) throw new Error("Update failed");

    const updated = await response.json();
    alert("Student updated successfully");
    setStudents((prev) =>
      prev.map((s) => (s.id === studentData.id ? studentData : s))
    );
    closeModal();
  } catch (err) {
    alert("Failed to update student");
    console.error(err);
  }
};


    const HandleStudentLoading=async(e)=>{
      e.preventDefault();
      setLoading(true)

      try {
        const response=await fetch(`${bApp}/api/get-student?classname=${selectedClass}`,{
          method:"GET",
          credentials:"include"
        })
        if(!response.ok) throw new Error("Failed to fetch students");

        const data=await response.json();
        console.log(data);
        setStudents(data.results)

        
      } catch (error) {
        alert(error.message)
        console.error("Error fetching students:",error)
      }finally{
        setLoading(false)
      }
    }

    const handleLogout = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${bApp}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // sends the cookie
      });
  
      if (response.ok) {
        alert("Logged out successfully");
        localStorage.removeItem("userInfo");
        navigate("/login");
      } else {
        const data = await response.json();
        alert(data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout");
    }
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
            <h3 className="m-0">Welcome {userInfo?.name}</h3>
             <p>{new Date().toDateString()}</p>

            </div>
            </div>
            <button 
            onClick={handleLogout}
            className="btn btn-outline-danger me-xl-5">Log out</button>
          </div>
          
                    {sidebarVisible && (
                <div className="d-block d-sm-none custom-brown p-3">
                  <ul className="nav flex-column text-center">
                    <li className="nav-item mb-2">
                      <Link to="/admin_dashboard" className="nav-link text-nav">Dashboard</Link>
                 </li>
                    <li className="nav-item mb-2">
                      <Link to="/profile" className="nav-link text-nav">Profile</Link>
                 </li>
                    <li className="nav-item mb-2">
                      <Link to="/results" className="nav-link text-nav">Result</Link>
                 </li>
                    <li className="nav-item mb-2">
                      <Link to="/fees" className="nav-link text-nav">Fee & Receipt</Link>
                 </li>
                  </ul>
                </div>
              )}


              
          <div className="container my-5">
  <h4 className="mb-4">Manage Students</h4>
  <div className="mb-3 text-end">
    <Link to="#" className="btn btn-primary">Add New Student</Link>
  </div>

      <div className="card-body">
 
      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Select Class</label>
          <select className="form-select" onChange={handleClassChange} value={selectedClass}>
            <option value="JSS1">JSS1</option>
            <option value="JSS2">JSS2</option>
            <option value="JSS3">JSS3</option>
            <option value='SS1'>SS1</option>
            <option value="SS2">SS2</option>
            <option value="SS3">SS3</option>
          </select>
        </div>


        <div className="col-md-4 d-flex align-items-end">
          <button type="submit" 
          onClick={HandleStudentLoading}
          disabled={loading}
          className="btn btn-primary w-100">
            {loading ? (
              <>
              <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
              >
              </span>
              Loading....
              </>
            ) : (
              "Load Students"
            )}
          </button>
        </div>
      </form>
    
      <table className="table table-striped table-hover">
    <thead className="table-dark text-center">
      <tr>
        <th>#</th>
        <th>Full Name</th>
        <th>Class</th>
        <th>ID Number</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {students.length === 0 ? (
        <tr>
          <td colSpan="6" className="text-center">No student found</td>
        </tr>
      ):(
        students.map((s,index)=>(
          <tr key={s.id}>
            <td>{index + 1}</td>
            <td>{s.name}</td>
            <td>{s.class}</td>
            <td>{s.identitynumber}</td>
            <td>
              <button  
              type="button"
              onClick={()=> handleModal(s)}
              className="btn btn-sm btn-info me-2" 
              >View
              </button>
          <button 
          className="btn btn-sm btn-warning me-2"
          onClick={()=> {
            setEditedStudent({...s});// clone student data into editable
            setIsEditMode(true);
            setShowModal(true)
          }}
          >Edit
          </button>
          <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
   {
    showModal && selectedStudent && (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Student Details</h5>
        <button type="button" className="btn-close" onClick={closeModal}></button>
      </div>
      <div className="modal-body">
        <p><strong>Name:</strong> {selectedStudent.name}</p>
        <p><strong>Gender:</strong> {selectedStudent.gender}</p>
        <p><strong>Class:</strong> {selectedStudent.class}</p>
        <p><strong>ID Number:</strong> {selectedStudent.identitynumber}</p>
        <p><strong>Outstanding:</strong> {selectedStudent.schoolfee - selectedStudent.previouslypaid}</p>
        <p><strong>Address:</strong> {selectedStudent.address}</p>
        <p><strong>Date of Birth:</strong> {selectedStudent.dateofbirth}</p>
        <p><strong>Contact:</strong> {selectedStudent.contact}</p>

      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
      </div>
    </div>
  </div>
</div>
    )
  } 
 
  {/* Edit modal */}
{showModal && (isEditMode && editedStudent ? (
  <div className="modal show d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Student</h5>
          <button type="button" className="btn-close" onClick={closeModal}></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-2">
              <label>Name</label>
              <input type="text" className="form-control" value={editedStudent.name} onChange={(e) => setEditedStudent({...editedStudent, name: e.target.value})} />
            </div>
            <div className="mb-2">
              <label>Gender</label>
              <select className="form-control" value={editedStudent.gender} onChange={(e) => setEditedStudent({...editedStudent, gender: e.target.value})}>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="mb-2">
              <label>Class</label>
              <input type="text" className="form-control" value={editedStudent.class} onChange={(e) => setEditedStudent({...editedStudent, class: e.target.value})} />
            </div>
            <div className="mb-2">
              <label>ID Number</label>
              <input type="text" className="form-control" value={editedStudent.identitynumber} onChange={(e) => setEditedStudent({...editedStudent, identitynumber: e.target.value})} />
            </div>
            <div className="mb-2">
              <label>Address</label>
              <input type="text" className="form-control" value={editedStudent.address} onChange={(e) => setEditedStudent({...editedStudent, address: e.target.value})} />
            </div>
            <div className="mb-2">
              <label>Date of Birth</label>
              <input type="date" className="form-control" value={editedStudent.dateofbirth} onChange={(e) => setEditedStudent({...editedStudent, dateofbirth: e.target.value})} />
            </div>
            <div className="mb-2">
              <label>Contact</label>
              <input type="text" className="form-control" value={editedStudent.contact} onChange={(e) => setEditedStudent({...editedStudent, contact: e.target.value})} />
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeModal}>Close</button>
           <button type="button" className="btn btn-primary" onClick={() => handleEditSave(editedStudent)}>Save Changes</button>
        </div>
      </div>
    </div>
  </div>
) : (
  selectedStudent && (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Student Details</h5>
            <button type="button" className="btn-close" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Gender:</strong> {selectedStudent.gender}</p>
            <p><strong>Class:</strong> {selectedStudent.class}</p>
            <p><strong>ID Number:</strong> {selectedStudent.identitynumber}</p>
            <p><strong>Outstanding:</strong> {selectedStudent.schoolfee - selectedStudent.previouslypaid}</p>
            <p><strong>Address:</strong> {selectedStudent.address}</p>
            <p><strong>Date of Birth:</strong> {selectedStudent.dateofbirth}</p>
            <p><strong>Contact:</strong> {selectedStudent.contact}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
))}

 {showModal && <div className="modal-backdrop fade show"></div>}


    </div>




</div>
        </div>
      </div>
    </>
  );
}

export default ListofStudent;# depeaceacademy
# depeaceacademy
