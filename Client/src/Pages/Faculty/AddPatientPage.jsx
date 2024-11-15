import React, { useState } from "react";
import { useParams } from "react-router";
import BasicInfo from "../../component/FacultyPanel/AddPatient/BasicInfo";
import BasicInfo2 from "../../component/FacultyPanel/AddPatient/BasicInfo2";
import BasicInfo3 from "../../component/FacultyPanel/AddPatient/BasicInfo3";
import BasicInfo5 from "../../component/FacultyPanel/AddPatient/BasicInfo5";
import BasicInfo4 from "../../component/FacultyPanel/AddPatient/BasicInfo4";
import PredictionModels from "../../component/FacultyPanel/AddPatient/PredictionModel";

import Loader from "../../component/Loader/Loader";
import "./AddPatientPage.scss";
import TabChange from "../../component/TabChange/TabChange";

const tabList = [
  {
    name: "Basic Info",
    step: 1,
  },
  {
    name: "Medical History",
    step: 2,
  },
  {
    name: "Family History",
    step: 3,
  },
  {
    name: "Past Treatment History",
    step: 4,
  },
  {
    name: "Counselor Section",
    step: 5,
  },
  {
    name: "Prediction Models",
    step: 6,
  },
];

function AddPatientPage() {
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const [data, setData] = useState(null);

  return (
    <div className="add-patient">
      {loading ? <Loader /> : null}
      {<TabChange tabList={tabList} setStep={setStep} step={step} />}
      {step == 1 ? (
        <BasicInfo
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
        />
      ) : null}
      {step == 2 ? (
        <BasicInfo2
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      ) : null}
      {step == 3 ? (
        <BasicInfo3
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      ) : null}
      {step == 4 ? (
        <BasicInfo4
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      ) : null}
      {step == 5 ? (
        <BasicInfo5
          prevData={false}
          setData={setData}
          data={data}
          setStep={setStep}
          setLoading={setLoading}
        />
      ) : null}
      {step == 6 ? <PredictionModels /> : null}
    </div>
  );
}

export default AddPatientPage;
