import React, {Component} from 'react';
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';

import authActions from 'app/redux/actions/auth';
import authSelectors from 'app/redux/selectors/auth';

import LoginForm from './LoginForm';
import './LoginPage.scss';


class LoginPage extends Component {

    handleSubmit = (loginForm) =>{
        this.props.Login(loginForm.email,loginForm.password);
    }

    render(){
        //const { from } = this.props.location.state || { from: { pathname: '/browse'}}
        const {RedirectionUrl} = this.props;
        const redirectTo = RedirectionUrl && RedirectionUrl!="/login" && RedirectionUrl!="/register" ? 
                           RedirectionUrl : "/browse"
        return (
            <div className="container">
                {
                    this.props.IsLoggedIn ?
                    (<Redirect to={redirectTo} />)
                    :
                    (
                    <div className="landing-panel-container">
                        <div className="row">
                            <div className="col-md-12">
                                Welcome! <br></br>
                                Restaurant Collection App
                            </div>
                            <LoginForm onSubmit={this.handleSubmit}></LoginForm>
                            <div className="col-md-12">
                                    <small className="register-text">
                                        Does not have an account?&nbsp;
                                        <Link className="register-link" to="/register">Register</Link>
                                    </small>
                            </div>
                        </div>
                    </div>
                    )
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
        Login : (email,password) => dispatch(authActions.Login(email,password)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);