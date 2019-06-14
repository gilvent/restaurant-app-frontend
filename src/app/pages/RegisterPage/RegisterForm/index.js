import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';

class RegisterForm extends Component {

    constructor(props){
        super(props);
    }
    renderInput = (field) => { 
        return (
            <div className="form-group dark-fg">
                <label style={{fontSize:"80%"}}>{field.label}</label>
                <input {...field.input} 
                        type={field.type} className="form-control" 
                        placeholder={field.placeholder} />
            </div>
        );
    }

    render(){
        const {handleSubmit} = this.props;
        return (
            <form autoComplete="off" style={{width:"100%",textAlign:"left"}}>
                <div className="col-md-12">
                    <Field name="email" component={this.renderInput}    
                           label="Email" 
                           placeholder="Enter Email"                 
                           type="email"/>  
                </div>
                <div className="col-md-12">
                    <Field name="username" component={this.renderInput}
                           label="Username"
                           placeholder="Enter Username"
                           type="text"/>
                </div>
                <div className="col-md-12">
                    <Field name="password" component={this.renderInput}
                           label="Password"
                           placeholder="Password"
                           type="password"/>
                </div>
                
                <div className="col-md-12">
                    <button type="submit" className="btn btn-secondary btn-block"
                            onClick={handleSubmit}>Register</button>
                </div>
            </form>
        )
    }
}

RegisterForm = reduxForm({
    form: 'RegisterForm' 
  })(RegisterForm);

export default RegisterForm;