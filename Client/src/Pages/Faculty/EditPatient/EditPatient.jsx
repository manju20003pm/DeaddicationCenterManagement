import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import BasicInfo from "../../../component/FacultyPanel/AddPatient/BasicInfo";
import BasicInfo2 from "../../../component/FacultyPanel/AddPatient/BasicInfo2";
import BasicInfo3 from "../../../component/FacultyPanel/AddPatient/BasicInfo3";
import BasicInfo4 from "../../../component/FacultyPanel/AddPatient/BasicInfo4";
import BasicInfo5 from "../../../component/FacultyPanel/AddPatient/BasicInfo5";
import TabChange from "../../../component/TabChange/TabChange";

const tabList = [{
  name: "Basic Info",
  step: 1
},
{
  name: "Medical History",
  step: 2
},
{
  name: "Family History",
  step: 3
},
{
  name: "Past Treatment History",
  step: 4
},
{
  name: "Counselor Section",
  step: 5
},
]

function EditPatient() {
  const [prevData, setPrevData] = useState();

  const [step, setStep] = useState(1);



  const { id } = useParams();

  const [data, setData] = useState({
    _id: id,
  });



  const getPatientData = () => {
    console.log(id);
    const patData = JSON.parse(localStorage.getItem("patients"));

    var filteredArray = patData.filter(function (itm) {
      return itm._id == id;
    });

    setData(filteredArray[0]);
  };

  useEffect(() => {
    getPatientData();
  }, []);

  return (
    <div>
      {<TabChange tabList={tabList} setStep={setStep} step={step} />}

      {step == 1 ? <BasicInfo prevData={true} data={data} setData={setData} setStep={setStep} /> : null}
      {step == 2 ? <BasicInfo2 prevData={true} data={data} setData={setData} setStep={setStep} /> : null}
      {step == 3 ? <BasicInfo3 prevData={true} data={data} setData={setData} setStep={setStep} /> : null}
      {step == 4 ? <BasicInfo4 prevData={true} data={data} setData={setData} setStep={setStep} /> : null}
      {step == 5 ? <BasicInfo5 prevData={true} data={data} setData={setData} setStep={setStep} /> : null}


    </div>
  );
}

export default EditPatient;
