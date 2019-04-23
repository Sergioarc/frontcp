import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

// Request
import { login } from './../../request/request';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    }
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event)  => {
    event.preventDefault();
    const data = {
      'username': this.state.username,
      'password': this.state.password,
    };
    const loginResponse = await login(data);
    if (loginResponse.status === 'OK' && loginResponse.data.token !== undefined){
      localStorage.setItem("token", loginResponse.data.token);
      this.props.history.push('/informationcp')
    }else{
      this.setState({
        error: "Tu usuario o contraseña son incorrectos",
      }, () => {
        setTimeout(()=>{
          this.setState({
            error: '',
          })
        }, 3000);
      });
    }
  }

  render() {
    return (
      <div className="container center">
        <h1> Ingresa al sistema</h1>
        { this.state.error !== '' ?
          <Alert color="secondary">
            {this.state.error}
          </Alert> : null
        }
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleUsername">Usuario</Label>
            <Input type="username" name="username" id="username" placeholder="Ingresa tu usuario" onChange={this.handleInputChange} required/>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Contraseña</Label>
            <Input type="password" name="password" id="password" placeholder="Ingresa tu contraseña" onChange={this.handleInputChange} required/>
          </FormGroup>
          <Button type="submit">Iniciar sesion</Button>
        </Form>
      </div>
    );
  }
}

// TODO: PropTypes

export default Login;