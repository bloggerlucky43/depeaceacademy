import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="container">
      <div className="row ">
        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 ">
          <div className="card custom-card mb-3">
            <img
              className="card-img-top w-50 mt-5 align-self-center"
              src="/student_12935609.png"
              alt="Card image cap"
            />
            <div className="card-body">
              <Link to="/student/profile" className="btn btn-primary">
                Profile
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
          <div className="card custom-card mb-3">
            <img
              className="card-img-top w-50 align-self-center mt-5"
              src="/3d-report_10473656.png"
              alt="Card image cap"
            />
            <div className="card-body">
              <Link to="/student/results" className="btn btn-primary">
                Check Result
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
          <div className="card custom-card mb-3">
            <img
              className="card-img-top w-50 align-self-center mt-5"
              src="/bills_3153501.png"
              alt="Card image cap"
            />
            <div className="card-body">
              <Link to="/student/receipt" className="btn btn-primary">
                View Receipt
              </Link>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
          <div className="card custom-card mb-3">
            <img
              className="card-img-top w-50 mt-5 align-self-center"
              src="/money-clip_13975015.png"
              alt="Card image cap"
            />
            <div className="card-body">
              <Link to="/student/payment" className="btn btn-primary">
                Pay School Fees
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
