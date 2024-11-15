import React, { useState, useEffect } from "react";
import "./Home.scss";
import { BarChart } from "@mui/x-charts";

import { ADD_PATIENT } from "../../utils/apiConstant";
import axios from "axios";

function Home({ locCount, facCount, campCount, patientCount }) {
  const ageBinList = [
    "18-25",
    "26-32",
    "33-39",
    "40-46",
    "47-53",
    "54-60",
    ">60",
  ];
  let ageBin = {
    "18-25": 0,
    "26-32": 0,
    "33-39": 0,
    "40-46": 0,
    "47-53": 0,
    "54-60": 0,
    ">60": 0,
  };

  const [patientList, setPatientList] = useState([]);
  const [patients, setPatient] = useState([]);

  const auth = localStorage.getItem("auth");
  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  // setLoading(true);
  const getPatient = async () => {
    await axios
      .get(ADD_PATIENT, { headers: headers })
      .then((res) => {
        const fetchedPatients = res.data.data;
        console.log("PATIENTSSSSSSSSSSSS: ", fetchedPatients);

        const newAgeBin = { ...ageBin };
        fetchedPatients.forEach((patient) => {
          if (patient.age < 26) ageBin["18-25"]++;
          else if (patient.age < 33) ageBin["26-32"]++;
          else if (patient.age < 40) ageBin["33-39"]++;
          else if (patient.age < 47) ageBin["40-46"]++;
          else if (patient.age < 54) ageBin["47-53"]++;
          else if (patient.age < 60) ageBin["54-60"]++;
          else ageBin[">60"]++;
        });

        const patientCountList = ageBinList.map((age) => newAgeBin[age]);
        console.log("PatientLIST: ", patientCountList);
        setPatientList(patientCountList);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // setLoading(false);

  console.log("HEHEHEHEHEHEHEHHEHEHEHEHEHEHEEHEH : ", patients);

  // async function getPatientNumber() {

  // }

  useEffect(() => {
    getPatient();
  }, []);

  return (
    <div className="admin-home">
      <div className="header">
        <h6 className="text-center w-100">
          Hello, Welcome to the Admin Dashboard!
        </h6>
      </div>

      <div className="data-box">
        {/* <div class="container">
        <div class="inner-circle">

            <h6>{locCount}</h6>
          <p>TOTAL LOCATIONS</p>
        </div>
      </div> */}
        <div class="container">
          <div class="inner-circle">
            <h6>{facCount - 1}</h6>
            <p>TOTAL COUNSELLERS</p>
          </div>
        </div>
        {/* <div class="container">
          <div class="inner-circle">
            <h6>{campCount}</h6>
            <p>TOTAL CAMPS</p>
          </div>
        </div> */}
        <div class="container">
          <div class="inner-circle">
            <h6>{patientCount}</h6>
            <p>TOTAL PATIENTS</p>
          </div>
        </div>
      </div>

      <div className="data-box">
        {patientList.length != 0 ? (
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: [
                  "18-25",
                  "26-32",
                  "33-39",
                  "40-46",
                  "47-53",
                  "54-60",
                  ">60",
                ],
                id: "ageGroup",
                label: "Age Group",
              },
            ]}
            yAxis={[
              {
                scaleType: "linear",
                id: "patientCount",
                label: "Patient Count",
              },
            ]}
            series={[{ data: patientList }]}
            width={500}
            height={300}
          />
        ) : (
          <p>No data to display</p>
        )}
      </div>
    </div>
  );
}

export default Home;
