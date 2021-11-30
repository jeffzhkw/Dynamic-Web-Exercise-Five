import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
//Firebase
import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
import firebaseConfig from "./components/FirebaseConfig";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
//Pages import
import Login from "./containers/Login";
import CreateUser from "./containers/CreateUser";
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // Track if user is logged in
  const [loading, setLoading] = useState(true); // Check to see if there is any loading ... prevent multiple time submit
  const [userInformation, setUserInformation] = useState({}); //store userInfo in state.
  const [appInitialized, setAppInitialized] = useState(false);

  // Initialize Firebase
  useEffect(() => {
    initializeApp(firebaseConfig);
    setAppInitialized(true);
  }, []);

  useEffect(() => {
    if (appInitialized) {
      //check to see if User is logged in
      //user leads page, check their status
      //set state accordingly
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          console.log(uid);
          setUserInformation(user);
          setLoggedIn(true);
          // ...
        } else {
          // User is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
        setLoading(false);
      });
    }
  }, [appInitialized]);

  function logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUserInformation({});
        setLoggedIn(false);
      })
      .catch((error) => {
        console.ware(error);
      });
  }

  if (loading || !appInitialized) return null;

  return (
    <div className="App">
      {/* state might impact, not data */}
      <Header logout={logout} loggedIn={loggedIn} />
      <Router>
        <Routes>
          <Route
            path="/user/:id"
            element={
              loggedIn ? (
                <UserProfile userInformation={userInformation} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/create"
            element={
              !loggedIn ? (
                <CreateUser
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Login
                  setLoggedIn={setLoggedIn}
                  setUserInformation={setUserInformation}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
