import { Button, TextField } from '@mui/material';
import React from 'react';
import { Navigate } from "react-router-dom";
import './SignIn.css';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {user: '', hasUser: false};
    
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.setState({user: event.target.value});
    }

    handleSubmit(event) {
        console.log(this.state)
        event.preventDefault();
        if (this.state.user) {
            this.setState({hasUser:true});
            this.props.onSignIn(this.state.user)
        }
    }

    render() {
        let hasUser = this.state.hasUser
        return (
        <div className="content column center-center">
            <h1>Flash Chat</h1>
            <div className="column center panel">
            <form onSubmit={this.handleSubmit}>
                <div className='row mb-20'>
                    <TextField 
                        sx={{ input: { color: 'white' } }}
                        variant="outlined"
                        label="Usuário"
                        value={this.state.value} 
                        onChange={this.handleUserChange}
                        InputLabelProps={{
                            style: { color: '#fff' },
                          }}
                    />
                </div>
                <div className='row center-center'>
                    <Button type="submit" variant="contained">ENTRAR</Button>
                </div>
                {
                    hasUser &&  (<Navigate to="/chat" />)
                }
            </form>
            </div>
        </div>
      );
    }
}

export default SignIn;
