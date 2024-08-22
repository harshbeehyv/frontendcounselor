import moment from "moment";

export function calcualateDatesArrayDecreasing(dateFrom,dateTo){
    let dates=[]
    let currentDate = moment(dateTo);
    while (currentDate.isSameOrAfter(dateFrom)) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.subtract(1, "day");
    }
    return dates;
}

export function convertToYYYYMMDD(dateStr){
  let date = moment(dateStr, 'DD MMMM YYYY');
  return date.format('YYYY-MM-DD');
}

export function convertToDMMMM(dateStr){
  let date = moment(dateStr, 'YYYY-MM-DD');
    return date.format('D MMMM');
}

