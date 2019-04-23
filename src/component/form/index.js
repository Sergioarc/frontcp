import React from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import map from 'lodash/map';
import PrivateRoute from './../../utils/privateRoute';

// Utils
import { processResponse } from './../../utils/utilsFunctions';

// Request
import { fetchInfoCP } from './../../request/request';

class FormCP extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: '',
      success: '',
      estados: [],
      municipios: [],
      colonias: [],
    }
  }

  handleInputChange = async (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });

    if (name === 'cp' && value.length === 5){
      const respCP = await fetchInfoCP(localStorage.getItem("token"), { cp: value});
      if (respCP.status === 'ERROR' || respCP.status === 'error'){
        if (respCP.code === '401'){
          this.setState({
            error: respCP.msg,
          }, () => {
            setTimeout(()=>{
              this.setState({
                error: '',
              })
              this.props.history.push('/login')
            }, 3000);
          })
        }
        if (Array.isArray(respCP.data)){
          this.setState({
            error: respCP.data[0].message,
          }, () => {
            setTimeout(()=>{
              this.setState({
                error: '',
              })
            }, 3000);
          })
        }
      }else{
        if(respCP.data.length === 0){
          this.setState({
            success: 'No se ha encontrado ese CP, por favor ingrese los datos manualmente',
          }, () => {
            setTimeout(()=>{
              this.setState({
                success: '',
              })
            }, 5000);
          })
        }else{
          setTimeout(()=>{
            this.setState({
              success: '',
            })
          }, 5000);
        }
      }
      const respProces = processResponse(respCP.data);
      this.setState({
        estados: respProces.estados,
        municipios: respProces.municipios,
        colonias: respProces.colonias,
      })
    }
  }



  handleSubmit = async (event)  => {
    event.preventDefault();
    this.setState({
      success: "Se han guardado los datos correctamente",
    }, () => {
      setTimeout(()=>{
        this.setState({
          success: '',
        })
      }, 3000);
    });
  }

  render() {
      return (
        <PrivateRoute path="/informationcp" isValidation={localStorage.getItem("token") !== undefined && localStorage.getItem("token") !== ''} pathURL="/login">
          <div className="container center">
            <h1> Buscador de direcciones</h1>
            { this.state.error !== '' ?
              <Alert color="secondary">
                {this.state.error}
              </Alert> : null
            }
            { this.state.success !== '' ?
              <Alert color="success">
                {this.state.success}
              </Alert> : null
            }
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="exampleCP">CP</Label>
                <Input type="cp" name="cp" id="cp" placeholder="Ingresa el código postal" onChange={this.handleInputChange} required/>
              </FormGroup>
              <FormGroup>
                {this.state.estados.length < 1 ? (
                    <React.Fragment>
                      <Label for="exampleCP">Estado</Label>
                      <Input type="text" name="estado" id="estado" placeholder="Ingresa el estado" onChange={this.handleInputChange} required/>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Label for="exampleEstate">Estado</Label>
                      <Input type="select" name="stateSelect" id="stateSelect" onChange={this.handleInputChange} required>
                        { map(this.state.estados, (v) => {
                          return <option key={v}>{v}</option>
                        })}
                      </Input>
                    </React.Fragment>
                  )
                }
              </FormGroup>
              <FormGroup>
                {this.state.municipios.length < 1 ? (
                    <React.Fragment>
                      <Label for="exampleCP">Delegación / Municipio</Label>
                      <Input type="text" name="municipio" id="municipio" placeholder="Ingresa el municipio" onChange={this.handleInputChange} required/>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Label for="exampleEstate">Delegación / Municipio</Label>
                      <Input type="select" value="2" name="delSelect" id="delSelect" onChange={this.handleInputChange} required>
                        { map(this.state.municipios, (v) => {
                          return <option key={v}>{v}</option>
                        })}
                      </Input>
                    </React.Fragment>
                  )
                }
              </FormGroup>
              <FormGroup>
                {this.state.colonias.length < 1 ? (
                    <React.Fragment>
                      <Label for="exampleCP">Colonia</Label>
                      <Input type="text" name="colonia" id="colonia" placeholder="Ingresa la colonia" onChange={this.handleInputChange} required/>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Label for="exampleEstate">Colonia</Label>
                      <Input type="select" name="coloniaSelect" id="coloniaSelect" onChange={this.handleInputChange} required>
                      { map(this.state.colonias, (v) => {
                        return <option key={v}>{v}</option>
                      })}
                      </Input>
                    </React.Fragment>
                  )
                }
              </FormGroup>
              <FormGroup>
                <Label for="exampleStreet">Calle</Label>
                <Input type="text" name="street" id="strees" placeholder="Ingresa la calle" onChange={this.handleInputChange} required/>
              </FormGroup>
              <Button type="submit">Guardar</Button>
            </Form>
          </div>
        </PrivateRoute>
      );
  }
}

// TODO: PropTypes

export default FormCP;