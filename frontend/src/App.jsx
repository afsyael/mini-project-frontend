import React from "react";
import Header from "./component/Header";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

// Main app
const App = () => {
  return (
    <>
      <Header/>
      <Login/>
      <Dashboard/>
    </>
  )
}

export default App;