import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Chat from "./components/chat/Chat";
import SignIn from "./components/sign-in/SignIn";

function App() {
  return (
    <div className="App">
      {/* This is the base layout */}
      <h1>Flash Chat</h1>
      {/* Those are its children */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        {/* <Route path="salas" element={<ChatRooms />} /> */}
        <Route path="chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;