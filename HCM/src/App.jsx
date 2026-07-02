import { useState } from "react";

import "./App.css";

import Sidebar from "./components/Sidebar/Sidebar";

import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <Sidebar/>

      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default App;