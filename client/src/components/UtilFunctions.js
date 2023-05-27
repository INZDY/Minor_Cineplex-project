//utilities

export const convertDate = (datetime) => {
  const date = new Date(datetime).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return date;
};

export const convertTime = (fulltime) => {
  //used dummy year to enable toLocaleTimeString
  const time = new Date("1970-01-01T" + fulltime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};
