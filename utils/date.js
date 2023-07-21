const formattedDate = function (timeStamp) {
  const today = new Date(timeStamp);

  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return today.toLocaleDateString("en-US", options);
};

module.exports = formattedDate;
