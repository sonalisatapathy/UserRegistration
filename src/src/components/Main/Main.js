import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShowData from "../ShowData/ShowData";
import ContactDetails from "./ContactDetails";
import Interest from "./Interest";
import classes from "./Main.module.css";

const Main = (props) => {
  const [getData, setGetData] = useState([]);
  const intialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    reEnterPwd: "",
    dob: "",
    address: "",
    city: "",
    state: "",
  };
  const [formValues, setFormValues] = useState(intialValues);
  const [selectCountry, setSelectCountry] = useState();
  const [selectGender, setSelectGender] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userInterest, setUserInterest] = useState({
    interests: [],
  });
  const [inputList, setInputList] = useState([
    {
      phone: "",
    },
  ]);
  const [phNo, setPhNo] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    //console.log(params);
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    console.log(params);
    let result = await fetch(
      `https://localhost:5001/api/users/getuserbyId/${params.id}`
    );
    result = await result.json();
    console.warn(result);
    setFormValues({
      firstName: result.firstName,
      middleName: result.middleName,
      lastName: result.lastName,
      email: result.email,
      password: result.password,
      dob: result.dateOfBirth.substring(0, 10),
      address: result.address,
      city: result.city,
      state: result.state,
    });

    setUserInterest({ interests: [...result.interests.split(",")] });
    setSelectGender(result.gender);
    setSelectCountry(result.country);
  };
  const changeValHandler = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const genderHandler = (event) => {
    setSelectGender(event.target.value);
  };
  const fetchVal = () => {
    fetch("https://localhost:5001/api/users/allusers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGetData(data);
      });
  };
  var phNum = [];
  for (var i = 0; i < inputList.length; i++) {
    let numbers = inputList[i].phone;
    phNum.push(numbers);
  }
  let data = {
    userId: parseInt(params.id),
    FirstName: formValues.firstName,
    MiddleName: formValues.middleName,
    LastName: formValues.lastName,
    Email: formValues.email,
    Address: formValues.address,
    City: formValues.city,
    State: formValues.state,
    DateOfBirth: formValues.dob,
    Password: formValues.password,
    Country: selectCountry,
    Gender: selectGender,
    Interests: userInterest.interests,
    // phNo: phNo,
    PhoneNumbers: phNum,
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    let err = validate(formValues);
    console.log(err);
    setFormErrors(err);
    if (Object.keys(err).length === 0) {
      // console.log(Object.keys(err).length);
      if (!params.id) {
        props.AddValHandler(
          formValues,
          selectCountry,
          selectGender,
          userInterest,
          phNo,
          inputList,
          fetchVal,
          setIsSubmit
        );
      } else {
        var result = await fetch(
          `https://localhost:5001/api/users/updateuser/${params.id}`,
          {
            method: "Put",
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "content-Type": "application/json",
            },
          }
        );
        result = await result.json();
        console.warn(result);
        navigate("/showData");
      }
    }
  };

  // console.log(getData);
  const validate = (values) => {
    const errors = {};
    const regExpForEmail = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i;
    const regExpForPwd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
    const regExpForName = /^(?=.*[a-z])(?=.*[A-Z])/;
    if (!regExpForName.test(values.firstName)) {
      errors.firstName = " Enter both caps and small char";
    }
    if (values.middleName.length > 0) {
      if (!regExpForName.test(values.middleName)) {
        errors.middleName = " Enter both caps and small char";
      }
    }
    if (!regExpForName.test(values.lastName)) {
      errors.lastName = " Enter both caps and small char";
    }

    if (!regExpForEmail.test(values.email)) {
      errors.email = "plz enter correct email id";
    }
    if (values.password.length < 8) {
      errors.password = "Min 8 characters are required";
    } else if (values.password.length >= 10) {
      errors.password = "pwd val con't be more than 10 charcters";
    } else if (!regExpForPwd.test(values.password)) {
      errors.password = "plz enter ur correct pwd";
    }

    if (values.password !== values.reEnterPwd) {
      errors.reEnterPwd = "plz enter correct pwd";
    }
    if (!values.dob) {
      errors.dob = "plz enter dob";
    }
    // if (!values.gender) {
    //   errors.gender = "plz enter gender";
    // }

    return errors;
  };

  return (
    <Fragment>
      {!isSubmit && (
        <>
          <h2
            style={{ color: "blue", textAlign: "center", marginTop: "-16px" }}
          >
            Form Validation
          </h2>
          <div className={classes.mainContainer}>
            <form className={classes.formContainer} onSubmit={submitHandler}>
              <div className={classes.ipFields}>
                <label htmlFor="name">First Name:-</label>

                <input
                  type="text"
                  id="name"
                  name="firstName"
                  required
                  placeholder="ex:-Jonar"
                  value={formValues.firstName}
                  onChange={changeValHandler}
                />
              </div>
              <span className={classes.err}>{formErrors.firstName}</span>
              <div className={classes.ipFields}>
                <label htmlFor="mName">Middle Name:-</label>
                <input
                  type="text"
                  id="mName"
                  name="middleName"
                  placeholder="ex:-Forilan"
                  value={formValues.middleName}
                  onChange={changeValHandler}
                />
              </div>
              <span className={classes.err}>{formErrors.middleName}</span>
              <div className={classes.ipFields}>
                <label htmlFor="lName">Last Name:-</label>
                <input
                  type="text"
                  id="lName"
                  name="lastName"
                  required
                  placeholder="ex:-Kentaro"
                  value={formValues.lastName}
                  onChange={changeValHandler}
                />
              </div>
              <span className={classes.err}>{formErrors.lastName}</span>
              <div className={classes.ipFields}>
                <label htmlFor="gmail">Mail id:-</label>
                <input
                  type="mail"
                  id="gmail"
                  name="email"
                  required
                  placeholder="ex:-kentaro@gmail.com"
                  value={formValues.email}
                  onChange={changeValHandler}
                />
              </div>
              <span className={classes.err}>{formErrors.email}</span>
              <div className={classes.ipFields}>
                <label htmlFor="password">Password:-</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formValues.password}
                  onChange={changeValHandler}
                />
              </div>
              <span className={classes.err}>{formErrors.password}</span>
              <div className={classes.ipFields}>
                <label htmlFor="repwd">Re-Password:-</label>
                <input
                  type="password"
                  id="repwd"
                  name="reEnterPwd"
                  required
                  value={formValues.reEnterPwd}
                  onChange={changeValHandler}
                />
              </div>
              <span className={classes.err}>{formErrors.reEnterPwd}</span>
              <div className={classes.ipFields}>
                <label htmlFor="dob">Date of Birth:-</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  value={formValues.dob}
                  onChange={changeValHandler}
                />
              </div>
              <span className={classes.err}>{formErrors.dob}</span>
              <div className={classes.ipFields}>
                <label htmlFor="gender">Gender:-</label>
                <div className={classes.radiobtn}>
                  <input
                    type="radio"
                    name="gender"
                    required
                    style={{ width: "20px", height: "18px" }}
                    value="Male"
                    onChange={genderHandler}
                    checked={selectGender === "Male"}
                  />
                  <label htmlFor="radio">Male</label>
                </div>
                <div className={classes.radiobtn}>
                  <input
                    type="radio"
                    name="gender"
                    required
                    style={{ width: "20px", height: "18px" }}
                    value="Female"
                    onChange={genderHandler}
                    checked={selectGender === "Female"}
                  />
                  <label htmlFor="radio">Female</label>
                </div>
                <div className={classes.radiobtn}>
                  <input
                    type="radio"
                    name="gender"
                    required
                    style={{ width: "20px", height: "18px" }}
                    value="Others"
                    onChange={genderHandler}
                    checked={selectGender === "Others"}
                  />
                  <label htmlFor="radio">Others</label>
                </div>
              </div>

              <Interest
                interests={props.interests}
                userInterest={userInterest}
                setUserInterest={setUserInterest}
              />
              <div className={classes.ipFields}>
                <label htmlFor="address">Address:-</label>
                <textarea
                  rows="4"
                  cols="30"
                  name="address"
                  // required
                  value={formValues.address}
                  onChange={changeValHandler}
                />
              </div>

              <div className={classes.ipFields}>
                <label htmlFor="city">City:-</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={formValues.city}
                  onChange={changeValHandler}
                />
              </div>

              <div className={classes.ipFields}>
                <label>County:-</label>

                <select
                  value={selectCountry}
                  onChange={(e) => setSelectCountry(e.target.value)}
                >
                  {props.countries.map((item) => {
                    return (
                      <option
                        key={item}
                        name="country"
                        onChange={changeValHandler}
                      >
                        {item}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={classes.ipFields} style={{ marginTop: "3px" }}>
                <label htmlFor="state">State:-</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  required
                  value={formValues.state}
                  onChange={changeValHandler}
                />
              </div>

              <ContactDetails
                setInputList={setInputList}
                phNo={phNo}
                inputList={inputList}
                setPhNo={setPhNo}
              />

              <button type="submit" className={classes.btnSubmit}>
                Submit
              </button>
            </form>
          </div>
        </>
      )}
      <>{isSubmit && <ShowData fetchData={getData} />}</>
    </Fragment>
  );
};

export default Main;
