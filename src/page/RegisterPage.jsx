import Field from "../components/common/Field";
import { Link, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { api } = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitFrom = async (fromData) => {
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        fromData
      );
      if (response.status === 201) {
        navigate("/login");
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
              onSubmit={handleSubmit(handleSubmitFrom)}
              className="p-6 rounded-xl space-y-5 max-w-md w-full mx-auto border border-gray-200"
            >
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                Register Form
              </h2>

              <Field
                label="First Name"
                className="pb-2"
                error={errors.firstName}
              >
                <input
                  {...register("firstName", {
                    required: "The field is required",
                  })}
                  type="firstName"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
                  placeholder="Enter your firstName"
                />
              </Field>
              <Field label="Last Name" className="pb-2" error={errors.lastName}>
                <input
                  {...register("lastName", {
                    required: "The field is required",
                  })}
                  type="lastName"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
                  placeholder="Enter your lastName"
                />
              </Field>
              <Field label="Email" className="pb-2" error={errors.email}>
                <input
                  {...register("email", {
                    required: "The email field is required",
                  })}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg mt-1"
                  placeholder="Enter your email"
                />
              </Field>

              <Field label="Password" className="pb-2" error={errors.password}>
                <input
                  {...register("password", {
                    required: "The password field is required",
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
                If have an account.
                <Link
                  className="text-gray-500 transition-all hover:text-lwsGreen hover:underline"
                  to="/login"
                >
                  {" "}
                  Login{" "}
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

export default RegisterPage;
