import { useForm, type SubmitHandler } from "react-hook-form";

import type { LoginFormData } from "@/types/types";

type FormMode = "login" | "register" | "verify";

interface LoginFormProps {
  onSubmit: SubmitHandler<LoginFormData>;
  toggleMode: (formMode: FormMode) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  toggleMode,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
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
      </div>
      {errors.email && <p>{errors.email.message}</p>}
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
      </div>
      {errors.password && <p>{errors.password.message}</p>}
      <span>Forgot Password?</span>
      <span onClick={() => toggleMode("register")}>Dont have an account?</span>
      <button type="submit">Sign In</button>
    </form>
  );
};
