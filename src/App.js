import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./components/chat/Chat";
import SignIn from "./components/sign-in/SignIn";

function App() {
  {/* This is the base layout */}
  return (
    <div className="base-color">
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