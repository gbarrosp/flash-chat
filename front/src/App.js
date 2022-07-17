import React from 'react';
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Chat from "./components/chat/Chat";
import SignIn from "./components/sign-in/SignIn";

/* This is the base layout */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    };
  }

  handleUser = (user) => {
    this.setState({user: user})
  }

  render() {
    return (
      <div className="base-color">
        {/* Those are its children */}
        <Routes>
          <Route path="/" element={<SignIn onSignIn={this.handleUser} />} />
          {/* <Route path="salas" element={<ChatRooms />} /> */}
          <Route path="chat" element={<Chat user={this.state.user}/>} />
        </Routes>
      </div>
    );
  }
}

export default App;