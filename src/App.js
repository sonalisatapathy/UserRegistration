import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ShowData from "./components/ShowData/ShowData";
import Greeting from "./components/ShowGreetings/Greeting";

function App() {
  // const [isErr, setIsErr] = useState(null);

  const interest = [
    "sports ",
    "singing",
    "dancing",
    "yoga",
    "reading books",
    "reading newsPaper",
    "computer & software",
    "fashion",
    "photography",
  ];

  const countries = [
    "",
    "India",
    "China",
    "Pakistan",
    "Nepal",
    "Butan",
    "SriLanka",
    "South-Africa",
    "USA",
    "Soviet-Russia",
  ];
  function underAgeValidate(birthday) {
    var optimizedBirthday = birthday.replace(/-/g, "/");
    var myBirthday = new Date(optimizedBirthday);
    console.log(myBirthday);
    // var currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";
    var currentDate = new Date();
    console.log(currentDate);
    var myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);
    console.log(myAge);
    if (myAge < 18) {
      return false;
    } else {
      return true;
    }
  }
  const fetchData = (
    formValues,
    selectCountry,
    selectGender,
    userInterest,
    phNo,
    inputList,
    fetchVal,
    setIsSubmit
  ) => {
    var phNum = [];
    for (var i = 0; i < inputList.length; i++) {
      let numbers = inputList[i].phone;
      phNum.push(numbers);
    }

    var age = formValues.dob;
    var userAge = underAgeValidate(age);
    console.log(userAge);

    let data = {
      firstName: formValues.firstName,
      middleName: formValues.middleName,
      lastName: formValues.lastName,
      email: formValues.email,
      address: formValues.address,
      city: formValues.city,
      state: formValues.state,
      dob: formValues.dob,
      password: formValues.password,
      country: selectCountry,
      gender: selectGender,
      interests: userInterest.interests,
      phNo: phNo,
      inputList: phNum,
    };
    //console.log(data);
    if (userAge === false) {
      console.log("hi");
      fetch("https://localhost:5001/api/users/adduser", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(function (response) {
          if (!response.ok) {
            response.json().then((resp) => {
              if (resp.errors) {
                for (const tempKey in resp.errors) {
                  console.log(tempKey, resp.errors[tempKey]);
                  return resp.errors[tempKey];
                  // setIsErr([resp.errors[tempKey], ...isErr]);
                }
              }
              console.warn("resp", resp);
            });
          } else {
            fetchVal();
            setIsSubmit(true);
            response.json().then((resp) => {
              console.warn("resp", resp);
            });
          }
          // return response;
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("user age should be greater than 18");
    }
  };

  return (
    //<div className="App">
    <Routes>
      <Route path="/" element={[<Header />, <Greeting />, <Footer />]}></Route>
      <Route
        path="addusers"
        element={[
          <Header />,
          <Main
            countries={countries}
            interests={interest}
            AddValHandler={fetchData}
          />,
          <Footer />,
        ]}
      ></Route>
      <Route path="showData" element={[<Header />, <ShowData />]} />
    </Routes>

    // </div>
  );
}

export default App;
