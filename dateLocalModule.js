module.exports = {getCurrentDate};

function getCurrentDate() {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var date = new Date();
  var today =
    days[date.getDay()] +
    ", " +
    date.getDate() +
    " " +
    month[date.getMonth()] +
    ", " +
    date.getFullYear() +
    " Time: " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  return today;
}

