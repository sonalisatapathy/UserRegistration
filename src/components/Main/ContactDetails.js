import React, { useState } from "react";
import classes from "./Main.module.css";
function ContactDetails(props) {
  const { setInputList, phNo, inputList, setPhNo } = props;
  const optionsForPhone = ["", "mobile", "office", "fax"];
  const phoneChaneHandeler = (event, index) => {
    const { name, value } = event.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const addPhNo = () => {
    setInputList([...inputList, { phone: "" }]);
  };
  const removePhNo = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
  const phoneTypeHandler = (event) => {
    const phTypeLists = [...phNo, event.target.value];
    setPhNo(phTypeLists);
  };
  return (
    <div className={classes.ipFields}>
      <label>Contact number:-</label>
      <small>Format: 1234567890</small>

      {inputList.map((item, i) => {
        return (
          <div>
            <select
              key={i}
              style={{
                width: "76px",
                height: "37px",
                marginRight: "14px",
              }}
              onChange={phoneTypeHandler}
            >
              {optionsForPhone.map((item) => (
                <option>{item}</option>
              ))}
            </select>

            <input
              type="number"
              id="phone"
              name="phone"
              min="1111111111"
              max="999999999999"
              required
              className={classes.phNum}
              value={inputList.phone}
              onChange={(event) => phoneChaneHandeler(event, i)}
            />

            {inputList.length !== 1 && (
              <input
                type="button"
                value="-"
                onClick={(event) => removePhNo(event, i)}
                className={classes.btnChange}
              />
            )}

            {inputList.length - 1 === i && (
              <input
                type="button"
                value="+"
                onClick={addPhNo}
                className={classes.btnChange}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ContactDetails;
