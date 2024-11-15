import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import "./Modal.scss";
import axios from "axios";
import { ADD_FACULTY, HEADERS } from "../../utils/apiConstant";
import cogoToast from "cogo-toast";
import { GET_USER_CAMP } from "../../utils/apiConstant";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: var(--green);
  left: calc(50% - 75px);
  position: fixed;
  z-index: 2001;
`;

function CategoryModal({ showModal, setShowModal, data, setData, setTrigger }) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [role, setRole] = useState();

  const [locationId, setLocationId] = useState();

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#000000");

  const auth = localStorage.getItem("auth");
  // const  = localStorage.getItem("facultyAuth");
  const facultyAuth = localStorage.getItem("facultyAuth");

  const headers = {
    Authorization: `Bearer ${auth}`,
  };

  const facultyHeaders = {
    Authorization: `Bearer ${facultyAuth}`,
  };

  //////////////////My code/////////////////

  const getCamps = async () => {
    await axios
      .get(GET_USER_CAMP, { headers: headers })
      .then((res) => {
        setLocationId(res.data.data[0].locationId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////End//////////////////

  useEffect(() => {
    if (data) {
      setName(data.name);
      setEmail(data.email);
      setPassword(data.password);
      setRole(data.role);
      setLocationId(data.locationId);
    }
  }, [data]);

  const handleSubmit = async () => {
    // console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiii");
    getCamps();
    console.log(locationId);
    if (!name || !email || !password) {
      cogoToast.error("Please fill all the fields");
      return;
    }

    const obj = {
      name: name,
      email: email,
      password: password,
      role: role,
      locationId: locationId,
    };

    await axios
      .post(ADD_FACULTY, obj, { headers: headers })
      .then((res) => {
        console.log("Faculty addittion", res.data);
        cogoToast.success("Faculty added successfully");
        setTrigger((prev) => !prev);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error("Some error occured");
      });
  };

  const handleUpdate = async () => {
    const obj = {
      name,
      email,
      password,
      role,
    };

    await axios
      .put(`${ADD_FACULTY}/${data.id}`, obj, { headers: headers })
      .then((res) => {
        cogoToast.error("Some error occured");
        setTrigger((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error("some error occured");
      });
  };

  const close = () => {
    setName();
    setEmail();
    setPassword();
    setRole();
  };

  const closeModal = () => {
    close();
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <>
        {loading ? (
          <div className="loader">
            <ClipLoader
              color={color}
              loading={true}
              css={override}
              size={150}
            />{" "}
          </div>
        ) : null}
      </>
      {showModal ? (
        <>
          <div className="modal"></div>
          <div className="modal_content">
            <div className="modal_top">
              <h2>Add Faculty</h2>
              <button>
                <img src="./Assets/x.svg" alt="" />
              </button>
            </div>
            <hr />
            <div className="modal_body">
              <div className="row">
                <div className="col">
                  <label className="input-lebel">Name</label>
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    placeholder="Enter the Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Email</label>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    placeholder="Enter the email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Role</label>
                  <select
                    value={role}
                    class="form-select form-select-lg"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option>Please select</option>
                    <option value="admin">Admin</option>
                    <option value="faculty">Faculty</option>
                    <option value="nurse">nurse</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <label className="input-lebel">Password</label>
                  <input
                    type="text"
                    value={password}
                    className="form-control"
                    placeholder="Enter the Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col">
                  <div className="form_buttons">
                    <button
                      className="btn btn-primary"
                      onClick={() => closeModal()}
                    >
                      Cancel
                    </button>

                    {data ? (
                      <input
                        type="submit"
                        value="update"
                        onClick={() => handleUpdate()}
                      />
                    ) : (
                      <input type="submit" onClick={() => handleSubmit()} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default CategoryModal;
