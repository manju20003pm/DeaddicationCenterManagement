import React, { useState } from "react";
import axios from "axios";
import "./soberPeriodPrediction.scss";
import { AAI_PREDICTION } from "./../../../utils/apiConstant.js";
import { useNavigate } from "react-router";

const AAOPrediction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Age: 0,
    "Weight while admission (In Kg)": 0,
    "duration of use of alcohol": 0,
    "Alcohol Risk Level": 0,
    "duration of excessive use of alcohol": 0,
    AWS_Stages: 0,
    "smoking/smokeless": -1,
    "Nicotine (yes/NO)": -1,
    "R_to feel better/confident/happy": 0,
    "R_to avoid problems and sadness": 0,

    "R_to try": 0,
    "ACE_Poverty or severe debts": 0,
    "ACE_Scholastic backwardness": 0,
    "ACE_Early parental loss": 0,
    "ACE_Broken home or single parenting": 0,
    "ACE_Running away from home": 0,
    "Psy_Aggressive Outbursts": 0,
    Psy_Confusion: 0,
    Psy_Hallucinations: 0,
    Psy_Depression: 0,

    C_Diabetes: -1,
    "Family history of alcoholism / drug abuse, if any (who and which type of drug)":
      -1,

    "At what age did you start working?": 0,
    "S_Family or relationship issues": 0,
    "S_Financial Stress": 0,
    "S_Work related stress": 0,
    "S_Reports Stressed but doesn’t know where or what": 0,
    "Did you have any period of unemployment": -1,
    "How many first degree relatives had Substance addiction": 0,

    "any instance of family violence": -1,
    "Marital Status": -1,
    "multiple marriages": -1,
    "Record extra marital experiences": -1,
    "At present do you have any sexual problem ( if yes mention)": -1,
    "Legal complications yes/no": -1,
  });
  const [outputData, setOutputData] = useState(null);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    // Check if the input element is a checkbox
    if (type === "checkbox") {
      const updatedValue = checked ? 1 : 0; // Set to 1 if checked, 0 if unchecked
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: updatedValue,
      }));
    } else {
      // For other input types (radio, text, etc.), update as usual
      var integer = parseInt(value, 10);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: integer,
      }));
    }
  };

  const handleSubmit = async (event) => {
    console.log("FORM DATA : ", formData);
    event.preventDefault();
    try {
      // console.log("hello");
      const response = await axios.post(AAI_PREDICTION, formData);
      // console.log("data sent");
      console.log(response);
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
          <label>Reason to start alcohol?</label>
          <div>
            <input
              type="checkbox"
              name="R_to avoid problems and sadness"
              //   value="0"
              checked={formData["R_to avoid problems and sadness"]}
              onChange={handleInputChange}
            />{" "}
            To avoid problems and sadness
          </div>

          <div>
            <input
              type="checkbox"
              name="R_to feel better/confident/happy"
              //   value="0"
              checked={formData["R_to feel better/confident/happy"]}
              onChange={handleInputChange}
            />{" "}
            To feel better and confident or happy
          </div>

          <div>
            <input
              type="checkbox"
              name="R_to try"
              //   value="0"
              checked={formData["R_to try"]}
              onChange={handleInputChange}
            />{" "}
            To try
          </div>
        </div>

        <div class="question">
          <label>Do you smoke?</label>
          <div>
            <input
              type="radio"
              name="smoking/smokeless"
              value="0"
              checked={formData["smoking/smokeless"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="smoking/smokeless"
              value="1"
              checked={formData["smoking/smokeless"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Do you intake Nicotine?</label>
          <div>
            <input
              type="radio"
              name="Nicotine (yes/NO)"
              value="0"
              checked={formData["Nicotine (yes/NO)"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="Nicotine (yes/NO)"
              value="1"
              checked={formData["Nicotine (yes/NO)"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Are you married?</label>
          <div>
            <input
              type="radio"
              name="Marital Status"
              value="0"
              checked={formData["Marital Status"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="Marital Status"
              value="1"
              checked={formData["Marital Status"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>At present do you have any sexual problem?</label>
          <div>
            <input
              type="radio"
              name="At present do you have any sexual problem ( if yes mention)"
              value="0"
              checked={
                formData[
                  "At present do you have any sexual problem ( if yes mention)"
                ] === 0
              }
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="At present do you have any sexual problem ( if yes mention)"
              value="1"
              checked={
                formData[
                  "At present do you have any sexual problem ( if yes mention)"
                ] === 1
              }
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Legal complications?</label>
          <div>
            <input
              type="radio"
              name="Legal complications yes/no"
              value="0"
              checked={formData["Legal complications yes/no"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="Legal complications yes/no"
              value="1"
              checked={formData["Legal complications yes/no"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Multiple marriages?</label>
          <div>
            <input
              type="radio"
              name="multiple marriages"
              value="0"
              checked={formData["multiple marriages"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="multiple marriages"
              value="1"
              checked={formData["multiple marriages"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Did you have any period of unemployment?</label>
          <div>
            <input
              type="radio"
              name="Did you have any period of unemployment"
              value="0"
              checked={
                formData["Did you have any period of unemployment"] === 0
              }
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="Did you have any period of unemployment"
              value="1"
              checked={
                formData["Did you have any period of unemployment"] === 1
              }
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>any instance of family violence?</label>
          <div>
            <input
              type="radio"
              name="any instance of family violence"
              value="0"
              checked={formData["any instance of family violence"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="any instance of family violence"
              value="1"
              checked={formData["any instance of family violence"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Record extra marital experiences?</label>
          <div>
            <input
              type="radio"
              name="Record extra marital experiences"
              value="0"
              checked={formData["Record extra marital experiences"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="Record extra marital experiences"
              value="1"
              checked={formData["Record extra marital experiences"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Family history of alcoholism / drug abuse?</label>
          <div>
            <input
              type="radio"
              name="Family history of alcoholism / drug abuse, if any (who and which type of drug)"
              value="0"
              checked={
                formData[
                  "Family history of alcoholism / drug abuse, if any (who and which type of drug)"
                ] === 0
              }
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="Family history of alcoholism / drug abuse, if any (who and which type of drug)"
              value="1"
              checked={
                formData[
                  "Family history of alcoholism / drug abuse, if any (who and which type of drug)"
                ] === 1
              }
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Do you have Diabetes?</label>
          <div>
            <input
              type="radio"
              name="C_Diabetes"
              value="0"
              checked={formData["C_Diabetes"] === 0}
              onChange={handleInputChange}
            />{" "}
            No
          </div>

          <div>
            <input
              type="radio"
              name="C_Diabetes"
              value="1"
              checked={formData["C_Diabetes"] === 1}
              onChange={handleInputChange}
            />{" "}
            Yes
          </div>
        </div>

        <div class="question">
          <label>Alcohol Withdrawal Symptom Stage : </label>
          <div>
            <input
              type="radio"
              name="AWS_Stages"
              value="0"
              checked={formData["AWS_Stages"] === 0}
              onChange={handleInputChange}
            />{" "}
            0
          </div>

          <div>
            <input
              type="radio"
              name="AWS_Stages"
              value="1"
              checked={formData["AWS_Stages"] === 1}
              onChange={handleInputChange}
            />{" "}
            1
          </div>

          <div>
            <input
              type="radio"
              name="AWS_Stages"
              value="2"
              checked={formData["AWS_Stages"] === 2}
              onChange={handleInputChange}
            />{" "}
            2
          </div>

          <div>
            <input
              type="radio"
              name="AWS_Stages"
              value="3"
              checked={formData["AWS_Stages"] === 3}
              onChange={handleInputChange}
            />{" "}
            3
          </div>

          <div>
            <input
              type="radio"
              name="AWS_Stages"
              value="4"
              checked={formData["AWS_Stages"] === 4}
              onChange={handleInputChange}
            />{" "}
            4
          </div>
        </div>

        <div class="question">
          <label>Psychiatric complication(if applicable)</label>
          <div>
            <input
              type="checkbox"
              name="Psy_Confusion"
              //   value="0"
              checked={formData["Psy_Confusion"]}
              onChange={handleInputChange}
            />{" "}
            Confusion
          </div>

          <div>
            <input
              type="checkbox"
              name="Psy_Hallucinations"
              //   value="0"
              checked={formData["Psy_Hallucinations"]}
              onChange={handleInputChange}
            />{" "}
            Hallucinations
          </div>

          <div>
            <input
              type="checkbox"
              name="Psy_Aggressive Outbursts"
              //   value="0"
              checked={formData["Psy_Aggressive Outbursts"]}
              onChange={handleInputChange}
            />{" "}
            Aggressive Outbursts
          </div>

          <div>
            <input
              type="checkbox"
              name="Psy_Depression"
              //   value="0"
              checked={formData["Psy_Depression"]}
              onChange={handleInputChange}
            />{" "}
            Depression
          </div>
        </div>

        <div class="question">
          <label>ACE (if applicable)</label>

          <div>
            <input
              type="checkbox"
              name="ACE_Running away from home"
              //   value="0"
              checked={formData["ACE_Running away from home"]}
              onChange={handleInputChange}
            />{" "}
            Running away from home
          </div>

          <div>
            <input
              type="checkbox"
              name="ACE_Broken home or single parenting"
              //   value="0"
              checked={formData["ACE_Broken home or single parenting"]}
              onChange={handleInputChange}
            />{" "}
            Broken home or single parenting
          </div>

          <div>
            <input
              type="checkbox"
              name="ACE_Early parental loss"
              //   value="0"
              checked={formData["ACE_Early parental loss"]}
              onChange={handleInputChange}
            />{" "}
            Early parental loss
          </div>

          <div>
            <input
              type="checkbox"
              name="ACE_Scholastic backwardness"
              //   value="0"
              checked={formData["ACE_Scholastic backwardness"]}
              onChange={handleInputChange}
            />{" "}
            Scholastic backwardness
          </div>

          <div>
            <input
              type="checkbox"
              name="ACE_Poverty or severe debts"
              //   value="0"
              checked={formData["ACE_Poverty or severe debts"]}
              onChange={handleInputChange}
            />{" "}
            Poverty or severe debts
          </div>
        </div>

        <div class="question">
          <label>Stressors</label>

          <div>
            <input
              type="checkbox"
              name="S_Family or relationship issues"
              //   value="0"
              checked={formData["S_Family or relationship issues"]}
              onChange={handleInputChange}
            />{" "}
            Family or relationship issues
          </div>

          <div>
            <input
              type="checkbox"
              name="S_Financial Stress"
              //   value="0"
              checked={formData["S_Financial Stress"]}
              onChange={handleInputChange}
            />{" "}
            Financial Stress
          </div>

          <div>
            <input
              type="checkbox"
              name="S_Work related stress"
              //   value="0"
              checked={formData["S_Work related stress"]}
              onChange={handleInputChange}
            />{" "}
            Work related stress
          </div>

          <div>
            <input
              type="checkbox"
              name="S_Reports Stressed but doesn’t know where or what"
              //   value="0"
              checked={
                formData["S_Reports Stressed but doesn’t know where or what"]
              }
              onChange={handleInputChange}
            />{" "}
            Reports Stressed but doesn’t know where or what
          </div>
        </div>

        <div class="question">
          <label>Risk level : </label>
          <div>
            <input
              type="number"
              name="Alcohol Risk Level"
              value={formData["Alcohol Risk Level"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>Age : </label>
          <div>
            <input
              type="number"
              name="Age"
              value={formData["Age"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>Weight while admission (In Kg) : </label>
          <div>
            <input
              type="number"
              name="Weight while admission (In Kg)"
              value={formData["Weight while admission (In Kg)"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>duration of use of alcohol : </label>
          <div>
            <input
              type="number"
              name="duration of use of alcohol"
              value={formData["duration of use of alcohol"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>duration of excessive use of alcohol : </label>
          <div>
            <input
              type="number"
              name="duration of excessive use of alcohol"
              value={formData["duration of excessive use of alcohol"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>At what age did you start working? : </label>
          <div>
            <input
              type="number"
              name="At what age did you start working?"
              value={formData["At what age did you start working?"]}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div class="question">
          <label>
            How many first degree relatives had Substance addiction :{" "}
          </label>
          <div>
            <input
              type="number"
              name="How many first degree relatives had Substance addiction"
              value={
                formData[
                  "How many first degree relatives had Substance addiction"
                ]
              }
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
      {outputData && (
        <div className="output-box">
          <h4>Age of Alcohol Initiation: {outputData}</h4>
        </div>
      )}
    </div>
  );
};

export default AAOPrediction;
