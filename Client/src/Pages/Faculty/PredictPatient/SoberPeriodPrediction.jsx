import React, { useState } from "react";
import axios from "axios";
import "./soberPeriodPrediction.scss";
import { SOBER_PERIOD } from "./../../../utils/apiConstant.js";
import { useNavigate } from "react-router";

const SoberPeriodPrediction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "Marital Status": 0,
    "smoking/smokeless": 0,
    "Motivation factor": 0,
    "Willingness for treatment": 0,
    "Sugar(mg)": 0,
    "Risk Level": 0,
    "RCA_liked the effect and wanted more of it": 0,
    MPPR_no: 0,
    "Number of relapses (based on period of treatment)": 0,
    "Period of sober": 0,
  });
  const [outputData, setOutputData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // console.log("hello");
      console.log("Form : ", formData);
      const response = await axios.post(SOBER_PERIOD, formData);
      // console.log("data sent");

      setOutputData(response.data.result);
      // console.log(outputData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div class="question-box">
      <div className="header1">
        <i
          class="bi bi-arrow-left-square-fill"
          onClick={() => {
            localStorage.clear();
            navigate(-1);
          }}
        ></i>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="question">
          <label>Are you married?</label>
          <div>
            <input
              type="radio"
              name="Marital Status"
              value="0"
              checked={formData["Marital Status"] === "0"}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>

          <div>
            <input
              type="radio"
              name="Marital Status"
              value="1"
              checked={formData["Marital Status"] === "1"}
              onChange={handleInputChange}
            />{" "}
            No
          </div>
        </div>

        <div class="question">
          <label>Do you smoke?</label>
          <div>
            <input
              type="radio"
              name="smoking/smokeless"
              value="0"
              checked={formData["smoking/smokeless"] === "0"}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>

          <div>
            <input
              type="radio"
              name="smoking/smokeless"
              value="1"
              checked={formData["smoking/smokeless"] === "1"}
              onChange={handleInputChange}
            />{" "}
            No
          </div>
        </div>

        <div class="question">
          <label>How motivated were you?</label>
          <div>
            <input
              type="radio"
              name="Motivation factor"
              value="0"
              checked={formData["Motivation factor"] === "0"}
              onChange={handleInputChange}
            />{" "}
            Moderate
          </div>

          <div>
            <input
              type="radio"
              name="Motivation factor"
              value="1"
              checked={formData["Motivation factor"] === "1"}
              onChange={handleInputChange}
            />{" "}
            Severe
          </div>
          <div>
            <input
              type="radio"
              name="Motivation factor"
              value="2"
              checked={formData["Motivation factor"] === "2"}
              onChange={handleInputChange}
            />{" "}
            Willing
          </div>
        </div>

        <div class="question">
          <label>How Willing are you to take treatment?</label>
          <div>
            <input
              type="radio"
              name="Willingness for treatment"
              value="0"
              checked={formData["Willingness for treatment"] === "0"}
              onChange={handleInputChange}
            />{" "}
            Willing
          </div>

          <div>
            <input
              type="radio"
              name="Willingness for treatment"
              value="1"
              checked={formData["Willingness for treatment"] === "1"}
              onChange={handleInputChange}
            />{" "}
            Ambivalent
          </div>

          <div>
            <input
              type="radio"
              name="Willingness for treatment"
              value="2"
              checked={formData["Willingness for treatment"] === "2"}
              onChange={handleInputChange}
            />{" "}
            UnWilling
          </div>
        </div>

        <div class="question">
          <label>How much is your sugar level?</label>
          <div>
            <input
              type="radio"
              name="Sugar(mg)"
              value="0"
              checked={formData["Sugar(mg)"] === "0"}
              onChange={handleInputChange}
            />{" "}
            Normal
          </div>

          <div>
            <input
              type="radio"
              name="Sugar(mg)"
              value="1"
              checked={formData["Sugar(mg)"] === "1"}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="Sugar(mg)"
              value="2"
              checked={formData["Sugar(mg)"] === "2"}
              onChange={handleInputChange}
            />{" "}
            Diabetic
          </div>
        </div>

        <div class="question">
          <label>Please specify Risk level</label>
          <div>
            <input
              type="radio"
              name="Risk Level"
              value="1"
              checked={formData["Risk Level"] === "1"}
              onChange={handleInputChange}
            />{" "}
            Low Risk
          </div>

          <div>
            <input
              type="radio"
              name="Risk Level"
              value="2"
              checked={formData["Risk Level"] === "2"}
              onChange={handleInputChange}
            />{" "}
            Medium Risk
          </div>

          <div>
            <input
              type="radio"
              name="Risk Level"
              value="3"
              checked={formData["Risk Level"] === "3"}
              onChange={handleInputChange}
            />{" "}
            High Risk
          </div>

          <div>
            <input
              type="radio"
              name="Risk Level"
              value="4"
              checked={formData["Risk Level"] === "4"}
              onChange={handleInputChange}
            />{" "}
            Very High Risk
          </div>
        </div>

        <div class="question">
          <label>Did you like the effect and wanted more ?</label>
          <div>
            <input
              type="radio"
              name="RCA_liked the effect and wanted more of it"
              value="0"
              checked={
                formData["RCA_liked the effect and wanted more of it"] === "0"
              }
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="RCA_liked the effect and wanted more of it"
              value="1"
              checked={
                formData["RCA_liked the effect and wanted more of it"] === "1"
              }
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Are you currently facing any medical problems?</label>
          <div>
            <input
              type="radio"
              name="MPPR_no"
              value="0"
              checked={formData["MPPR_no"] === "0"}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="MPPR_no"
              value="1"
              checked={formData["MPPR_no"] === "1"}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        {/* <div class="question">
          <label>Number of relapses (based on period of treatment):</label>
          <div>
            <input
              type="radio"
              name="Number of relapses (based on period of treatment)"
              value="0"
              checked={
                formData[
                  "Number of relapses (based on period of treatment)"
                ] === "0"
              }
              onChange={handleInputChange}
            />{" "}
            0
          </div>

          <div>
            <input
              type="radio"
              name="Number of relapses (based on period of treatment)"
              value="1"
              checked={
                formData[
                  "Number of relapses (based on period of treatment)"
                ] === "1"
              }
              onChange={handleInputChange}
            />{" "}
            1
          </div>
        </div> */}

        <div class="question">
          <label>
            Total Number of relapses (based on period of treatment) :{" "}
          </label>
          <div>
            <input
              type="number"
              name="Number of relapses (based on period of treatment)"
              value={
                formData["Number of relapses (based on period of treatment)"]
              }
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>Number of days he was sober : </label>
          <div>
            <input
              type="number"
              name="Period of sober"
              value={formData["Period of sober"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      {outputData && (
        <div className="output-box">
          <h4>Period of sober group: {outputData}</h4>
        </div>
      )}
    </div>
  );
};

export default SoberPeriodPrediction;
