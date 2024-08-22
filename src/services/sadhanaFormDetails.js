export const sadhanaFormDetails = {
  dateOfSadhana: {
    validation: {
      required: true,
      errorMessages: {
        required: "Please select date of Sadhana",
      },
    },
  },

  chantingAttendance: {
    validation: {
      required: true,
      errorMessages: {
        required: "Please select your attendance of Chanting",
      },
    },
  },
  mangalAartiAttendance: {
    validation: {
      required: true,
      errorMessages: {
        required: "Please select your attendance of Mangal Aarti",
      },
    },
  },
  sbClassAttendance: {
    validation: {
      required: true,
      errorMessages: {
        required: "Please select your attendance of SB Class",
      },
    },
  },
  chantingCompletionHours: {
    validation: {
      required: true,
      minLength: 0,
      maxLength: 23,
      errorMessages: {
        required: "Please write hours of chanting completion",
        maxLength: "Hours should not exceed 23",
        minLength: "Minimum value of hours should be 0",
      },
    },
  },
  chantingCompletionMinutes: {
    validation: {
      required: true,
      minLength: 0,
      maxLength: 59,
      errorMessages: {
        required: "Please write minutes of chanting completion",
        maxLength: "Minutes should not exceed 59",
        minLength: "Minimum value of hours should be 0",
      },
    },
  },
  bookReadingHours: {
    validation: {
      required: true,
      minLength: 0,
      maxLength: 12,
      errorMessages: {
        required: "Please write no. of hours of reading book",
        maxLength: "Hours should not exceed 12",
        minLength: "Minimum value of hours should be 0",
      },
    },
  },
  bookReadingMinutes: {
    validation: {
      required: true,
      minLength: 0,
      maxLength: 59,
      errorMessages: {
        required: "Please write no. of minutes of reading book",
        maxLength: "minutes should not exceed 59",
        minLength: "Minimum value of minutes should be 0",
      },
    },
  },
  lectureHearingHours: {
    validation: {
      required: true,
      minLength: 0,
      maxLength: 12,
      errorMessages: {
        required: "Please write no. of hours of hearing lecture",
        maxLength: "Hours should not exceed 12",
        minLength: "Minimum value of hours should be 0",
      },
    },
  },
  lectureHearingMinutes: {
    validation: {
      required: true,
      minLength: 0,
      maxLength: 59,
      errorMessages: {
        required: "Please write no. of minutes of hearing lecture",
        maxLength: "minutes should not exceed 59",
        minLength: "Minimum value of minutes should be 0",
      },
    },
  },
};
