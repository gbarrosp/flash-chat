import React from 'react';
import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        var self = this;
        this.state = {message: '', channel: ''};
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageChannelChange = this.handleMessageChannelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.ws = new WebSocket("ws:192.168.18.71:8888/ws");
        this.ws.onopen = function(evt) { 
            this.setState({channel: `Conectado\n`});
        };
        this.ws.onmessage = function(evt){
            self.handleMessageChannelChange(evt.data)
        };
    }
    
    handleMessageChange(event) {
        this.setState({message: event.target.value});
    }
    
    handleMessageChannelChange(message) {
        this.setState({channel: `${this.state.channel}${message}\n`});
    }
    
    handleSubmit(event) {
        this.ws.send(this.state.message)
        event.preventDefault();
    }

    render() {
        return (
        <div className="content column center">
            <div className="column center panel">
            <form onSubmit={this.handleSubmit}>
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

export default Chat;
