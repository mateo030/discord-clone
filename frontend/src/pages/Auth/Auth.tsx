import { useState } from "react";
import "./style.css";

export const Auth: React.FC = () => {
  const [isRegisterForm, setIsRegisterForm] = useState<boolean>(false);

  return (
    <div className="container">
      {isRegisterForm ? (
        <>
          <form>
            <h1>Welcome to SlackClone!</h1>
            <h2>Create an account now</h2>
            <div className="name-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" required />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="firstName" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password</label>
              <input type="password" id="password" required />
            </div>
            <span>Forgot Password?</span>
            <span onClick={() => setIsRegisterForm(false)}>
              Already have an account?
            </span>
            <button>Sign In</button>
          </form>
        </>
      ) : (
        <>
          <form>
            <h1>Welcome to SlackClone!</h1>
            <h2>Communicate easily with your friends</h2>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>
            <span>Forgot Password?</span>
            <span onClick={() => setIsRegisterForm(true)}>
              Already have an account?
            </span>
            <button>Sign Up</button>
          </form>
        </>
      )}
    </div>
  );
};
