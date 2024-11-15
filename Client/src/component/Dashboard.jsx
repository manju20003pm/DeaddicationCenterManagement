import React, { useState } from "react";
// import AddMenu from './AddMenu/AddMenu';
import "./Dashboard.scss";
import Location from "./Location/Location";
import Faculty from "./Faculty/Faculty";
import Camp from "./Camp/Camp";
import Retailer from "./Retailer/Retailer";
import Patient from "./Patient/Patient";
import Order from "./Order/Order";
import { useNavigate, Navigate, useLocation } from "react-router";
import { useEffect } from "react";
import Home from "./Home/Home";
import Loader from "./Loader/Loader";
import {
  ADD_PATIENT,
  GET_CAMP,
  GET_FACULTY,
  GET_LOCATIONS,
  GET_UNALLOCATED_PATIENTS,
} from "../utils/apiConstant";
import axios from "axios";

// import Orders from './Orders/Orders';

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [selected, setSelected] = useState("home");
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/admin") {
      setSelected("home");
    } else if (location.pathname == "/admin/location") {
      setSelected("location");
    } else if (location.pathname == "/admin/faculty") {
      setSelected("faculty");
    } else if (location.pathname == "/admin/camp") {
      setSelected("camp");
    } else if (location.pathname == "/admin/patient") {
      setSelected("patient");
    }
  }, [selected]);

  const [faculty, setFaculty] = useState([]);
  const [loc, setLoc] = useState([]);
  const [camp, setCamp] = useState([]);
  const [patient, setPatient] = useState([]);
  const [unallocatedPatients, setUnallocatedPatients] = useState([]);

  const auth = localStorage.getItem("auth");
  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  const getFaculty = async () => {
    await axios
      .get(GET_FACULTY, { headers: headers })
      .then((res) => {
        localStorage.setItem("faculty", res.data.users);
        setFaculty(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLocation = async () => {
    await axios
      .get(GET_LOCATIONS, { headers: headers })
      .then((res) => {
        console.log(res);
        setLoc(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCamp = async () => {
    await axios
      .get(GET_CAMP, { headers: headers })
      .then((res) => {
        console.log("Camps : ", res);
        setCamp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPatient = async () => {
    await axios
      .get(ADD_PATIENT, { headers: headers })
      .then((res) => {
        // console.log("Paient : ", res);
        localStorage.setItem("patientList", res.data.data);
        setPatient(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUnallocatedPatients = async () => {
    await axios
      .get(GET_UNALLOCATED_PATIENTS, { headers: headers })
      .then((res) => {
        console.log("Hello from getUnallocatedPatients");
        setUnallocatedPatients(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    setLoading(true);

    getFaculty();
    getCamp();
    getLocation();
    getPatient();
    getUnallocatedPatients();

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [trigger]);

  return (
    <div className="dashboard">
      {auth ? null : <Navigate replace to="login" />}
      <div className={menuOpen ? `sidebar` : "sidebar close"}>
        <ul className="nav-links">
          <li>
            <i
              className="bx bx-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            ></i>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              onClick={() => {
                setSelected("home");
                navigate("/admin/home");
              }}
            >
              <i className="bx bx-grid-alt"></i>
              <span className="link_name">Dashboard</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="/admin/home">
                  Dashboard
                </a>
              </li>
            </ul>
          </li>

          {/* <li>
            <a
              href="javascript:void(0)"
              onClick={() => {
                navigate("/admin/location");
                setSelected("location");
              }}
            >
              <i className="bx bx-pie-chart-alt-2"></i>
              <span className="link_name">Locations</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Locations
                </a>
              </li>
            </ul>
          </li> */}
          <li>
            <a
              href="javascript:void(0)"
              onClick={() => {
                navigate("/admin/faculty");
                setSelected("faculty");
              }}
            >
              <i className="bx bx-line-chart"></i>
              <span className="link_name">Counseller</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Faculty
                </a>
              </li>
            </ul>
          </li>

          <li>
            <a
              href="javascript:void(0)"
              onClick={() => {
                navigate("/admin/camp");
                setSelected("camp");
              }}
            >
              <i className="bx bx-compass"></i>
              <span className="link_name">Allocate Patients</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Camps
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="javascript:void(0)"
              onClick={() => {
                navigate("/admin/patient");
                setSelected("patient");
              }}
            >
              <i className="bx bx-history"></i>
              <span className="link_name">Patients</span>
            </a>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Patients History
                </a>
              </li>
            </ul>
          </li>

          <li>
            <div className="profile-details">
              <div className="profile-content">
                <i class="bi bi-person-fill"></i>
              </div>
              <div className="name-job">
                <div className="profile_name">Admin</div>
                <div className="job">Authorizer</div>
              </div>
              <i
                className="bx bx-log-out"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                  window.location.reload(false);
                }}
              ></i>
            </div>
          </li>
        </ul>
      </div>

      <section className="home-section">
        {loading ? <Loader /> : null}
        {selected === "home" ? (
          <Home
            setLoading={setLoading}
            locCount={loc.length}
            campCount={camp.length}
            patientCount={patient.length}
            facCount={faculty.length}
            patients={patient}
          />
        ) : null}

        {/* {selected === "location" ? (
          <Location
            setLoading={setLoading}
            location={loc}
            setTrigger={setTrigger}
          />
        ) : null} */}

        {selected === "faculty" ? (
          <Faculty
            setLoading={setLoading}
            faculty={faculty}
            setTrigger={setTrigger}
          />
        ) : null}
        {selected === "camp" ? (
          <Camp
            setLoading={setLoading}
            location={loc}
            unallocatedPatientsList={unallocatedPatients}
            faculty={faculty}
            setTrigger={setTrigger}
          />
        ) : null}
        {selected === "patient" ? (
          <Patient
            setLoading={setLoading}
            patient={patient}
            camp={camp}
            faculty={faculty}
            setTrigger={setTrigger}
          />
        ) : null}
      </section>
    </div>
  );
}

export default Dashboard;
