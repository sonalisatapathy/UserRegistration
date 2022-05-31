import React, { useState } from "react";
import classes from "./Main.module.css";
const Interest = (props) => {
  const { userInterest, setUserInterest } = props;

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { interests } = userInterest;

    if (checked) {
      setUserInterest({
        interests: [...interests, value],
      });
    } else {
      setUserInterest({
        interests: interests.filter((e) => e !== value),
      });
    }
  };

  return (
    <>
      <div className={classes.ipFields}>
        <label>interests:-</label>
        <div id={classes.checkboxContainer}>
          {props.interests.map((item, i) => {
            return (
              <span className={classes.ipForCheckbox} key={i}>
                <input
                  type="checkbox"
                  id={item}
                  name="interests"
                  value={item}
                  onChange={handleChange}
                  style={{ width: "20px", height: "18px" }}
                  checked={userInterest.interests.includes(item)}
                />
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Interest;
