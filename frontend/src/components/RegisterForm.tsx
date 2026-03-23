type RegisterFormProps = {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRegister: (e: React.MouseEvent<HTMLButtonElement>) => void;
  toggleMode: () => void;
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
      <div className="name-row">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" onChange={onFormChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" onChange={onFormChange} required />
        </div>
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
      <span onClick={toggleMode}>Already have an account?</span>
      <button onClick={onRegister}>Sign In</button>
    </form>
  );
};
