import { React, useCallback } from "react";
import LoginForm from "../components/LoginForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ setLoggedIn, setUserInformation }) {
  //maintain a single function instance between renderings:
  const loginUser = useCallback(
    (e) => {
      e.preventDefault(); //let us have more control over our form

      //currentTarget.email: targeting the input element
      const email = e.currentTarget.email.value;
      const password = e.currentTarget.password.value;

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          setLoggedIn(true);
          setUserInformation({
            email: user.email,
            displayNmae: user.displayName,
            uid: user.uid,
            accessToken: user.accessToken,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.warn({ errorCode, errorMessage });
        });
    },
    [setLoggedIn, setUserInformation]
  );

  return (
    <div>
      <LoginForm loginUser={loginUser} />
    </div>
  );
}

export default Login;
