import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";

const choiceOptions = ["yes", "no"];

const familyMember = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Wife",
  "Children",
];

const healthStatus = [
  "Major Depression",
  "Sucide Attempted",
  "Psychatric Illnesses",
  "Alcohol Dependence",
  "drug Dependence",
  "Any Other",
];

const yearOptions = [
  1990, 1991, 1992, 1993, 1994, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2012,
];

const sexualProblemOptions = [
  "None",
  "Difficulty in orgasms",
  "Reduced libido",
  "Premature ejaculation",
  "Impotency",
  "Excessive sexual urge",
  "Complete abstinence",
  "Any other",
];

const familyViolenceOptions = [
  "None",
  "Physical violence directed towards family members verbally abusive",
  "Violent incidents with neighbors and outsiders",
  "Breaking articles at home",
];

const occupationalDamageOptions = [
  "Absenteeism",
  "Warning or memos",
  "Suspension order",
  "Dismissal order",
  "Transfer order",
  "Accidents on job",
  "Attend work under the influence of alcohol",
];

const financialDebtOption = [
  "Money borrowed from family and friends",
  "Banks",
  "place of work",
  "money lenders",
  "SHG",
  "pawn",
  "shops",
  "Liquor shop",
  "Hand loan",
  "None",
];

function BasicInfo3({ prevData, data, setData, setStep, setLoading }) {
  const navigate = useNavigate();

  const { id } = useParams();

  const [family, setFamily] = useState([]);

  const [familyHealth, setFamilyHealth] = useState([]);

  const [familyObj, setFamilyObj] = useState({
    member: "",
    age: "",
    state_of_health: "",
    year_of_death: "",
    cause_of_death: "",
    age_at_death: "",
  });

  const [familyHealthObj, setFamilyHealthObj] = useState({
    member: "",
    problem: "",
    state: "",
  });

  const addFamily = () => {
    console.log(family);

    setFamily([...family, familyObj]);

    setFamilyObj({
      member: "",
      age: "",
      state_of_health: "",
      year_of_death: "",
      cause_of_death: "",
      age_at_death: "",
    });
  };

  const addFamilyHealth = () => {
    setFamilyHealth([...familyHealth, familyHealthObj]);

    setFamilyHealthObj({
      member: "",
      problem: "",
      state: "",
    });
  };

  const [infoData, setInfoData] = useState({
    extra_marital_experience: "",
    premarital_sexual_encounter: "",
    involved_high_risk_sexual_activity: "",
    sexual_problems: "",
    spouse_name: "",
    spouse_age: "",
    spouse_religion: "",
    spouse_education: "",
    spouse_occupation: "",
    spouse_monthly_income: "",
    marriage_years: "",
    marriage_type: "",
    other_marriage: "",
    marriage_seperation_due_to_addication: "",
    longest_marriage_seperation: "",
    suspicious_of_wife: "",
    family_violence: "",
    occupation_age: "",
    occupation_duration: "",
    occupation_award: "",
    job_change_frequently: "",
    period_of_unemployment: "",
    reason_for_unemployment: "",
    occupational_damage: "",
    financial_debt: "",
    financial_debt_amount: "",
  });

  const submit = async () => {
    const obj = {
      ...data,
      ...infoData,
      family_history: family,
      family_health_status: familyHealth,
    };

    console.log(obj);

    const auth = localStorage.getItem("facultyAuth");

    const headers = {
      Authorization: `Bearer ${auth}`,
    };

    try {
      const datum = await axios.post(
        ADD_PATIENT,
        { obj: obj },
        { headers: headers }
      );

      if (datum) {
        setLoading(false);
        cogoToast.success("Patient Added successfully");
        navigate("/faculty");
      }
    } catch (err) {
      setLoading(false);
      cogoToast.error("some error occured please try again");
      console.log(err);
    }
  };

  const update = async () => {
    const obj = {
      ...data,
      ...infoData,
      family_history: family,
      family_health_status: familyHealth,
    };

    const auth = localStorage.getItem("facultyAuth");

    const headers = {
      Authorization: `Bearer ${auth}`,
    };

    try {
      const datum = await axios.put(
        ADD_PATIENT,
        { obj: obj, id: id },
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

  const nextStep = () => {
    // const obj = {
    //   weight_while_admission_in_kg: weigthAdmission,
    //   weight_while_discharge_in_kg: weigthDischarge,
    //   height_in_ft: height,
    //   sugar_in_mg: sugar,
    //   other_issues: otherIssue,
    //   withdrawal_symptoms_experienced_when_the_patient_stopped: withdrawl,
    //   past_medical_problem: pastMedical,
    //   present_medical_problem: presentMedical,
    //   chronic_health_problem: chronicHealth,
    //   past_psychiatric_complication: pastPsychatricProblem,
    //   present_psychiatric_complication: presentPsychatricProblem,
    //   history_of_previous_head_injureies: previousHeadInjury,
    // };

    // setData({ ...data, ...obj });
    setStep(4);
  };

  useEffect(() => {
    if (data) {
      const obj = {
        extra_marital_experience: data.extra_marital_experience,
        premarital_sexual_encounter: data.premarital_sexual_encounter,
        involved_high_risk_sexual_activity:
          data.involved_high_risk_sexual_activity,
        sexual_problems: data.sexual_problems,
        spouse_name: data.spouse_name,
        spouse_age: data.spouse_age,
        spouse_religion: data.spouse_religion,
        spouse_education: data.spouse_education,
        spouse_occupation: data.spouse_occupation,
        spouse_monthly_income: data.spouse_monthly_income,
        marriage_years: data.marriage_years,
        marriage_type: data.marriage_type,
        other_marriage: data.other_marriage,
        marriage_seperation_due_to_addication:
          data.marriage_seperation_due_to_addication,
        longest_marriage_seperation: data.longest_marriage_seperation,
        suspicious_of_wife: data.suspicious_of_wife,
        family_violence: data.family_violence,
        occupation_age: data.occupation_age,
        occupation_duration: data.occupation_duration,
        occupation_award: data.occupation_award,
        job_change_frequently: data.job_change_frequently,
        period_of_unemployment: data.period_of_unemployment,
        reason_for_unemployment: data.reason_for_unemployment,
        occupational_damage: data.occupational_damage,
        financial_debt: data.financial_debt,
        financial_debt_amount: data.financial_debt_amount,
      };

      setInfoData({ ...obj });

      setFamily(data.family ? data.family : []);

      setFamily(data.family_suffering ? data.family_suffering : []);
    }
  }, [data]);

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">Family Details</h2>
      </div>

      <h4>FAMILY HISTORY</h4>

      {family &&
        family.map((data, key) => {
          return (
            <div className="complaints-table">
              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Family Member</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.member}
                  >
                    <option>Please select</option>
                    {familyMember &&
                      familyMember.map((data, key) => {
                        return (
                          <option key={key} value={data}>
                            {data}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the age"
                    value={data.age}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">State of Health</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the State of Health"
                    value={data.state_of_health}
                  />
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Year of death</label>
                  <select
                    class="form-select form-select-lg"
                    value={data?.year_of_death}
                  >
                    <option>Please select</option>
                    {yearOptions.map((data, key) => {
                      return <option value={data}>{data}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Cause of Death</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter the cause death"
                    value={data.cause_of_death}
                  />
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Age at Death</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the age at death"
                    value={data.age_at_death}
                  />
                </div>
              </div>
              <hr />
            </div>
          );
        })}

      <div className="complaints mt-3">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Family Member</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyObj.member}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, member: e.target.value })
              }
            >
              <option>Please select</option>
              {familyMember &&
                familyMember.map((data, key) => {
                  return (
                    <option key={key} value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Age</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter the age"
              value={familyObj.age}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, age: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">State of Health</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the State of Health"
              value={familyObj.state_of_health}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, state_of_health: e.target.value })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Year of death</label>
            <select
              class="form-select form-select-lg"
              value={familyObj?.year_of_death}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, year_of_death: e.target.value })
              }
            >
              <option>Please select</option>
              {yearOptions.map((data, key) => {
                return <option value={data}>{data}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Cause of Death</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Cause of Death"
              value={familyObj?.cause_of_death}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, cause_of_death: e.target.value })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Age at Death</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter the Age at Death"
              value={familyObj?.age_at_death}
              onChange={(e) =>
                setFamilyObj({ ...familyObj, age_at_death: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button className="btn_form" onClick={() => addFamily()}>
              + Add
            </button>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h4>Health Status of Family</h4>

      {familyHealth &&
        familyHealth.map((data, key) => {
          return (
            <div className="complaints-table">
              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Relation</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.member}
                  >
                    <option>Please select</option>
                    {familyMember &&
                      familyMember.map((data, key) => {
                        return (
                          <option key={key} value={data}>
                            {data}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Health Problem</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.problem}
                  >
                    <option>Please select</option>
                    {healthStatus &&
                      healthStatus.map((data, key) => {
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
                  <label className="input-lebel">Status</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.status}
                  >
                    <option>Please select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="dont know">Don't know</option>
                  </select>
                </div>
              </div>
              <hr />
            </div>
          );
        })}

      <div className="complaints mt-3">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Relation</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyHealthObj.member}
              onChange={(e) =>
                setFamilyHealthObj({
                  ...familyHealthObj,
                  member: e.target.value,
                })
              }
            >
              <option>Please select</option>
              {familyMember &&
                familyMember.map((data, key) => {
                  return (
                    <option key={key} value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Health Problem</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyHealth.problem}
              onChange={(e) =>
                setFamilyHealthObj({
                  ...familyHealthObj,
                  problem: e.target.value,
                })
              }
            >
              <option>Please select</option>
              {healthStatus &&
                healthStatus.map((data, key) => {
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
            <label className="input-lebel">Status</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={familyHealth.status}
              onChange={(e) =>
                setFamilyHealthObj({
                  ...familyHealthObj,
                  status: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="dont know">Don't know</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <button className="btn_form" onClick={() => addFamilyHealth()}>
              + Add
            </button>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h2>Sexual History</h2>

      <div className="sexual_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Record extra marital experiences/
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.extra_marital_experience}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  extra_marital_experience: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              If unmarried, premarital sexual encounters
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.premarital_sexual_encounter}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  premarital_sexual_encounter: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Have you involved in any high risk sexual activities?/
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.involved_high_risk_sexual_activity}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  involved_high_risk_sexual_activity: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              At present do you have any sexual problems?/
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.sexual_problems}
              onChange={(e) =>
                setInfoData({ ...infoData, sexual_problems: e.target.value })
              }
            >
              <option>Please select</option>
              {sexualProblemOptions?.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h2>MARITAL HISTORY</h2>

      <div className="marital_history">
        <h4>Details Regarding Spouse</h4>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Spouse Name"
              value={infoData.spouse_name}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_name: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Age</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Spouse Age"
              value={infoData.spouse_age}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_age: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Religion/Community</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Religion/Community"
              value={infoData.spouse_religion}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_religion: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Education</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.spouse_education}
              onChange={(e) =>
                setInfoData({ ...infoData, spouse_education: e.target.value })
              }
            >
              <option>Please select</option>
              <option value="graduate">Graduate</option>
              <option value="Intermediate">Intermediate</option>
              <option value="matric">Matric</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Occupation</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Spouse Occupation"
              value={infoData.spouse_occupation}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_occupation: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Monthly Income</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.spouse_monthly_income}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  spouse_monthly_income: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="10000 - 50000">₹10,000 - ₹50,000</option>
              <option value="50000 - 100000">₹50,000 - ₹100,000</option>
              <option value="more than 100000">more than ₹100,000</option>
            </select>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Number of Years of Marriage</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter the Number of Years of Marriage"
              value={infoData.marriage_years}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  marriage_years: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Marriage Type</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.marriage_type}
              onChange={(e) =>
                setInfoData({ ...infoData, marriage_type: e.target.value })
              }
            >
              <option>Please select</option>
              <option value="love">love</option>
              <option value="arrange">arrange</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Previous or subsequent marriages
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.other_marriage}
              onChange={(e) =>
                setInfoData({ ...infoData, other_marriage: e.target.value })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Have you been separated from your spouse due to your addiction
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.marriage_seperation_due_to_addication}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  marriage_seperation_due_to_addication: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Period of longest Seperation</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter the Period of Longest Seperation"
              value={infoData.longest_marriage_seperation}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  longest_marriage_seperation: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">suspicious of your wife?</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.suspicious_of_wife}
              onChange={(e) =>
                setInfoData({ ...infoData, suspicious_of_wife: e.target.value })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Any Instance of Family violence
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.family_violence}
              onChange={(e) =>
                setInfoData({ ...infoData, family_violence: e.target.value })
              }
            >
              <option>Please select</option>
              {familyViolenceOptions?.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>

      <hr className="my-3" />

      <h2>OCCUPATIONAL HISTORY</h2>

      <div className="occupational_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              What age did you start working?
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Age"
              value={infoData.occupation_age}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_age: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              How long have you been working?
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Number of Year"
              value={infoData.occupation_duration}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_duration: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Have you received any special award, recognition, merit
              certificates or promotions in the past?
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Special Award"
              value={infoData.occupation_award}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_award: e.target.value,
                })
              }
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Did you change your job frequently due to addiction?
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.job_change_frequently}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  job_change_frequently: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Did you have any period of unemployment?
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.period_of_unemployment}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  period_of_unemployment: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Reason for Unemployment?</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.reason_for_unemployment}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  reason_for_unemployment: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Occupational Damage?</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.occupational_damage}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupational_damage: e.target.value,
                })
              }
            >
              <option>Please select</option>
              {occupationalDamageOptions?.map((data) => {
                return <option value={data}>{data}</option>;
              })}
            </select>
          </div>
        </div>

        <hr />
      </div>

      <h2>FINANCIAL HISTORY</h2>

      <div className="financial_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Details of debts to be cleared:
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.financial_debt}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt: e.target.value,
                })
              }
            >
              <option>Please select</option>
              {financialDebtOption?.map((data) => {
                return <option value={data}>{data}</option>;
              })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Debt Amount</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter the Debt Amount"
              value={infoData.financial_debt_amount}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt_amount: e.target.value,
                })
              }
            />
          </div>
        </div>
        <hr />
      </div>

      <h2>LEGAL HISTORY</h2>

      <h4>Have you got into trouble with law for the following:</h4>

      <div className="legal_history">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Arrested for</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.financial_debt}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value={"drunken"}>drunken</option>
              <option value={"drug influenced behavior"}>
                drug influenced behavior
              </option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">No of Times</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Special Award"
              value={infoData.occupation_award}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_award: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Fined for drunken drive</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.financial_debt}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value={"yes"}>yes</option>
              <option value={"no"}>no</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">No of Times</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Special Award"
              value={infoData.occupation_award}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_award: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Had an accident while driving under the influence of
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.financial_debt}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value={"alcohol"}>alcohol</option>
              <option value={"drug"}>drug</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">No of Times</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Special Award"
              value={infoData.occupation_award}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_award: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Assault</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.financial_debt}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value={"yes"}>yes</option>
              <option value={"no"}>no</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">No of Times</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Special Award"
              value={infoData.occupation_award}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_award: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Any other</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={infoData.financial_debt}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  financial_debt: e.target.value,
                })
              }
            >
              <option>Please select</option>
              <option value={"yes"}>yes</option>
              <option value={"no"}>no</option>
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">No of Times</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter the Special Award"
              value={infoData.occupation_award}
              onChange={(e) =>
                setInfoData({
                  ...infoData,
                  occupation_award: e.target.value,
                })
              }
            />
          </div>
        </div>

        <hr />
      </div>

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => setStep(2)}>
              Prev
            </button>

            <button className="btn btn-primary" onClick={() => nextStep()}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo3;
