import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";

const choice = ["yes", "no"];

function BasicInfo5({ prevData, data, setData, setStep, setLoading }) {
  const navigate = useNavigate();

  const [weigthAdmission, setWeightAdmission] = useState(null);
  const [weigthDischarge, setWeightDischarge] = useState(null);
  const [height, setHeight] = useState(null);
  const [sugar, setSugar] = useState(null);
  const [otherIssue, setOtherIssue] = useState(null);
  const [withdrawl, setWithdrawl] = useState(null);
  const [pastMedical, setPastMedical] = useState(null);
  const [presentMedical, setPresentMedical] = useState(null);
  const [chronicHealth, setChronicHealth] = useState(null);
  const [pastPsychatricProblem, setPastPsychatricProblem] = useState(null);
  const [presentPsychatricProblem, setPresentPsychatricProblem] =
    useState(null);
  const [previousHeadInjury, setPreviousHeadInjury] = useState(null);

  const { id } = useParams();

  const submit = async () => {
    setLoading(true);
    const obj = {
      weight_while_admission_in_kg: weigthAdmission,
      weight_while_discharge_in_kg: weigthDischarge,
      height_in_ft: height,
      sugar_in_mg: sugar,
      other_issues: otherIssue,
      withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
      past_medical_problem: pastMedical,
      present_medical_problem: presentMedical,
      chronic_health_problem: chronicHealth,
      past_psychiatric_complication: pastPsychatricProblem,
      present_psychiatric_complication: presentPsychatricProblem,
      history_of_previous_head_injureies: previousHeadInjury,
    };

    const newData = { ...data, obj };

    setData(newData);
    console.log("New Data : ", data);

    //////////////////////My Code//////////////////////

    const auth = localStorage.getItem("facultyAuth");

    console.log(auth);

    const headers = {
      Authorization: `Bearer ${auth}`,
    };

    try {
      const datum = await axios.post(
        ADD_PATIENT,
        { obj: data },
        { headers: headers }
      );

      if (datum) {
        // setLoading(false)
        cogoToast.success("Patient Updated successfully");
        navigate("/faculty");
      }
    } catch (err) {
      // setLoading(false)

      cogoToast.error("some error occured please try again");
      console.log(err);
    }

    ////////////////////END/////////////////////

    setLoading(false);
  };

  const nextStep = () => {
    const obj = {
      weight_while_admission_in_kg: weigthAdmission,
      weight_while_discharge_in_kg: weigthDischarge,
      height_in_ft: height,
      sugar_in_mg: sugar,
      other_issues: otherIssue,
      withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
      past_medical_problem: pastMedical,
      present_medical_problem: presentMedical,
      chronic_health_problem: chronicHealth,
      past_psychiatric_complication: pastPsychatricProblem,
      present_psychiatric_complication: presentPsychatricProblem,
      history_of_previous_head_injureies: previousHeadInjury,
    };

    setData({ ...data, ...obj });
  };

  const update = async () => {
    // setLoading(true);

    const obj = {
      weight_while_admission_in_kg: weigthAdmission,
      weight_while_discharge_in_kg: weigthDischarge,
      height_in_ft: height,
      sugar_in_mg: sugar,
      other_issues: otherIssue,
      withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
      past_medical_problem: pastMedical,
      present_medical_problem: presentMedical,
      chronic_health_problem: chronicHealth,
      past_psychiatric_complication: pastPsychatricProblem,
      present_psychiatric_complication: presentPsychatricProblem,
      history_of_previous_head_injureies: previousHeadInjury,
    };

    const newData = { ...data, ...obj };

    setData(newData);

    console.log("DATA1 : ", data);

    const auth = localStorage.getItem("facultyAuth");

    const headers = {
      Authorization: `Bearer ${auth}`,
    };

    try {
      const datum = await axios.put(
        ADD_PATIENT,
        { obj: data, id: id },
        { headers: headers }
      );

      if (datum) {
        // setLoading(false)
        cogoToast.success("Patient Updated successfully");
        navigate("/faculty");
      }
    } catch (err) {
      // setLoading(false)

      cogoToast.error("some error occured please try again");
      console.log(err);
    }
  };

  useEffect(() => {
    if (data) {
      setWeightAdmission(data?.weight_while_admission_in_kg);
      setWeightDischarge(data?.weight_while_admission_in_kg);
      setHeight(data?.height_in_ft);
      setSugar(data?.sugar_in_mg);
      setOtherIssue(data?.other_issues);
      setWithdrawl(
        data?.withdrawal_symptoms_experienced_when_the_patient_stopped
      );
      setPastMedical(data?.past_medical_problem);
      setPresentMedical(data?.present_medical_problem);
      setChronicHealth(data?.chronic_health_problem);
      setPastPsychatricProblem(data?.past_psychiatric_complication);
      setPresentPsychatricProblem(data?.present_psychiatric_complication);
      setPreviousHeadInjury(data?.history_of_previous_head_injureies);
    }
  }, []);

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">COUNSELLOR SECTION</h2>
      </div>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <h5>
            Take a detailed Pedigree for three generation and relevant positive
            family history
          </h5>
          <textarea
            className="form-control"
            placeholder="Enter the details"
          ></textarea>
        </div>
      </div>

      <hr />

      <h3>CHILDHOOD AND ADOLESCENT HISTORY</h3>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Describe your childhood / teenage years?
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the years"
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Did you experience the following before 15 years?
          </label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setWithdrawl(e.target.value)}
            value={withdrawl}
          >
            <option>Please select</option>
            <option>Poverty or severe debts</option>
            <option>Early parental loss</option>
            <option>Extra marital affairs of parents</option>
            <option>Broken home or single parenting</option>
            <option>violence</option>
            <option>Sexually issue</option>
            <option>none</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Behavior problem identified in Childhood / Adolenscence (before 15
            Years)?
          </label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setWithdrawl(e.target.value)}
            value={withdrawl}
          >
            <option>Please select</option>
            <option>Running away from home</option>
            <option> Frequent physical fights and violence</option>
            <option>Destruction of others property</option>
            <option>Stealing</option>
            <option>Scholastic backwardness</option>
            <option>Experimenting with drugs</option>
            <option>alcohol</option>
            <option>Gambling</option>
            <option>Sexual issues</option>
            <option>Any Other</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Did you experience the following before 15 years?
          </label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setWithdrawl(e.target.value)}
            value={withdrawl}
          >
            <option>Please select</option>
            <option>Poverty or severe debts</option>
            <option>Early parental loss</option>
            <option>Extra marital affairs of parents</option>
            <option>Broken home or single parenting</option>
            <option>violence</option>
            <option>Sexually issue</option>
            <option>none</option>
          </select>
        </div>
      </div>

      <hr />

      <h3>EDUCATIONAL HISTORY</h3>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Achievements in education (mention if any)?
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the achievements"
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Years of education</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the years"
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            High achiever in extracurricular activities (Mention if any)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the achievements"
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>
      </div>

      <hr />

      <h3>RELIGIOUS BELIEFS AND BEHAVIOUR</h3>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <label className="input-lebel">Are you a?</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setWithdrawl(e.target.value)}
            value={withdrawl}
          >
            <option>Please select</option>
            <option>beliver</option>
            <option>non believer</option>
            <option>indifferent</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-12">
          <label className="input-lebel">
            Explore psychological factors of substance use continuation and
            relapse?
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the psychological factor"
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Maximum period of abstinence and possible factors for abstinence?
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the maximum period of abstinence"
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>
      </div>

      <hr />

      <h4>Key Points for the doctors to note</h4>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <textarea
            className="form-control"
            placeholder="Enter the details"
          ></textarea>
        </div>
      </div>

      <h4>Key Points to clarify with Doctors</h4>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <textarea
            className="form-control"
            placeholder="Enter the details"
          ></textarea>
        </div>
      </div>
      <br />
      <h4>FOLLOW UP NOTES OF COUNSELORS</h4>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-12">
          <textarea
            className="form-control"
            placeholder="Enter the details"
          ></textarea>
        </div>
      </div>

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => setStep(4)}>
              Prev
            </button>

            {prevData ? (
              <button className="btn btn-primary" onClick={() => update()}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => submit()}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo5;
