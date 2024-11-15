import cogoToast from "cogo-toast";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./AddPatient.scss";

const years = { upper: 2010, lower: 1990 };

const annualInc = [
  "10,000 - 100,000",
  "100,000 - 500,000",
  "500,000 - 1,000,000",
  "more than 1,000,000",
];

const maritalStat = ["Single", "Married", "Divorsed"];

const BooleanOptions = ["Yes", "No"];

const alcoholUse = [1, 2, 3];

const livingArrangementOptions = ["Family", "Friends", "Relatives", "Alone"];

const disctrictOption = [
  "Bagalkot",
  "Ballari (Bellary)",
  "Belagavi (Belgaum)",
  "Bengaluru (Bangalore) Rural",
  "Bengaluru (Bangalore) Urban",
  "Bidar",
  "Chamarajanagar",
  "Chikballapur",
  "Chikkamagaluru (Chikmagalur)",
  "Chitradurga",
  "Dakshina Kannada",
  "Davangere",
  "Dharwad",
  "Gadag",
  "Hassan",
  "Haveri",
  "Kalaburagi (Gulbarga)",
  "Kodagu",
  "Kolar",
  "Koppal",
  "Mandya",
  "Mysuru (Mysore)",
  "Raichur",
  "Ramanagara",
  "Shivamogga (Shimoga)",
  "Tumakuru (Tumkur)",
  "Udupi",
  "Uttara Kannada (Karwar)",
  "Vijayapura (Bijapur)",
  "Yadgir",
];

const drugTypeOption = [
  "Depressants",
  "Narcotic Analgesic",
  "Cannabis",
  "Stimulants",
  "Hallucinogens",
  "Inhalants",
  "Substance not Classified",
];

const drugFrequencyOptions = ["Morning", "Afternoon", "Evening"];

const referralOptions = [
  "Self",
  "Friends",
  "Family",
  "Doctors",
  "Media",
  "Doctors",
  "Employer",
  "Nava JeevanSamithi Membedoctors",
  "Through awareness programme",
  "SKDRDP",
];

const yearOptions = [
  1990, 1991, 1992, 1993, 1994, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
  2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2012,
];

const reasonStartOptions = [
  "To try",
  "someone in family or friends were using",
  "to feel better and confident or happy",
  "to avoid problems and sadness",
  "other reasons",
];

const reasonContinueOptions = [
  "Liked the effect and wanted more of it",
  "Friends forced",
  "Gave confidence",
  "Craving",
  "Felt relaxed and reduced physical exertion",
];

const stressorsOptions = [
  "Family or relationship issues",
  "Financial Stress",
  "Work related stress",
  "Reports Stressed but doesn’t know where or what",
  "others",
];

function BasicInfo({ setData, setStep, data }) {
  //formData
  const [name, setName] = useState(null);
  const [age, setAge] = useState(null);
  const [sex, setSex] = useState(null);
  const [address, setAddress] = useState(null);
  const [disctrict, setDisctrict] = useState(null);
  const [taluk, setTaluk] = useState(null);
  const [phone, setPhone] = useState(null);
  const [community, setCommunity] = useState(null);
  const [educationYear, setEducationYear] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [livingArrangement, setLivingArrangement] = useState(null);
  const [refferal, setRefferal] = useState(null);

  const [reasonStart, setReasonStart] = useState(null);
  const [reasonContinue, setReasonContinue] = useState(null);
  const [stressors, setStressors] = useState(null);
  const [qtyLastUse, setQtyLastUse] = useState(null);
  const [dateLastUse, setDateLastUse] = useState(null);
  const [impression, setImpression] = useState(null);
  const [denialSubstance, setDenialSubstance] = useState(null);
  const [motivationFactor, setMotivationFactor] = useState(null);
  const [willingness, setWillingness] = useState(null);
  const [actionTaken, setActionTaken] = useState(null);

  const [complaints, setComplaints] = useState([]);

  const [drugOption, setDrugOption] = useState([]);

  const [drugType, setDrugType] = useState();
  const [drug, setDrug] = useState();
  const [drugAgeFirst, setDrugAgeFirst] = useState();
  const [drugYearUse, setDrugYearUse] = useState();
  const [drugYearExessive, setDrugYearExessive] = useState();
  const [drugFrequency, setDrugFrequency] = useState();
  const [drugQuantity, setDrugQuantity] = useState();
  const [routeStration, setRouteStration] = useState();

  ///////////////////My Code////////////////
  const [allocated, setAllocated] = useState("no");
  const [patientId, setPatientId] = useState();
  const [aadhar, setAadhar] = useState();

  ////////////End//////////////////////

  useEffect(() => {
    switch (drugType) {
      case "Depressants":
        setDrugOption(["Alcohol", "Tranquilizers", "Sedatives", "Hypnotics"]);
        break;

      case "Narcotic Analgesic":
        setDrugOption([
          "Opium",
          "Heroin",
          "Brown Sugar",
          "Morphine",
          "Codeine",
          "Pentazocine",
          "Buprenorphine",
        ]);
        break;
      case "Cannabis":
        setDrugOption(["Ganja", "Charas", "Hashish", "Bhang"]);
        break;
      case "Stimulants":
        setDrugOption(["Amphetamine", "Cocaine", "Ecstasy"]);
        break;
      case "Hallucinogens":
        setDrugOption(["LSD", "PCP"]);
        break;

      case "Inhalants":
        setDrugOption([
          "Petrol",
          "Glue",
          "whitener",
          "thinner",
          "grease",
          "nail polish",
        ]);
        break;

      case "Substance not Classified":
        setDrugOption([
          "Cough Syrup",
          "Anti histamine",
          "Antidepressant",
          "Antipsychotic",
          "Smoking and Chewing",
        ]);
        break;
      default:
        setDrugOption([]);
    }
  }, [drugType]);

  const { id } = useParams();

  const nextStep = () => {
    addComplaints();
    const obj = {
      patientId: 0,
      aadharNumber: aadhar,
      allocated: allocated,
      name: name,
      age: age,
      sex: sex,
      address: address,
      disctrict: disctrict,
      taluk: taluk,
      phone: phone,
      community: community,
      education_in_year: educationYear,
      occupation: occupation,
      annual_income: annualIncome,
      marital_status: maritalStatus,
      living_arrangement: livingArrangement,
      refferal: refferal,
      complaints: complaints,
      reason_start: reasonStart,
      reason_continue: reasonContinue,
      stressors: stressors,
      last_use_date: dateLastUse,
      last_use_quantity: qtyLastUse,
      impression_of_camp_officer: impression,
      denial_of_substance_use_related_problems: denialSubstance,
      motivation_factor: motivationFactor,
      willingness_for_treatment: willingness,
      action_taken: actionTaken,
    };
    console.log(obj);

    if (!data) {
      obj.campId = id;
    }
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    //////////////////Previous code/////////////////////////////

    // if (!obj.name || !obj.phone || !obj.age || !obj.sex || !obj.address) {
    //   cogoToast.error("Please fill all the required Fileds");
    //   return
    // }

    /////////////////////END/////////////////////

    if (!obj.name) {
      cogoToast.error("Please fill all the required Fileds");
      return;
    }

    // if (!re.test(obj.phone)) {
    //   cogoToast.error("Phone Number Malformed");
    //   return
    // }
    // const newData = { ...data, ...obj }

    setData({ ...data, ...obj });
    setStep(2);
  };

  const addComplaints = () => {
    if (!drug && !drugQuantity && !drugFrequency && !routeStration) {
      cogoToast.error("Please fill all the fields!");
      return;
    }

    const obj = {
      drug_type: drugType,
      drug: drug,
      age_of_first_use: drugAgeFirst,
      year_use: drugYearUse,
      year_excessive_use: drugYearExessive,
      frequency_last_30_days: drugFrequency,
      quantity_last_30_days: drugQuantity,
      route_stration: routeStration,
    };

    const arr = complaints;
    arr.push(obj);
    setComplaints(arr);
    setDrug("");
    setDrugAgeFirst("");
    setDrugYearUse("");
    setDrugYearExessive("");
    setDrugFrequency("");
    setDrugQuantity("");
    console.log("ARRAy : ", arr);
  };

  useEffect(() => {
    if (data) {
      setName(data?.name);
      setAge(data?.age);
      setSex(data?.sex);
      setAddress(data?.address);
      setTaluk(data?.taluk);
      setPhone(data?.phone);
      setCommunity(data?.community);
      setEducationYear(data?.education_in_year);
      setOccupation(data?.occupation);
      setAnnualIncome(data?.annual_income);
      setMaritalStatus(data?.marital_status);
      setLivingArrangement(data?.living_arrangement);
      setRefferal(data?.refferal);
      setComplaints(data?.complaints);
      setReasonStart(data?.reason_start);
      setReasonContinue(data?.reasonContinue);
      setStressors(data?.stressors);
      setQtyLastUse(data?.last_use_quantity);
      setDateLastUse(data?.last_use_date);
      setImpression(data?.impression_of_camp_officer);
      setDenialSubstance(data?.denial_of_substance_use_related_problems);
      setMotivationFactor(data?.motivationFactor);
      setWillingness(data?.willingness_for_treatment);
      setActionTaken(data?.actionTaken);
      setAadhar(data?.aadharNumber);
    }
  }, [data]);

  const [user, setUser] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <div className="basic-info">
      <div className="header">
        <h2 className="w-100 text-center my-4">Basic Information</h2>
      </div>
      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Name <span className="imp-mark">*</span>{" "}
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter the name"
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Age <span className="imp-mark">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter the age"
            defaultValue={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6 col-sm-12 mb-3">
          <label class="input-lebel" for="">
            Sex <span className="imp-mark">*</span>
          </label>
          <select
            value={sex}
            class="form-select form-select-lg"
            onChange={(e) => setSex(e.target.value)}
          >
            <option>Please select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="col-lg-6 col-sm-12 mb-3">
          <label class="input-lebel" for="">
            Disctrict <span className="imp-mark">*</span>
          </label>
          <select
            value={disctrict}
            class="form-select form-select-lg"
            onChange={(e) => setDisctrict(e.target.value)}
          >
            <option>Please select</option>
            {disctrictOption
              ? disctrictOption.map((data, key) => {
                  return <option value={data}>{data}</option>;
                })
              : null}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6 ">
          <label className="input-lebel">
            Address <span className="imp-mark">*</span>
          </label>
          <textarea
            value={address}
            className="form-control"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the address"
          ></textarea>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6 ">
          <label className="input-lebel">
            Aadhar <span className="imp-mark">*</span>
          </label>
          <input
            value={aadhar}
            name="aadhar"
            type="text"
            className="form-control"
            placeholder="Enter the Adhaar Number"
            onChange={(e) => setAadhar(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Taluk</label>
          <input
            value={taluk}
            type="text"
            className="form-control"
            placeholder="Enter the taluk"
            onChange={(e) => setTaluk(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Phone <span className="imp-mark">*</span>
          </label>
          <input
            value={phone}
            type="tel"
            className="form-control"
            placeholder="Enter the phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Community</label>
          <input
            value={community}
            type="text"
            className="form-control"
            placeholder="Enter the community"
            onChange={(e) => setCommunity(e.target.value)}
          />
        </div>

        {/* <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Education in Year</label>
          <select
            value={educationYear}
            class="form-select form-select-lg"
            onChange={(e) => setEducationYear(e.target.value)}
          >
            <option>Please select</option>
            {yearOptions.map((data, key) => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </div> */}
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Occupation</label>
          <input
            type="text"
            value={occupation}
            className="form-control"
            placeholder="Enter the occupation"
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Annual Income</label>
          <select
            value={annualIncome}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setAnnualIncome(e.target.value)}
          >
            <option>Please select</option>
            {annualInc &&
              annualInc.map((data, key) => {
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
          <label className="input-lebel">Marital Status</label>
          <select
            class="form-select form-select-lg"
            value={maritalStatus}
            onChange={(e) => setMaritalStatus(e.target.value)}
          >
            <option>Please select</option>
            {maritalStat &&
              maritalStat.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Living Arrangement</label>
          <select
            class="form-select form-select-lg"
            id="year"
            value={livingArrangement}
            onChange={(e) => setLivingArrangement(e.target.value)}
          >
            <option>Please select</option>
            {livingArrangementOptions &&
              livingArrangementOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="row d-flex align-items-center">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Refferal</label>
          <select
            class="form-select form-select-lg"
            value={refferal}
            onChange={(e) => setRefferal(e.target.value)}
          >
            <option>Please select</option>
            {referralOptions &&
              referralOptions.map((data, key) => {
                return (
                  <option key={key} value={data}>
                    {data}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <hr />
      <h4>Presenting Complaints</h4>

      {complaints &&
        complaints.map((data, key) => {
          return (
            <div className="complaints-table mb-3">
              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Drug Type</label>
                  {console.log(complaints[key])}
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.drug}
                  >
                    <option>{complaints[key]?.drug_type}</option>
                    {drugTypeOption &&
                      drugTypeOption.map((data, key) => {
                        return (
                          <option key={key} value={data}>
                            {data}
                          </option>
                        );
                      })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Drug</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.drug}
                  >
                    <option>{complaints[key]?.drug}</option>
                    {drugOption &&
                      drugOption.map((data, key) => {
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
                  <label className="input-lebel">Age of First Use</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the community"
                    value={data.age_of_first_use}
                  />
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Year of Use</label>
                  <select
                    class="form-select form-select-lg"
                    value={data?.year_use}
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
                  <label className="input-lebel">Year of excessive use</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data?.year_excessive_use}
                  >
                    <option>Please select</option>
                    {yearOptions.map((data, key) => {
                      return <option value={data}>{data}</option>;
                    })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">Route of admin stration</label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.route_stration}
                  >
                    <option>Please select</option>
                    <option value="orally">Orally</option>
                    <option value="orally">injected</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">
                    Frequency of use in the last 30 days
                  </label>
                  <select
                    class="form-select form-select-lg"
                    id="year"
                    value={data.frequency_last_30_days}
                  >
                    <option>Please select</option>
                    {drugFrequencyOptions?.map((dat, key) => {
                      return <option value={dat}>{dat}</option>;
                    })}
                  </select>
                </div>

                <div className="col-sm-12 mb-3 col-lg-6">
                  <label className="input-lebel">
                    Quantity used in the last 30 days (ml)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter the quantity"
                    value={data.quantity_last_30_days}
                  />
                </div>
              </div>

              <hr />
            </div>
          );
        })}

      <div className="complaints ">
        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Drug Type</label>
            <select
              class="form-select form-select-lg"
              value={drugType}
              onChange={(e) => setDrugType(e.target.value)}
            >
              <option>Please select</option>
              {drugTypeOption &&
                drugTypeOption.map((data, key) => {
                  return (
                    <option key={key} value={data}>
                      {data}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Drug</label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={drug}
              onChange={(e) => setDrug(e.target.value)}
            >
              <option>Please select</option>
              {drugOption &&
                drugOption.map((data, key) => {
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
            <label className="input-lebel">Age of First Use</label>
            <input
              type="number"
              className="form-control"
              value={drugAgeFirst}
              placeholder="Enter Age of first use"
              onChange={(e) => setDrugAgeFirst(e.target.value)}
            />
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Year of Use</label>
            <select
              class="form-select form-select-lg"
              value={drugYearUse}
              onChange={(e) => setDrugYearUse(e.target.value)}
            >
              <option>Please select</option>
              {(() => {
                const options = [];

                for (let i = 1990; i <= 2010; i++) {
                  options.push(<option value={i}>{i}</option>);
                }

                return options;
              })()}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Year of excessive use</label>
            <select
              class="form-select form-select-lg"
              value={drugYearExessive}
              onChange={(e) => setDrugYearExessive(e.target.value)}
            >
              <option>Please select</option>
              {(() => {
                const options = [];

                for (let i = 1990; i <= 2010; i++) {
                  options.push(<option value={i}>{i}</option>);
                }

                return options;
              })()}
            </select>
          </div>
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">Route of admin stration</label>
            <select
              class="form-select form-select-lg"
              value={routeStration}
              onChange={(e) => setRouteStration(e.target.value)}
            >
              <option>Please select</option>
              <option value="orally">Orally</option>
              <option value="orally">injected</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Frequency of use in the last 30 days
            </label>
            <select
              class="form-select form-select-lg"
              id="year"
              value={drugFrequency}
              onChange={(e) => {
                setDrugFrequency(e.target.value);
              }}
            >
              <option>Please select</option>
              {drugFrequencyOptions?.map((dat, key) => {
                return <option value={dat}>{dat}</option>;
              })}
            </select>
          </div>

          <div className="col-sm-12 mb-3 col-lg-6">
            <label className="input-lebel">
              Quantity used in the last 30 days (ml)
            </label>
            <input
              type="number"
              className="form-control"
              value={drugQuantity}
              placeholder="Enter the quantity"
              onChange={(e) => setDrugQuantity(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-2 ">
            <button className="btn_form" onClick={() => addComplaints()}>
              + Add Line
            </button>
          </div>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Reson for starting</label>
          <select
            class="form-select form-select-lg"
            value={reasonStart}
            onChange={(e) => setReasonStart(e.target.value)}
          >
            <option>Please select</option>
            {reasonStartOptions.map((data, key) => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Reson for continuing</label>
          <select
            value={reasonContinue}
            class="form-select form-select-lg"
            onChange={(e) => setReasonContinue(e.target.value)}
          >
            <option>Please select</option>
            {reasonContinueOptions.map((data, key) => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Stressors</label>
          <select
            value={stressors}
            class="form-select form-select-lg"
            onChange={(e) => setStressors(e.target.value)}
          >
            <option>Please select</option>
            {stressorsOptions?.map((data, key) => {
              return <option value={data}>{data}</option>;
            })}
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Last Use date</label>
          <input
            value={dateLastUse?.split("T")[0]}
            type="date"
            className="form-control"
            onChange={(e) => setDateLastUse(e.target.value)}
          />
        </div>
      </div>

      <div className="row ">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Quantity of last use</label>
          <input
            type="text"
            value={qtyLastUse}
            className="form-control"
            placeholder="Quantity of last Use in ml"
            onChange={(e) => setQtyLastUse(e.target.value)}
          />
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Impression of camp officer about the Patient
          </label>
          <input
            type="text"
            value={impression}
            className="form-control"
            placeholder="Impression of camp officer"
            onChange={(e) => setImpression(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">
            Denial of substance use related problems
          </label>
          <select
            value={denialSubstance}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setDenialSubstance(e.target.value)}
          >
            <option>Please select</option>
            <option value={"Mild"}>Mild</option>
            <option value={"Moderate"}>Moderate</option>
            <option value={"Severe"}>Severe</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Motivation Factor</label>
          <select
            value={motivationFactor}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setMotivationFactor(e.target.value)}
          >
            <option>Please select</option>
            <option value={"Mild"}>Mild</option>
            <option value={"Moderate"}>Moderate</option>
            <option value={"Severe"}>Severe</option>
          </select>
        </div>
      </div>

      <div className="row ">
        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Willingness for Treatment</label>
          <select
            value={willingness}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setWillingness(e.target.value)}
          >
            <option>Please select</option>
            <option value={"Unwilling"}>Unwilling</option>
            <option value={"Ambivalent"}>Ambivalent</option>
            <option value={"Willing"}>Willing</option>
          </select>
        </div>

        <div className="col-sm-12 mb-3 col-lg-6">
          <label className="input-lebel">Action Taken</label>
          <select
            value={actionTaken}
            class="form-select form-select-lg"
            id="year"
            onChange={(e) => setActionTaken(e.target.value)}
          >
            <option>Please select</option>
            <option value={"Admitted"}>Admitted</option>
            <option value={"Reffered"}>Reffered</option>
            {/* <option value={"Severe"}>Severe</option> */}
          </select>
        </div>
      </div>

      <br />
      <br />

      <hr />

      <br />

      <div className="row w-100 me-auto ml-auto">
        <div className="col-12">
          <div className="form_buttons">
            <button className="btn btn-primary" onClick={() => nextStep()}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfo;
