import React from 'react';

const AuthContext = React.createContext();

const AuthProvider = (props) => {
  const data = {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || {}
  }

  const login = (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/login";
    const { email, password } = e.target.elements;
    const credentials = `email=${email.value}&password=${password.value}`;

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: credentials
    })
      .then(res => res.json())
      .then(response => {
        const { user, token } = response;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        location.reload();
      })
      .catch(err => console.log(err));
  }

  const register = (e) => {
    e.preventDefault();
    const url = "http://localhost:3000/signup";
    const { email, password } = e.target.elements;
    const credentials = `email=${email.value}&password=${password.value}`;

    fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: credentials
    })
      .catch(err => console.log(err));
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    location.reload();
  }

  return (
    <AuthContext.Provider value={{data, login, logout, register}} {...props} />
  )
}

const useAuth = () => React.useContext(AuthContext);

export {AuthProvider, AuthContext, useAuth }
