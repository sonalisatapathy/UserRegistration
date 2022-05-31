export default function underAgeValidate(birthday) {
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
