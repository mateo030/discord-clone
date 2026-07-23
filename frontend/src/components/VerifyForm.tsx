import { useForm, type SubmitHandler } from "react-hook-form";

import type { VerifyFormData } from "@/types/types";

type VerifyFormProps = {
  onSubmit: SubmitHandler<VerifyFormData>;
  initialEmail?: string;
};

export const VerifyForm: React.FC<VerifyFormProps> = ({
  onSubmit,
  initialEmail,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyFormData>({ defaultValues: { email: initialEmail } });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register hidden email field so it's included in submission */}
      <input type="hidden" {...register("email")} />
      <div className="form-group">
        <label htmlFor="verificationCode">Verification Code</label>
        <input
          type="text"
          id="verificationCode"
          {...register("verificationCode", {
            required: "Verification Code is required",
            validate: (value) => value.length === 6 || "Must be 6 characters",
          })}
        />
      </div>
      {errors.verificationCode && <p>{errors.verificationCode.message}</p>}
      <button type="submit">Verify Code</button>
    </form>
  );
};
