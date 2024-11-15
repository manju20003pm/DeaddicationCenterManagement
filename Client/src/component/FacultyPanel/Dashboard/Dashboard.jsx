import React, { useEffect, useState } from "react";
import "./Dashboard.scss";

import axios from "axios";

import { useNavigate } from "react-router";
import { GET_PATIENT_USER, GET_USER_CAMP } from "../../../utils/apiConstant";
import Loader from "../../Loader/Loader";

// import SoberPeriodPrediction from "../../../Pages/Faculty/PredictPatient/SoberPeriodPrediction";

function Dashboard() {
  const navigate = useNavigate();

  const auth = localStorage.getItem("facultyAuth");
  const [activeCamps, setActiveCamps] = useState([]);
  const [inactiveCamps, setInactiveCamps] = useState([]);

  // const [patients, setPatients] = useState();
  const [locationId, setLocationId] = useState();
  const [patientData, setPatients] = useState([]);

  const currentDate = new Date().toISOString();

  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  const getCamps = async () => {
    await axios
      .get(GET_USER_CAMP, { headers: headers })
      .then((res) => {
        setLocationId(res.data.data[0].locationId);
        console.log("CAMP : ", res.data.data[0].locationId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPatients = async () => {
    await axios
      .get(GET_PATIENT_USER, { headers: headers })
      .then((res) => {
        console.log(res);
        setPatients(res.data.data);
        localStorage.setItem("patients", JSON.stringify(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setPatient = (id) => {
    console.log(id);
    navigate(`/patientview/${id}`);
  };

  useEffect(() => {
    setLoading(true);
    getPatients();
    getCamps();

    setLoading(false);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const handleClearBtn = () => {
    setSearchQuery("");
  };

  const filteredPatients = patientData.filter((data) => {
    console.log(
      "data : ",
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return data.name.toLowerCase().includes(searchQuery.toLowerCase());
    // data.phone.includes(searchQuery) ||
    // data.patientId.includes(searchQuery)
    // Add more fields here as needed
  });

  // return (
  //   <div className="faculty-dashboard">
  //     <div className="header">
  //       <button
  //         onClick={() => {
  //           localStorage.clear();
  //           navigate("/login");
  //         }}
  //       >
  //         <i class="bi bi-box-arrow-left"></i>
  //       </button>
  //     </div>
  //     {loading ? <Loader /> : null}

  //     <div className="camps-list">
  //       <h6>Patients List</h6>
  //       {activeCamps
  //         ? activeCamps.map((data, key) => {
  //             console.log("hi");
  //             console.log("Key : ", key);
  //             return (
  //               <div className="camp">
  //                 <p>
  //                   {data.name} - (<span>{data.createdAt.split("T")[0]}</span>){" "}
  //                 </p>
  //                 <div className="controls">
  //                   <button
  //                     onClick={() => navigate(`/patientAdd/${data.faculty[0]}`)}
  //                   >
  //                     Add Patient
  //                   </button>
  //                   <button onClick={() => setPatient(data.faculty[0])}>
  //                     View Patients
  //                   </button>
  //                 </div>
  //               </div>
  //             );
  //           })
  //         : null}
  //     </div>

  //     {/* <div className="camps-list">
  //       <h6>Past Camp Data</h6>
  //       {inactiveCamps
  //         ? inactiveCamps.map((data, key) => {
  //             return (
  //               <div className="camp">
  //                 <p>
  //                   {data.name} - (<span>{data.createdAt.split("T")[0]}</span>){" "}
  //                 </p>
  //                 <div className="controls">
  //                   <button onClick={() => setPatient(data._id)}>
  //                     View Patients
  //                   </button>
  //                 </div>
  //               </div>
  //             );
  //           })
  //         : null}
  //     </div> */}

  //     {/* <div className="prediction-buttons">
  //       <h6>Prediction models</h6>
  //       <div class="controls">
  //         <button onClick={() => navigate(`/predictSoberPeriod`)}>
  //           Sober Period Prediction
  //         </button>
  //         <button>AAI Prediction</button>
  //         <button>Quality Of Lfe Prediction</button>
  //       </div>
  //     </div> */}
  //   </div>
  // );

  return (
    <div className="patientData">
      <div className="header">
        <i
          class="bi bi-arrow-left-square-fill"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        ></i>
      </div>
      <div className="patient-list">
        <div className="header">
          <h6>Patients List</h6>
          <div className="buttons1">
            <button onClick={() => navigate(`/patientAdd/${locationId}`)}>
              Add Patient
            </button>

            <div className="input-wrap1">
              <i className="fas fa-search"></i>

              <input
                onChange={handleSearchChange}
                value={searchQuery}
                type="text"
                name="product-search"
                id="product-search"
                placeholder="Search Patients"
              />
              <i onClick={handleClearBtn} className="fas fa-times"></i>
            </div>
          </div>
        </div>
      </div>
      {filteredPatients.length != 0 ? (
        <div className="patient-list">
          {/* <div className="header">
            <h6>Patients List</h6>
            <button onClick={() => navigate(`/patientAdd/${locationId}`)}>
              Add Patient
            </button>
          </div> */}
          {filteredPatients.map((data, key) => {
            return (
              <div className="patient">
                <p>
                  {data.name} - ({data.address}), {data.createdAt.split("T")[0]}{" "}
                </p>
                <div className="controls">
                  <button onClick={() => navigate(`/patient/${data._id}`)}>
                    <i class="bi bi-eye"></i>
                  </button>
                  <button onClick={() => navigate(`/patient/${data._id}`)}>
                    <i class="bi bi-pencil-square"></i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-patient">No Patients To Display</p>
      )}

      {/* <div className="prediction-buttons">
        <h6>Prediction models</h6>
        <div class="controls">
          <button onClick={() => navigate(`/predictSoberPeriod`)}>
            Sober Period Prediction
          </button>
          <button>AAI Prediction</button>
          <button>Quality Of Lfe Prediction</button>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
