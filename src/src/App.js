import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import ShowData from "./components/ShowData/ShowData";
import Greeting from "./components/ShowGreetings/Greeting";
import underAgeValidate from "./components/Main/DateOfBirth";
function App() {
  const [isErr, setIsErr] = useState(null);

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

  const fetchData = (
    formValues,
    selectCountry,
    selectGender,
    userInterest,
    phone,
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
    //console.log(data);

    console.log("hi");
    if (userAge === true) {
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
                  console.log(resp.errors[tempKey][0]);
                  // return resp.errors[tempKey];
                  setIsErr(resp.errors[tempKey][0]);
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
      alert("User Age should me greater than or equal to 18");
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
            // formErr={isErr}
          />,
          <div>{isErr !== null && isErr}</div>,
          <Footer />,
        ]}
      ></Route>
      <Route
        path="addusers/:id"
        element={[
          <Header />,

          <Main
            countries={countries}
            interests={interest}
            AddValHandler={fetchData}
            // formErr={isErr}
          />,
        ]}
      ></Route>
      <Route path="showData" element={[<Header />, <ShowData />]} />
    </Routes>

    // </div>
  );
}

export default App;
