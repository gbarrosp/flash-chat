import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        var self = this;

        this.state = {user: '', room: '1', message: '', channel: ''};
    
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleRoomChange = this.handleRoomChange.bind(this);
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageChannelChange = this.handleMessageChannelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.ws = new WebSocket("ws:192.168.18.71:8888/ws");
        this.ws.onopen = function(evt) { 
            console.log("Connection open ...\n")
        };
        this.ws.onmessage = function(evt){
            console.log(" New message..." + evt.data + '\n')
            console.log(self.handleMessageChannelChange(evt.data))
        };
    }
    
    handleUserChange(event) {
        this.setState({user: event.target.value});
    }
    
    handleRoomChange(event) {
        this.setState({room: event.target.value});
    }
    
    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }
    
    handleMessageChannelChange(message) {
        this.setState({channel: `${this.state.channel}${message}\n`});
    }
    
    handleSubmit(event) {
        this.ws.send(this.state.message)
        // this.handleMessageChannelChange(this.state.message);
        event.preventDefault();
    }

    render() {
        return (
        <div className="content column center">
            <div className="column center panel">
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label>
                        Usuário:
                    <input type="text" value={this.state.value} onChange={this.handleUserChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Sala
                    <select value={this.state.value} onChange={this.handleRoomChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                    </label>
                </div>
                <div>
                    <textarea className='chat' value={this.state.channel} readOnly={true}/>
                </div>
                <div>
                    <input type="text" onChange={this.handleMessageChange} />
                </div>
                <input type="submit" value="Enviar" />
            </form>
            </div>
        </div>
      );
    }
}

export default SignIn;
