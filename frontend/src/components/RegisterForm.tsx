import { useForm, type SubmitHandler } from "react-hook-form";

import type { RegisterFormData } from "../types/types";

type FormMode = "login" | "register" | "verify";
interface RegistrationFormProps {
  onSubmit: SubmitHandler<RegisterFormData>;
  toggleMode: (formMode: FormMode) => void;
}

export const RegisterForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  toggleMode,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        {/* Username regex explanation:
              1. Only contains alphanumeric characters and dot.
              2. Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
              3. Underscore and dot can't be next to each other (e.g user_.name). 
              4. Underscore or dot can't be used multiple times in a row (e.g user__name / user..name). 
        */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 8,
              message: "Minimum 8 characters is required",
            },
            maxLength: { value: 20, message: "Maximum 20 characters allowed" },
            pattern: {
              value: /^[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$/,
              message: "Invalid username",
            },
          })}
        />
      </div>
      {errors.username && <p>{errors.username.message}</p>}
      <div className="form-group">
        {/* Email regex explanation:
              1. Local part: letters, numbers, dots, underscores, percent, plus, and hyphens (one or more)
              2. Domain name: letters, numbers, dots, and hyphens (one or more)
              3. Top-level domain: letters only, 2 or more characters
        */}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is invalid",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div className="form-group">
        {/* Password regex explanation:
              1. Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
        */}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val) =>
              val === getValues("password") || "Passwords do not match",
          })}
        />
      </div>
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <span>Forgot Password?</span>
      <span onClick={() => toggleMode("login")}>Already have an account?</span>
      <button type="submit">Sign In</button>
    </form>
  );
};
