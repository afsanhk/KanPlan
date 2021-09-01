// Helper function -- converts String Timestamp to String Date in DMY format
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
// https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
export default function convertTimestampStringToYMD(timestampString) {
  let timestampActual = Date.parse(timestampString);
  let dateActual = new Date(timestampActual);
  const day =
    dateActual.getDate().toString().length < 2
      ? "0" + dateActual.getDate().toString()
      : dateActual.getDate().toString();
  const month =
    (dateActual.getMonth() + 1).toString().length < 2
      ? "0" + (dateActual.getMonth() + 1).toString()
      : (dateActual.getMonth() + 1).toString();
  const year = dateActual.getFullYear();
  let dateDMYString = `${year}-${month}-${day}`;
  return dateDMYString;
}
