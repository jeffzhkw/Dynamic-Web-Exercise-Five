import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Firebase
import { initializeApp } from "firebase/app"; // Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
import firebaseConfig from "./components/FirebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//Pages import
import Login from "./containers/Login";
import CreateUser from "./containers/CreateUser";
import UserProfile from "./containers/UserProfile";
import Header from "./components/Header";

function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track if user is logged in
  const [loading, setLoading] = useState(true); // Check to see if there is any loading ... prevent multiple time submit
  const [userInformation, setUserInformation] = useState({}); //store userInfo in state.

  useEffect(() => {
    initializeApp(firebaseConfig); // Initialize Firebase
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
          setUserInformation(user);
          setLoggedIn(true);
          // ...
        } else {
          // User is signed out
          setUserInformation({});
          setLoggedIn(false);
        }
      });
      setLoading(false);
    }
  }, [appInitialized]);

  if (loading) return null;

  return (
    <div className="App">
      <Header /> {/* state might impact, not data */}
      <Router>
        <Routes>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route
            path="/create"
            element={
              <CreateUser
                setLoggedIn={setLoggedIn}
                setUserInformation={setUserInformation}
              />
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
