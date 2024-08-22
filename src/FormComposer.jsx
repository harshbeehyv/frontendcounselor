import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Grid, Box } from "@mui/material";
import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import axios from "./services/axios";
import { sadhanaFormDetails } from "./services/sadhanaFormDetails";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

const formatDate = (date) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const FormComposer = () => {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const loggedInUserJSON = localStorage.getItem("loggedInUser");
  const [userId, setUserId] = useState(JSON.parse(loggedInUserJSON)?.userid);
  useEffect(() => {
    setUserId(JSON.parse(loggedInUserJSON)?.userid);
  }, [loggedInUserJSON]);

  function convertToHHMM(hour, minute) {
    const formattedHour = hour.toString().padStart(2, "0");
    const formattedMinute = minute.toString().padStart(2, "0");
    return `${formattedHour}:${formattedMinute}`;
  }

  function abbreviate(attendance) {
    if (attendance === "Present") return "P";
    if (attendance === "Late") return "L";
    return "A";
  }
  const onSubmit = (data) => {
    const {
      chantingCompletionHours,
      chantingCompletionMinutes,
      bookReadingHours,
      bookReadingMinutes,
      lectureHearingHours,
      lectureHearingMinutes,
      mangalAartiAttendance,
      chantingAttendance,
      sbClassAttendance,
      dateOfSadhana,
    } = data;

    const chantingCompletionTime = convertToHHMM(
      chantingCompletionHours,
      chantingCompletionMinutes
    );

    const bookReadingDuration = convertToHHMM(
      bookReadingHours,
      bookReadingMinutes
    );

    const lectureHearingDuration = convertToHHMM(
      lectureHearingHours,
      lectureHearingMinutes
    );

    const finalData = {
      chantingCompletionTime,
      bookReadingDuration,
      lectureHearingDuration,
      chantingAttendance: abbreviate(chantingAttendance),
      mangalAartiAttendance: abbreviate(mangalAartiAttendance),
      sbClassAttendance: abbreviate(sbClassAttendance),
      dateOfSadhana,
    };

    // console.log(finalData);

    axios
      .post(`sadhana-entry/submit/${userId}`, finalData)
      .then((response) => {
        // console.log(response.data);
        alert("Success");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  return (
    <Box className="p-4 bg-gray-100 rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="dateOfSadhana"
              control={control}
              // defaultValue={formatDate(today)}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Date of Sadhana"
                  fullWidth
                  {...register("dateOfSadhana", {
                    required: {
                      value:
                        sadhanaFormDetails?.dateOfSadhana?.validation?.required,
                      message:
                        sadhanaFormDetails?.dateOfSadhana?.validation
                          ?.errorMessages?.required,
                    },
                  })}
                >
                  <MenuItem value={formatDate(yesterday)}>
                    {formatDate(yesterday)}
                  </MenuItem>
                  <MenuItem value={formatDate(today)}>
                    {formatDate(today)}
                  </MenuItem>
                </TextField>
              )}
            />
            <p className="text-red-500 text-lg">
              {errors && errors["dateOfSadhana"]?.message}
            </p>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="chantingAttendance"
              control={control}
              // defaultValue="Present"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Chanting Attendance"
                  fullWidth
                  {...register("chantingAttendance", {
                    required: {
                      value:
                        sadhanaFormDetails?.chantingAttendance?.validation
                          ?.required,
                      message:
                        sadhanaFormDetails?.chantingAttendance?.validation
                          ?.errorMessages?.required,
                    },
                  })}
                >
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                  <MenuItem value="Late">Late</MenuItem>
                </TextField>
              )}
            />
            {errors && errors["chantingAttendance"]?.message}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mangalAartiAttendance"
              control={control}
              // defaultValue="Present"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Mangal Aarti Attendance"
                  fullWidth
                  {...register("mangalAartiAttendance", {
                    required: {
                      value:
                        sadhanaFormDetails?.mangalAartiAttendance?.validation
                          ?.required,
                      message:
                        sadhanaFormDetails?.mangalAartiAttendance?.validation
                          ?.errorMessages?.required,
                    },
                  })}
                >
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                  <MenuItem value="Late">Late</MenuItem>
                </TextField>
              )}
            />
            {errors && errors["mangalAartiAttendance"]?.message}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="sbClassAttendance"
              control={control}
              // defaultValue="Present"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="SB Class Attendance"
                  fullWidth
                  {...register("sbClassAttendance", {
                    required: {
                      value:
                        sadhanaFormDetails?.sbClassAttendance?.validation
                          ?.required,
                      message:
                        sadhanaFormDetails?.sbClassAttendance?.validation
                          ?.errorMessages?.required,
                    },
                  })}
                >
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                  <MenuItem value="Late">Late</MenuItem>
                </TextField>
              )}
            />
            <p className="text-red-500 text-sm">
              {errors && errors["sbClassAttendance"]?.message}
            </p>
          </Grid>
          <Grid item xs={12}>
          <h2 className="text-lg font-small text-center">Chanting Completion Time</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="chantingCompletionHours"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Hours"
                      fullWidth
                      type="number"
                      placeholder="Hour"
                      inputProps={{
                        min: sadhanaFormDetails?.chantingCompletionHours
                          ?.validation?.minLength,
                        max: sadhanaFormDetails?.chantingCompletionHours
                          ?.validation?.maxLength,
                      }}
                      {...register("chantingCompletionHours", {
                        required: {
                          value:
                            sadhanaFormDetails?.chantingCompletionHours
                              ?.validation?.required,
                          message:
                            sadhanaFormDetails?.chantingCompletionHours
                              ?.validation?.errorMessages?.required,
                        },
                        min: {
                          value:
                            sadhanaFormDetails?.chantingCompletionHours
                              ?.validation?.minLength,
                          message:
                            sadhanaFormDetails?.chantingCompletionHours
                              ?.validation?.errorMessages?.minLength,
                        },
                        max: {
                          value:
                            sadhanaFormDetails?.chantingCompletionHours
                              ?.validation?.maxLength,
                          message:
                            sadhanaFormDetails?.chantingCompletionHours
                              ?.validation?.errorMessages?.maxLength,
                        },
                      })}
                    />
                  )}
                />
                {errors && errors["chantingCompletionHours"]?.message}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="chantingCompletionMinutes"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Minute"
                      fullWidth
                      type="number"
                      placeholder="Minute"
                      inputProps={{
                        min: sadhanaFormDetails?.chantingCompletionMinutes
                          ?.validation?.minLength,
                        max: sadhanaFormDetails?.chantingCompletionMinutes
                          ?.validation?.maxLength,
                      }}
                      {...register("chantingCompletionMinutes", {
                        required: {
                          value:
                            sadhanaFormDetails?.chantingCompletionMinutes
                              ?.validation?.required,
                          message:
                            sadhanaFormDetails?.chantingCompletionMinutes
                              ?.validation?.errorMessages?.required,
                        },
                        min: {
                          value:
                            sadhanaFormDetails?.chantingCompletionMinutes
                              ?.validation?.minLength,
                          message:
                            sadhanaFormDetails?.chantingCompletionMinutes
                              ?.validation?.errorMessages?.minLength,
                        },
                        max: {
                          value:
                            sadhanaFormDetails?.chantingCompletionMinutes
                              ?.validation?.maxLength,
                          message:
                            sadhanaFormDetails?.chantingCompletionMinutes
                              ?.validation?.errorMessages?.maxLength,
                        },
                      })}
                    />
                  )}
                />
                {errors && errors["chantingCompletionMinutes"]?.message}
              </Grid>
            </Grid>
          </Grid>


          <Grid item xs={12}>
            <h2 className="text-lg font-small text-center">Book Reading Duration</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="bookReadingHours"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Hours"
                      fullWidth
                      type="number"
                      placeholder="Hour"
                      inputProps={{
                        min: sadhanaFormDetails?.bookReadingHours?.validation
                          ?.minLength,
                        max: sadhanaFormDetails?.bookReadingHours?.validation
                          ?.maxLength,
                      }}
                      {...register("bookReadingHours", {
                        required: {
                          value:
                            sadhanaFormDetails?.bookReadingHours?.validation
                              ?.required,
                          message:
                            sadhanaFormDetails?.bookReadingHours?.validation
                              ?.errorMessages?.required,
                        },
                        min: {
                          value:
                            sadhanaFormDetails?.bookReadingHours?.validation
                              ?.minLength,
                          message:
                            sadhanaFormDetails?.bookReadingHours?.validation
                              ?.errorMessages?.minLength,
                        },
                        max: {
                          value:
                            sadhanaFormDetails?.bookReadingHours?.validation
                              ?.maxLength,
                          message:
                            sadhanaFormDetails?.bookReadingHours?.validation
                              ?.errorMessages?.maxLength,
                        },
                      })}
                    />
                  )}
                />
                {errors && errors["bookReadingHours"]?.message}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="bookReadingMinutes"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Minutes"
                      fullWidth
                      type="number"
                      placeholder="Minute"
                      inputProps={{
                        min: sadhanaFormDetails?.bookReadingMinutes?.validation
                          ?.minLength,
                        max: sadhanaFormDetails?.bookReadingMinutes?.validation
                          ?.maxLength,
                      }}
                      {...register("bookReadingMinutes", {
                        required: {
                          value:
                            sadhanaFormDetails?.bookReadingMinutes?.validation
                              ?.required,
                          message:
                            sadhanaFormDetails?.bookReadingMinutes?.validation
                              ?.errorMessages?.required,
                        },
                        min: {
                          value:
                            sadhanaFormDetails?.bookReadingMinutes?.validation
                              ?.minLength,
                          message:
                            sadhanaFormDetails?.bookReadingMinutes?.validation
                              ?.errorMessages?.minLength,
                        },
                        max: {
                          value:
                            sadhanaFormDetails?.bookReadingMinutes?.validation
                              ?.maxLength,
                          message:
                            sadhanaFormDetails?.bookReadingMinutes?.validation
                              ?.errorMessages?.maxLength,
                        },
                      })}
                    />
                  )}
                />
                {errors && errors["bookReadingMinutes"]?.message}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
          <h2 className="text-lg font-small text-center">Lecture Hearing Duration</h2>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="lectureHearingHours"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Hours"
                      fullWidth
                      type="number"
                      placeholder="Hour"
                      inputProps={{
                        min: sadhanaFormDetails?.lectureHearingHours?.validation
                          ?.minLength,
                        max: sadhanaFormDetails?.lectureHearingHours?.validation
                          ?.maxLength,
                      }}
                      {...register("lectureHearingHours", {
                        required: {
                          value:
                            sadhanaFormDetails?.lectureHearingHours?.validation
                              ?.required,
                          message:
                            sadhanaFormDetails?.lectureHearingHours?.validation
                              ?.errorMessages?.required,
                        },
                        min: {
                          value:
                            sadhanaFormDetails?.lectureHearingHours?.validation
                              ?.minLength,
                          message:
                            sadhanaFormDetails?.lectureHearingHours?.validation
                              ?.errorMessages?.minLength,
                        },
                        max: {
                          value:
                            sadhanaFormDetails?.lectureHearingHours?.validation
                              ?.maxLength,
                          message:
                            sadhanaFormDetails?.lectureHearingHours?.validation
                              ?.errorMessages?.maxLength,
                        },
                      })}
                    />
                  )}
                />
                {errors && errors["lectureHearingHours"]?.message}
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="lectureHearingMinutes"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Minutes"
                      fullWidth
                      type="number"
                      placeholder="Minute"
                      inputProps={{
                        min: sadhanaFormDetails?.lectureHearingMinutes
                          ?.validation?.minLength,
                        max: sadhanaFormDetails?.lectureHearingMinutes
                          ?.validation?.maxLength,
                      }}
                      {...register("lectureHearingMinutes", {
                        required: {
                          value:
                            sadhanaFormDetails?.lectureHearingMinutes
                              ?.validation?.required,
                          message:
                            sadhanaFormDetails?.lectureHearingMinutes
                              ?.validation?.errorMessages?.required,
                        },
                        min: {
                          value:
                            sadhanaFormDetails?.lectureHearingMinutes
                              ?.validation?.minLength,
                          message:
                            sadhanaFormDetails?.lectureHearingMinutes
                              ?.validation?.errorMessages?.minLength,
                        },
                        max: {
                          value:
                            sadhanaFormDetails?.lectureHearingMinutes
                              ?.validation?.maxLength,
                          message:
                            sadhanaFormDetails?.lectureHearingMinutes
                              ?.validation?.errorMessages?.maxLength,
                        },
                      })}
                    />
                  )}
                />
                {errors && errors["lectureHearingMinutes"]?.message}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <div className="flex justify-end">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default FormComposer;
