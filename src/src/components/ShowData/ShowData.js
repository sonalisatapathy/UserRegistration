import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./ShowData.module.css";
const ShowData = (props) => {
  const [fetchData, setFetchData] = useState([]);
  // console.log(fetchData);
  useEffect(() => {
    fetchVal();
  }, []);
  const fetchVal = () => {
    fetch("https://localhost:5001/api/users/allusers")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFetchData(data);
      });
  };
  const deleteUserDetails = (id) => {
    // alert("Are u sure to delete?");
    if (window.confirm("Are u sure u want to delete ")) {
      fetch(`https://localhost:5001/api/users/deleteuser/${id}`, {
        method: "DELETE",
      }).then((res) => {
        // console.log(res);
        res.json().then((resp) => {
          console.log(resp);
          fetchVal();
        });
      });
    }
  };

  const headings = [
    "Name",
    "Email",
    "D.O.B",
    "Gender",
    "Interests",
    "Address",
    "City",
    "Country",
    "State",
    "Phone Number",
    "Action",
  ];

  return (
    <div className={classes.tableStyle}>
      <table>
        <caption>User Details:-</caption>
        <tbody>
          <tr>
            {fetchData.length > 0 ? (
              headings.map((item, i) => <th key={i}>{item}</th>)
            ) : (
              <td>No data found</td>
            )}
            {/* {headings.map((item, i) => (
              <th key={i}>{item}</th>
            ))} */}
          </tr>

          {fetchData.map((item, i) => {
            // console.log(fetchData);
            return (
              <tr key={i}>
                {/* <td>{item.userId}</td> */}
                <td>{` ${item.firstName} ${item.middleName} ${item.lastName}`}</td>
                <td>{item.email}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.gender}</td>
                <td>{item.interests}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>
                <td>{item.state}</td>
                <td>
                  <tr>
                    <td>{item.contactDetails}</td>
                  </tr>
                </td>
                <td>
                  <tr>
                    <button
                      onClick={() => deleteUserDetails(item.userId)}
                      style={{
                        backgroundColor: "red",
                        marginLeft: "3px",
                        marginRight: "3px",
                        width: "75px",
                      }}
                    >
                      Delete
                    </button>
                  </tr>
                  <tr>
                    <NavLink to={"/addusers/" + item.userId}>
                      <button
                        // onClick={() => deleteUserDetails(item.userId)}
                        style={{
                          backgroundColor: "green",
                          marginLeft: "3px",
                          marginRight: "3px",
                          width: "75px",
                        }}
                      >
                        Edit
                      </button>
                    </NavLink>
                  </tr>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShowData;
