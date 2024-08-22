import moment from "moment";

const colors = {
  green: "bg-green-200 text-green-800",
  yellow: "bg-yellow-200 text-yellow-800",
  red: "bg-red-200 text-red-800",
  white: "bg-white text-gray-800",
};

export function getColorClass(value, eventName) {

 
  if (!value || value == "N/A") return colors.white;
  switch (eventName) {
    case "chanting-attendance":
    case "mangal-aarti-attendance":
    case "sb-class-attendance":
      switch (value) {
        case "P":
          return colors.green;
        case "L":
          return colors.yellow;
        case "A":
          return colors.red;
        default:
          return colors.white;
      }

    case "chanting-completion-time":
    case "Avg Time": {

     

      const time = moment(value, "HH:mm");
      console.log(value,time)
      if (time.isSameOrBefore(criteria.chantingCompletionTime.maximumForGreen))
        return colors.green;
      else if (
        time.isSameOrBefore(criteria.chantingCompletionTime.maximumForYellow)
      )
        return colors.yellow;
      else return colors.red;
    }

    case "book-reading-duration": {
      const time = moment(value, "HH:mm");
      if (time.isSameOrAfter(criteria.bookReadingDuration.minimumForGreen)) {
        return colors.green;
      } else if (time.isAfter(criteria.bookReadingDuration.minimumForYellow)) {
        return colors.yellow;
      } else {
        return colors.red;
      }
    }

    case "lecture-hearing-duration": {
      const time = moment(value, "HH:mm");
      if (time.isSameOrAfter(criteria.lectureHearingDuration.minimumForGreen))
        return colors.green;
      else return colors.yellow;
    }

    case "no-of-days-filled-for-percentage": {
      if (value >= criteria.percentageOfDaysFilledFor.minimumForGreen)
        return colors.green;
      else if (value >= criteria.percentageOfDaysFilledFor.minimumForYellow)
        return colors.yellow;
      else return colors.red;
    }

    case "% of Present": {
      if (value >= criteria.percentageAttendance.minimumForGreen)
        return colors.green;
      else if (value >= criteria.percentageAttendance.minimumForYellow)
        return colors.yellow;
      return colors.red;
    }
  }
}

const criteria = {
  chantingCompletionTime: {
    maximumForGreen: moment("14:00", "HH:mm"),
    maximumForYellow: moment("20:00", "HH:mm"),
  },
  lectureHearingDuration: {
    minimumForGreen: moment("00:30", "HH:mm"),
  },
  bookReadingDuration: {
    minimumForGreen: moment("00:30", "HH:mm"),
    minimumForYellow: moment("00:00", "HH:mm"),
  },
  percentageAttendance: {
    minimumForGreen: 80,
    minimumForYellow: 50,
  },
  percentageOfDaysFilledFor: {
    minimumForYellow: 50,
    minimumForGreen: 80,
  },
};
