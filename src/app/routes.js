import React, {Component} from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import authActions from 'app/redux/actions/auth';


import LoginRoute from 'app/components/Route/LoginRoute';
import MainRoute from 'app/components/Route/MainRoute';
import LoginPage from 'app/pages/LoginPage';
import RegisterPage from 'app/pages/RegisterPage';
import BrowsePage from 'app/pages/BrowsePage';
import MyCollectionPage from 'app/pages/MyCollectionPage';
import CollectionDetailPage from 'app/pages/CollectionDetailPage';

class Routes extends Component{
    componentWillMount(){
        this.props.VerifyToken(this.props.location.pathname)
    }
    componentDidUpdate(prevProps) {
        const previousPath = prevProps.location.pathname;
        if (this.props.location.pathname !== previousPath) {
            const redirectUrl = previousPath == "/login" || previousPath == "/register" 
                                ? this.props.RedirectionUrl
                                : previousPath;
            this.props.VerifyToken(redirectUrl)
        }
    }
    render(){
        return (
            <div>
                <LoginRoute path="/login" component={LoginPage}/>
                <LoginRoute path="/register" component={RegisterPage}/>
                <MainRoute exact path="/" component={()=> (<Redirect to="/browse"></Redirect>)}/>
                <MainRoute path="/browse" component={BrowsePage}/>
                <MainRoute path="/my-collections" component={MyCollectionPage}/>
                <MainRoute path="/:username/collection/:collectionId" component={CollectionDetailPage}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        RedirectionUrl : state.auth.redirectionUrl
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        VerifyToken : (redirectionUrl) => dispatch(authActions.VerifyToken(redirectionUrl))
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Routes));