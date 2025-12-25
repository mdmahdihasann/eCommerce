import { Link } from "react-router-dom";
import Field from "../components/common/Field";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitFrom = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );
      console.log(response.data);
      
      if (response.status == 200) {
        const { user, token } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;
          setAuth({ user, authToken, refreshToken });
          if (user?.role === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-center py-8">
      <div className="max-w-[500px] flex-1">
        <div className="container grid items-center gap-8">
          <div className="card">
            {/* form */}

            <form
              onSubmit={handleSubmit(submitFrom)}
              className="p-6 rounded-xl space-y-5 max-w-md w-full mx-auto border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Login Form
              </h2>

              <Field label="Email" className="pb-2" error={errors.email}>
                <input
                  {...register("email", { required: "This Email is require" })}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
                  placeholder="Enter your email"
                />
              </Field>

              <Field label="Password" className="pb-2" error={errors.email}>
                <input
                  {...register("password", {
                    required: "this Password is require",
                    minLength: {
                      value: 8,
                      message: "Your Password must ba a 8 character",
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your password"
                />
              </Field>

              <Field>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition "
                >
                  Submit
                </button>
              </Field>
            </form>

            <div className="py-4 lg:py-6">
              <p className="text-center text-xs text-gray-600/95 lg:text-sm">
                Don’t have account?
                <Link
                  className="text-gray-500 transition-all hover:text-lwsGreen hover:underline"
                  to="/register"
                >
                  {" "}
                  Create New{" "}
                </Link>
              </p>
            </div>
          </div>
          {/* <!-- login form ends --> */}
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
