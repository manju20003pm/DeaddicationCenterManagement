import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "./AdminLogin.scss";
import axios from "axios";
import { LOGIN_URL } from "../../utils/apiConstant";
import cogoToast from "cogo-toast";
import Loader from "../../component/Loader/Loader";

function AdminLogin() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const SignIn = async (e) => {
    e.preventDefault();

    if(!email || ! password) {
        cogoToast.error("Please fill the fields below")
        return
    }

    const obj = {
      email: email,
      password: password,
    };

    setLoading(true);

    await axios
      .post(LOGIN_URL, obj)
      .then((res) => {
        console.log(res);   
        if (res.data.data.role === 'admin') {
          localStorage.setItem("auth", res.data.data.token);
          navigate("/admin/home");
        } else {
          localStorage.setItem("facultyAuth", res.data.data.token);
          navigate("/faculty");
        }
      })
      .catch((err) => {
        cogoToast.error(err.response.data.message);
      });

    setLoading(false);
  };

  return (
    <div className="admin_login">
      {loading ? <Loader /> : null}
      <div className="right">
        <div className="right_content">
          <h2 className="content_heading text-center mt-3">Log in </h2>
          <form action="">
            <div className="input_section">
              <div className="input_icon">
                <img src="./Assets/mail.png" alt="" />
              </div>

              <div className=" form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="LoginEmail"
                  placeholder="name@example.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <label htmlFor="LoginPassword">Email</label>
              </div>
            </div>

            <div className="input_section">
              <div className="input_icon">
                <img src="./Assets/lock.png" alt="" />
              </div>

              <div className=" form-floating">
                <input
                  type={passwordShown ? "text" : "password"}
                  className="form-control"
                  id="LoginPassword"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="LoginPassword">Password</label>
              </div>
              <div
                className="input_icon"
                onClick={() => setPasswordShown(!passwordShown)}
              >
                <img src="./Assets/eye.png" alt="" />
              </div>
            </div>

            <div className="row">
              <div className="col mb-4">
                <button className="form_button" onClick={(e) => SignIn(e)}>
                  Sign In
                </button>
              </div>
            </div>
          </form>

          {/* <div className="row">
                        <div className="col text-center">
                            <p className="register_txt">Not Admin? <a >User Login</a> </p>
                        </div>
                    </div> */}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
