import axios from "axios";
import React, { useState, useEffect } from "react";
import { DotLoader } from "react-spinners";
import { GET_FACULTY, HEADERS } from "../../utils/apiConstant";
import FacultyModal from "../Modal/FacultyModal";

function Category({ setLoading, faculty, setTrigger }) {
  const [category, setCategory] = useState();
  // const [trigger, setTrigger] = useState()
  const [data, setData] = useState();

  const auth = localStorage.getItem("auth");

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  // const getData = async () => {
  //     setLoading(true)
  //     await axios.get(GET_FACULTY, {headers: headers})
  //         .then(res => {
  //             localStorage.setItem("faculty", res.data.users);
  //             setCategory(res.data.users)
  //         })
  //         .catch(err => {
  //             console.log(err)
  //         })
  //     setLoading(false)

  // }

  // useEffect(() => {

  //     getData();

  // }, [trigger])

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <div className="content">
      <FacultyModal
        showModal={showModal}
        setShowModal={setShowModal}
        data={data}
        setData={setData}
        setTrigger={setTrigger}
      />
      <div className="header">
        <h4>Available Counsellers</h4>
        <button className="add-btn" onClick={openModal}>
          Add Counseller
        </button>
      </div>

      <div className="table-div">
        <table class="table">
          <thead className="table-header">
            <tr>
              <th scope="col">SNO.</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-body">
            {faculty
              ? faculty.map((data, key) => {
                  if (data.role !== "admin")
                    return (
                      <tr>
                        <th scope="row">{key}</th>
                        <td>
                          <p>{data.name}</p>
                        </td>
                        <td>
                          <p>{data.role}</p>
                        </td>
                        <td>
                          <p>{data.email}</p>
                        </td>
                        <td>
                          <p>***********</p>
                        </td>
                        <td>
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
                        </td>
                      </tr>
                    );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
