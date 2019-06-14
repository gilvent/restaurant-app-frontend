import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import userActions from 'app/redux/actions/user';
import authSelectors from 'app/redux/selectors/auth';

import RegisterForm from './RegisterForm';
import './RegisterPage.scss';

class RegisterPage extends Component {

    handleSubmit = (registerForm) => {
        const { email, username, password } = registerForm;
        this.props.CreateUser(email,username,password);
    }

    render(){
        const {RedirectionUrl} = this.props;
        const redirectTo = RedirectionUrl || "/browse";
        return (
            <div className="container">
                {
                    this.props.IsLoggedIn ?
                    <Redirect to={redirectTo}/>
                    :
                    <div className="register-panel-container ">
                        <div className="row middle-content">
                            <div className="col-md-12">
                                Register New Account
                            </div>
                            <RegisterForm onSubmit={this.handleSubmit}></RegisterForm>
                            <div className="col-md-12">
                                    <small className="sign-in-text">
                                        Already have an account?&nbsp;
                                        <Link className="sign-in-link" to="/login">Login</Link>
                                    </small>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
            
        )
    }
}

function mapStateToProps(state){
    return {
        IsLoggedIn : authSelectors.getIsLoggedIn(state),
        RedirectionUrl : state.auth.redirectionUrl
    }
}

function mapDispatchToProps(dispatch){
    return {
        CreateUser : (email,username,password) => dispatch(userActions.CreateUser(email,username,password)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RegisterPage);