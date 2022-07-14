import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Chat from "./components/chat/Chat";
import SignIn from "./components/sign-in/SignIn";

function App() {
  return (
    <div className="App">
      {/* This is the base layout */}
      <h1>Welcome to React Router!</h1>
      {/* Those are its children */}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

function Home() {
  return (
    <>
      <main>
        <h2>Welcome to the homepage!</h2>
        <p>You can do this, I believe in you.</p>
      </main>
      <nav>
        <Link to="/about">About</Link>
      </nav>
    </>
  );
}

function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;