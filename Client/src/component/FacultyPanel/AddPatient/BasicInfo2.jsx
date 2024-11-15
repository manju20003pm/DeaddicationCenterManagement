import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";

const Choice = ["Yes", "No"];

const FamilyHistoryOptions = [
  "alcoholism",
  "drug abuse",
  "psychiatric illness",
];

const withdrawlOptions = [
  "Sweating",
  "palpitation or feeling of one’s own heart beat with HR more than 100bpm",
  "Tremors",
  "Insomnia",
  "Fits",
  "Nausea",
  "Aches and Pains",
  "Anxiety",
  "Restlessness",
  "Transient visual or tactile",
  "auditoryhallucinations or illusions",
];

const pastMedicalProblemOptions = [
  "Haematemesis",
  " Jaundice",
  "Head Injury",
  " Seizure",
  "Accidents",
  " Abscesses",
  " Bleeding piles",
  "Skin problems",
  " Nerve related pains in extremities",
];

const presentMedicalProblemOptions = [
  "Haematemesis",
  " Jaundice",
  "Head Injury",
  " Seizure",
  "Accidents",
  " Abscesses",
  " Bleeding piles",
  "Skin problems",
  " Nerve related pains in extremities",
];

const chronicHealthProblemOptions = [
  "Diabetes",
  "Liver disorders",
  "Epilepsy",
  " Respiratory problem",
  "pulmonary TB",
  "Chronic bronchitis",
  "Bronchial Asthma",
  "Cardiac problems",
  "Infections",
];

const presentPsychatricComplicationOptions = [
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation or attempts",
  "Aggressive outbursts",
  "Hallucinations",
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation ",
  "Paranoid Ideas",
];

const pastPsychatricComplicationOptions = [
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation or attempts",
  "Aggressive outbursts",
  "Hallucinations",
  "Confusion",
  "Seizure during withdrawal",
  "Depression",
  "Suicidal ideation",
  "Paranoid Ideas",
];

function BasicInfo2({ prevData, data, setData, setStep, setLoading }) {
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
  };

  const nextStep = () => {
    console.log("Before : ", setData);
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

    console.log("After : ", setData);
    setStep(3);
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
        <h2 className="w-100 text-center my-4">Medical History</h2>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Weight while admission in (kg)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the weight"
            value={weigthAdmission}
            onChange={(e) => setWeightAdmission(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Weight while discharge in (kg)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the weight"
            value={weigthDischarge}
            onChange={(e) => setWeightDischarge(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Height in (ft)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Sugar in (mg)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter sugar"
            value={sugar}
            onChange={(e) => setSugar(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Other Issues</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter other Issues"
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Withdrawal symptoms</label>
          <select
            class="form-select form-select-lg"
            onChange={(e) => setWithdrawl(e.target.value)}
            value={withdrawl}
          >
            <option>Please select</option>
            {withdrawlOptions &&
              withdrawlOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Past medical problems</label>
          <select
            class="form-select form-select-lg"
            value={pastMedical}
            onChange={(e) => setPastMedical(e.target.value)}
          >
            <option>Please select</option>
            {pastMedicalProblemOptions &&
              pastMedicalProblemOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Present Medical Problems</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={presentMedical}
            onChange={(e) => setPresentMedical(e.target.value)}
          >
            <option>Please select</option>
            {presentMedicalProblemOptions &&
              presentMedicalProblemOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Chronic Health Problem</label>
          <select
            value={chronicHealth}
            class="form-select form-select-lg"
            onChange={(e) => setChronicHealth(e.target.value)}
          >
            <option>Please select</option>
            {chronicHealthProblemOptions &&
              chronicHealthProblemOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Past psychatric complication</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={pastPsychatricProblem}
            onChange={(e) => setPastPsychatricProblem(e.target.value)}
          >
            <option>Please select</option>
            {pastPsychatricComplicationOptions &&
              pastPsychatricComplicationOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Present Psychatric Complication</label>
          <select
            class="form-select form-select-lg"
            value={presentPsychatricProblem}
            onChange={(e) => setPresentPsychatricProblem(e.target.value)}
          >
            <option>Please select</option>
            {presentPsychatricComplicationOptions &&
              presentPsychatricComplicationOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">History of previous Head Injury</label>
          <select
            class="form-select form-select-lg"
            value={previousHeadInjury}
            onChange={(e) => setPreviousHeadInjury(e.target.value)}
          >
            <option>Please select</option>
            {Choice &&
              Choice.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Knowledge of allergy to specific drugs, (if known)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter other Issues"
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Family history of</label>
          <select
            class="form-select form-select-lg"
            value={previousHeadInjury}
            onChange={(e) => setPreviousHeadInjury(e.target.value)}
          >
            <option>Please select</option>
            {FamilyHistoryOptions &&
              FamilyHistoryOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            If any specV? (Who and Which type of drug)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter other Issues"
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            If any psychiatric illness in family? (Who)
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter other Issues"
            value={otherIssue}
            onChange={(e) => setOtherIssue(e.target.value)}
          />
        </div>
      </div>

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => setStep(1)}>
              Prev
            </button>

            <button className="btn btn-primary" onClick={() => nextStep()}>
              Next
            </button>

            {/* {prevData ? (
              <button className="btn btn-primary" onClick={() => update()}>
                Update
              </button>
            ) : (
              <button className="btn btn-primary" onClick={() => submit()}>
                Submit
              </button>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo2;
