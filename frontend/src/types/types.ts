export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type VerifyFormData = {
  email: string;
  verificationCode: string;
};
