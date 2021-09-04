import { useState, useContext } from "react";
import { authContext } from "../providers/AuthProvider.js";

// NOTE: THIS IS FOR DEMO PURPOSE ONLY. REAL LOGIN SHOULD NOT BE DONE THIS WAY!
export default function Login({ users }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(authContext);

  // Email + userID pairs:
  const userIDs = Object.keys(users);
  const emails = userIDs.map((el) => users[el].email);
  console.log(emails);
  const onEmailChange = function (event) {
    setEmail(event.target.value);
  };

  const onPasswordChange = function (event) {
    setPassword(event.target.value);
  };

  const onSubmit = function (event) {
    event.preventDefault();

    if (emails.includes(email)) {
      let userID = userIDs[emails.findIndex((el) => el === email)];
      console.log("inside Login Page userID is:", userID);
      login(userID);
    }
  };

  return (
    <div className="login">
      <form onSubmit={onSubmit}>
        <p>
          <input type="text" name="login" value={email} placeholder="Username" onChange={onEmailChange} />
        </p>
        <p>
          <input type="password" name="password" value={password} placeholder="Password" onChange={onPasswordChange} />
        </p>
        <p className="submit">
          <input type="submit" name="commit" value="Login" />
        </p>
      </form>
    </div>
  );
}
