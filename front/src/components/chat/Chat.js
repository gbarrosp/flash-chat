import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import './Chat.css';

class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {message: '', channel: '', user: this.props.user ? this.props.user : '' };
        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleMessageChannelChange = this.handleMessageChannelChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        var self = this;
        this.ws = new WebSocket("ws:172.26.0.1:8888/ws");
        this.ws.onopen = function(evt) {
            if (this.state && this.state.user) {
                self.handleMessageChannelChange(`${this.state.user} conectado`)
            }
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
        let now = new Date().toLocaleTimeString().slice(0,5)
        let message = `${now} ${this.state.user}: ${this.state.message}`
        this.ws.send(JSON.stringify({
            room: '0',
            message: message
        }))
        event.preventDefault();
    }

    render() {
        return (
        <div className="content column start-center">
            <h1>Flash Chat</h1>
            <div className="column center-center panel">
            <form onSubmit={this.handleSubmit}>
                <div>
                    <textarea className='chat' value={this.state.channel} readOnly={true}/>
                </div>
                <div className="row start-center">
                    <input type="text" onChange={this.handleMessageChange} />
                    <IconButton color="primary" type="submit">
                        <SendIcon/>
                    </IconButton>
                </div>
            </form>
            </div>
        </div>
      );
    }
}

export default Chat;
