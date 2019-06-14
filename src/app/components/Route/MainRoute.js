import React, {Component} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import MainLayout from 'app/layouts/MainLayout';
import authSelectors from 'app/redux/selectors/auth';
import authActions from 'app/redux/actions/auth';

class MainRoutes extends Component {

    render(){
        const {component : Component,...props} = this.props;
        return (
            <Route {...props} render={ matchProps => (
                props.IsLoggedIn ?
                (<MainLayout>
                    <div>
                        <Component {...matchProps}></Component>
                    </div>
                </MainLayout>)
                :
                (<Redirect to={{pathname: '/login', state: { from: matchProps.location }}}/>)
            )} />
        )
    }
}


const mapStateToProps = (state) => {
    return {
        IsLoggedIn : authSelectors.getIsLoggedIn(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        VerifyToken : (redirectionUrl) => dispatch(authActions.VerifyToken(redirectionUrl))
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MainRoutes));