type VerifyFormProps = {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVerify: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const VerifyForm: React.FC<VerifyFormProps> = ({
  onFormChange,
  onVerify,
}) => {
  return (
    <form>
      <h1>Welcome to SlackClone!</h1>
      <h2>Verify your account</h2>
      <div className="form-group">
        <label htmlFor="verificationCode">Verification Code</label>
        <input
          type="text"
          id="verificationCode"
          onChange={onFormChange}
          required
        />
      </div>
      <button onClick={onVerify}>Verify Code</button>
    </form>
  );
};
