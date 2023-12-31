export function formatDateToCustomFormat(inputDate) {
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  };

  return inputDate?.toLocaleString("en-US", options);
}
