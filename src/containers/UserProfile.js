import React from "react";

function UserProfile({ userInformation }) {
  return (
    <div>
      <h1>User Profile</h1>
      <p>Email: {userInformation.email}</p>
      <p>Name: {userInformation.displayName}</p>
      <p>uid: {userInformation.uid}</p>
    </div>
  );
}

export default UserProfile;
