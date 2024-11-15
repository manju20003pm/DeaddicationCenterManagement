import axios from "axios";
import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { ADD_PATIENT } from "../../../utils/apiConstant";
import "./AddPatient.scss";


const choice = [
    "yes",
    "no"
]


function BasicInfo4({ prevData, data, setData, setStep, setLoading }) {
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

        setLoading(true)
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

        const newData = { ...data, obj }

        setData(newData);


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
        setStep(5);
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

        console.log(data);

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
                <h2 className="w-100 text-center my-4">Treatment</h2>
            </div>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Any untoward incident occurred during treatment</label>

                    <select
                        class="form-select form-select-lg"
                        onChange={(e) => setWithdrawl(e.target.value)}
                        value={withdrawl}
                    >
                        <option>Please select</option>
                        {choice &&
                            choice.map((data, key) => {
                                return (
                                    <option key={key} value={data}>
                                        {data}
                                    </option>
                                );
                            })}
                    </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">If yes describe the incident</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the incident"
                        value={weigthAdmission}
                        onChange={(e) => setWeightAdmission(e.target.value)}
                    />

                </div>
            </div>

            <div className="row">

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Action taken</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the action"
                        value={weigthAdmission}
                        onChange={(e) => setWeightAdmission(e.target.value)}
                    />

                </div>
            </div>


            <h4>Treatments Received in Other Centres Referred by the Counseling Centres</h4>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Name of the Hospital / Deaddiction center</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the name"
                        value={weigthAdmission}
                        onChange={(e) => setWeightAdmission(e.target.value)}
                    />

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Year of treatment</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the year"
                        value={weigthAdmission}
                        onChange={(e) => setWeightAdmission(e.target.value)}
                    />

                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Period of treatment</label>
                    <select
                        class="form-select form-select-lg"
                        onChange={(e) => setWithdrawl(e.target.value)}
                        value={withdrawl}
                    >
                        <option>Please select</option>
                        <option>1 month</option>
                        <option>2 month</option>
                        <option>3 month</option>
                        <option>4 month</option>
                        <option>5 month</option>
                        <option>6 month</option>

                    </select>

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Period of sober</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the period"
                        value={weigthAdmission}
                        onChange={(e) => setWeightAdmission(e.target.value)}
                    />

                </div>
            </div>

            <div className="row">

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Remarks</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the remarks"
                        value={weigthAdmission}
                        onChange={(e) => setWeightAdmission(e.target.value)}
                    />

                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                    <label className="input-lebel">Reason for Replapse</label>
                    <textarea
                        className="form-control"
                        placeholder="Enter reason for relapse"
                    ></textarea>

                </div>
            </div>



            <div className="row w-100 me-auto ml-auto">
                <div className="col-12">
                    <div className="form_buttons">
                        <button className="btn btn-primary" onClick={() => setStep(3)}>
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

export default BasicInfo4;
