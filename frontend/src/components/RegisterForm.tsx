type FormMode = "login" | "register" | "verify";

type RegisterFormProps = {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegister: (e: React.MouseEvent<HTMLButtonElement>) => void;
  toggleMode: (formMode: FormMode) => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onFormChange,
  onRegister,
  toggleMode,
}) => {
  return (
    <form>
      <h1>Welcome to SlackClone!</h1>
      <h2>Create an account now</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" onChange={onFormChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={onFormChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={onFormChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          onChange={onFormChange}
          required
        />
      </div>
      <span>Forgot Password?</span>
      <span onClick={() => toggleMode("login")}>Already have an account?</span>
      <button onClick={onRegister}>Sign In</button>
    </form>
  );
};
