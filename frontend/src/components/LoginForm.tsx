type LoginFormProps = {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: (e: React.MouseEvent<HTMLButtonElement>) => void;
  toggleMode: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onFormChange,
  onLogin,
  toggleMode,
}) => {
  return (
    <form>
      <h1>Welcome to SlackClone!</h1>
      <h2>Communicate easily with your friends</h2>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" onChange={onFormChange} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={onFormChange} required />
      </div>
      <span>Forgot Password?</span>
      <span onClick={toggleMode}>Already have an account?</span>
      <button onClick={onLogin}>Sign In</button>
    </form>
  );
};
