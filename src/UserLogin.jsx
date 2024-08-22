import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate,Link } from "react-router-dom";
import axios from "./services/axios";

const UserLogin = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();

  useEffect(() => {
    if (localStorage.getItem("loggedInUser") !== null) navigate("/");
  }, []);

  const onLogin = (data) => {
    const { email, password } = data;

    axios
      .post("users/login", { email, password })
      .then(() => {
        axios
          .get(`users/userbyemail/${email}`)
          .then((response) => {
            localStorage.removeItem("loggedInCounselor");
            localStorage.setItem("loggedInUser", JSON.stringify(response.data));

            navigate("/sadhana-form");
          })
          .catch(() => {
            alert("Can't find user");
          });
      })
      .catch((error) => {
        if (error?.response?.status === 404)
          alert("This email id is not registered");
        else if (error?.response?.status === 401)
          alert("Incorrect password entered");
        else alert("An error occurred during login. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Hi Counselee, Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onLogin)}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="email-address"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                )}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                )}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
              Sign in
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Not a counselee,{" "}
            <Link
              to="/counselor-login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>{" "}
            as Counselor
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
