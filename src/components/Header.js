import React from "react";

function Header({ logout }) {
  return (
    <header className="Header">
      <div className="Logo">Exercise Five</div>
      <nav>
        <a href="/">Login</a>
        <a href="/create">CreateUser</a>
        <a href="/user/id">User Profile</a>
        <a onClick={() => logout()}>Log out</a>
      </nav>
    </header>
  );
}

export default Header;
