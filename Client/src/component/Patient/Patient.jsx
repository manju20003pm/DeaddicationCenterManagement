import React, { useState, useEffect } from "react";
import { ADD_PATIENT, GET_TRUCK } from "../../utils/apiConstant";

import "./Patient.scss";

import axios from "axios";
import AddPatientModal from "../Modal/AddPatientModal";

import * as XLSX from "xlsx/xlsx.mjs";

/* load the codepage support library for extended support with older formats  */
import { set_cptable } from "xlsx";
import * as cptable from "xlsx/dist/cpexcel.full.mjs";

set_cptable(cptable);

function Patient({ setLoading, camp, patient, faculty }) {
  const [truck, setTruck] = useState();
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState();
  const [trigger, setTrigger] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const getData = async () => {
    setLoading(true);

    const auth = localStorage.getItem("auth");

    const headers = {
      Authorization: `Bearer ${auth}`,
    };

    await axios
      .get(ADD_PATIENT, { headers: headers })
      .then((res) => {
        console.log(res);
        setTruck(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  const downloadData = () => {
    var obj = [...JSON.parse(JSON.stringify(patient))];

    console.log(obj);

    for (const i of obj) {
      if (i.complaints && i.complaints.length != 0) {
        i.drug = i?.complaints[0].drug;
        i.age_of_first_use = i?.complaints[0].age_of_first_use;
        i.age_of_first_use = i?.complaints[0].age_of_first_use;
        i.frequency_last_30_days = i?.complaints[0].frequency_last_30_days;
        i.quantity_last_30_days = i?.complaints[0].quantity_last_30_days;
        i.route_stration = i?.complaints[0].route_stration;
        i.year_excessive_use = i?.complaints[0].year_excessive_use;
        i.year_use = i?.complaints[0].year_use;
      }

      delete i["complaints"];
      delete i["weeklyReport"];
      delete i["legal_history"];
      delete i["family_history"];
      delete i["family_health_status"];
      delete i["_id"];
    }

    // const download = (jsonArray, name, index) => {
    // console.log(jsonArray)
    // let djson = copy(obj)
    // const invoiceAdder = parseInt(index) + parseInt(invoiceNumber)
    // for (var j of djson) {
    //   delete j["XCode"]
    //   j["InvoiceNo"] = j["InvoiceNo"] + '-' + invoiceAdder
    //   j["InvoiceDate"] = customDate
    // }
    var worksheet = XLSX.utils.json_to_sheet(obj);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, worksheet);
    XLSX.writeFile(wb, `patientdata.xlsx`);
    // };

    // console.log(obj)
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };

  const handleClearBtn = () => {
    setSearchQuery("");
  };

  const filteredPatients = patient.filter((data) => {
    console.log(
      "data : ",
      data.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return data.name.toLowerCase().includes(searchQuery.toLowerCase());
    // data.phone.includes(searchQuery) ||
    // data.patientId.includes(searchQuery)
    // Add more fields here as needed
  });

  return (
    <div className="content">
      <AddPatientModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        setTrigger={setTrigger}
        camp={camp}
      />
      <div className="header">
        <h4>Patient Data</h4>
      </div>
      <div className="buttons">
        <button
          className="add-btn"
          onClick={(e) => downloadData(e.target.value)}
        >
          Download CSV
        </button>

        <button className="add-btn" onClick={openModal}>
          Add Patient
        </button>

        {/* <input
        type="text"
        placeholder="Search patients..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input" // Add styling as needed
      /> */}

        {/* <input
        onChange={handleSearchChange}
        value={searchQuery}
        type="text"
        name="product-search"
        id="product-search"
        placeholder="Search Patients"
      />
      <i onClick={handleClearBtn} className="fas fa-times"></i>
      
       */}

        <div className="input-wrap">
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

      {/* <div className="table-div">
        <table class="table">
          <thead className="table-header">
            <tr>
              <th scope="col">Patient ID</th>
              <th scope="col">Counseller</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>

              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {patient &&
              patient.map((data, key) => {
                return (
                  <tr>
                    <th scope="row">{data.patientId}</th>
                    <td>
                      <p>
                        {faculty?.map((d, k) => {
                          if (d._id == data.faculty) return d.name;
                        })}
                      </p>
                    </td>
                    <td>
                      <p>{data.name}</p>
                    </td>
                    <td>
                      <p>{data.phone}</p>
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <i class="bi bi-eye"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div> */}

      <div className="table-div">
        <table className="table">
          <thead className="table-header">
            <tr>
              <th scope="col">Patient ID</th>
              <th scope="col">Counseller</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {filteredPatients.map((data, key) => (
              <tr key={key}>
                <th scope="row">{data.patientId}</th>
                <td>
                  {faculty?.map((d, k) => {
                    if (d._id === data.faculty) return d.name;
                  })}
                </td>
                <td>{data.name}</td>
                <td>{data.phone}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Patient;
