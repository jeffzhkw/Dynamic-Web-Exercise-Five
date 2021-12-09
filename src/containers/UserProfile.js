import React from "react";

function UserProfile({ userInformation }) {
  //any user's profile
  return (
    <div className="pageWrapper">
      <h1>User Profile</h1>
      <p>Email: {userInformation.email}</p>
      <p>Name: {userInformation.displayName}</p>
      <p>uid: {userInformation.uid}</p>
    </div>
  );
}

export default UserProfile;
