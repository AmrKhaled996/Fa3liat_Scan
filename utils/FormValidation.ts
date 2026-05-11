type errors=({
    email:String|null,
    password:String|null
}|null)

export const validateLogin = ({email, password} :{email:string,password:string}) => {
  const errors:errors = {email:null,password:null};
  
  const emailval = email?.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailval) {
    errors.email  = "email is required"
  } else if (!emailRegex.test(emailval)) {
    errors.email = "invalid email";
  }

  const passwordval = password?.trim();
  const passwordMinLength = 6;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).+$/;

  if (!passwordval) {
    errors.password ="required password";
  } else if (passwordval.length < passwordMinLength) {
    errors.password = "must be at least 6 characters",( {
      length: passwordMinLength,
    });
  } else if (!passwordRegex.test(passwordval)) {
    errors.password = "password must contain at least one letter and  one number and one Capital letter and one special character";
  }

  
  // if(emailval ===null)
  return errors;
};
