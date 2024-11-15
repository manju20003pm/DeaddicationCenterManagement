import React, { useState, useEffect } from "react";
import PatientModal from "../Modal/PatientModal";
import axios from "axios";
import { GET_CAMP, GET_FACULTY, GET_LOCATIONS } from "../../utils/apiConstant";

function Camp({
  setLoading,
  unallocatedPatientsList,
  faculty,
  location,
  setTrigger,
}) {
  const [product, setProduct] = useState();
  const [showModal, setShowModal] = useState(false);
  //   const [trigger, setTrigger] = useState();
  const [data, setData] = useState();

  const [unallocatedPatients, setUnallocatedPatients] = useState([]);

  useEffect(() => {
    if (unallocatedPatientsList) {
      var obj = [];
      for (var i of unallocatedPatientsList) {
        const a = {
          value: i._id,
          label: i.name,
          patientId: i.patientId,
        };
        if (!i.isAdmin) {
          obj.push(a);
        }
      }

      setUnallocatedPatients(obj);
    }
  }, [unallocatedPatientsList]);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="content">
      <PatientModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        setTrigger={setTrigger}
        location={location}
        unallocatedPatients={unallocatedPatients}
        faculties={faculty}
      />
      <div className="header">
        <h4>Non-allocated Patients</h4>
        <button className="add-btn" onClick={openModal}>
          Allocate Patient
        </button>
      </div>

      <div className="table-div">
        <table class="table">
          <thead className="table-header">
            <tr>
              <th scope="col">Patient ID</th>
              {/* <th scope="col">Name</th> */}
              {/* <th scope="col">Location</th> */}
              <th scope="col">Patient</th>
              {/* <th scope="col">Start Date</th>
              <th scope="col">End Date</th> */}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {unallocatedPatientsList &&
              unallocatedPatientsList.map((data, key) => {
                return (
                  <tr>
                    <th scope="row">{data.patientId}</th>
                    <td>
                      <p>{data.name}</p>
                    </td>

                    {
                      /* <td>
                      <p>
                        {location &&
                          location?.map((d, k) => {
                            if (d._id == data.locationId) return <>{d.name}</>;
                          })}
                      </p>
                    </td>*/
                      <td>
                        {" "}
                        {data?.unallocatedPatientsList?.map((data, k) => {
                          for (var i of unallocatedPatients) {
                            console.log("i: ", i);
                            if (data == i.value) return <p>{i.label}</p>;
                          }
                        })}{" "}
                      </td>
                    }
                    {/* <td>
                      <p>{data.startDate.split("T")[0]}</p>
                    </td>

                    <td>
                      <p>{data.endDate.split("T")[0]}</p>

                      {/* {data.createdAt.setDate(data.createdAt.getDate() + 7).split("T")[0]} 
                    </td> */}

                    {/* <td>
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setData(data);
                          openModal();
                        }}
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                    </td> */}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Camp;
