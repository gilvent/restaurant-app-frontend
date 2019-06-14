import React, { Component } from 'react';
import { connect } from 'react-redux';

import authActions from 'app/redux/actions/auth';
import userSelectors from 'app/redux/selectors/user';
import authSelectors from 'app/redux/selectors/auth';

import Header from './Header';
import './MainLayout.scss';

class MainLayout extends Component {
    render(){
        const currentUser =  this.props.User(this.props.MyUsername);
        return (
            <div className="app-container">
                <Header username={this.props.MyUsername} onSignOut={this.props.SignOut}/>
                { this.props.children }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        IsLoggedIn : authSelectors.getIsLoggedIn(state),
        MyUsername : authSelectors.getMyUsername(state),
        User : (username) => userSelectors.getUserByUsername(username)(state)
    }
}

const mapDispatchToProps = (dispatch) => ({
    SignOut : () => dispatch(authActions.SignOut())
})

export default connect(mapStateToProps,mapDispatchToProps)(MainLayout);

