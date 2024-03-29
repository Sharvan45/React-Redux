import React, { Component } from 'react';

import Component1 from './functional/component1';
import ProtectedRoute from './functional/protectedroute';

import Container1 from './Customer/container1';
import Header from './Customer/header';
import history from './Utils/history';
import Profile from './Customer/profile';
import Callback from './functional/callback'
import { Router, Route, Switch, Redirect } from 'react-router';
import Auth from './Utils/auth';
import AuthCheck from './Utils/auth_check';
import UnauthRedirect from './functional/unauthredirect';
import { connect } from 'react-redux';
import * as ACTIONS from './store/actions/actions'
import HooksContainer1 from './hooks/hooks_container1';
import HooksForm from './hooks/hooks_forms'

const auth = new Auth();

const handleAuthentication = (props) => {
    if (props.location.hash) {
        auth.handleAuth();
    }
};

const PrivateRoute = ({ component: Component, auth }) => (
    <Route render={props => auth.isAuthenticated() === true ?
        <Component auth={auth} {...props} /> :
        <Redirect to={{ pathname: '/redirect' }} />
    }
    />
)

class Routes extends Component {
    componentDidMount() {
        if (auth.isAuthenticated()) {
            this.props.login_success();
            auth.getProfile();
            setTimeout(() => { this.props.add_profile(auth.userProfile) },2000);
        } else {
            this.props.login_failure();
            this.props.remove_profile();
        }
    }
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header auth={auth} />
                        <Switch>
                            <Route exact path='/' render={() => <Container1 auth={auth} />} />
                            <Route path='/authcheck' render={() => <AuthCheck auth={auth} />} />
                            <Route path='/redirect' component={UnauthRedirect} />
                            <Route path='/callback' render={(props) => { handleAuthentication(props); return <Callback /> }} />
                            <Route path="/component/:id" render={(props) => <Component1 {...props} />} />
                            <Route path='/hookscontainer' component={HooksContainer1} />
                            <Route path='/hooksform' component={HooksForm} />
                            <PrivateRoute path='/privateroute' auth={auth} component={ProtectedRoute} />
                            <PrivateRoute path='/profile' auth={auth} component={Profile} />
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login_success: () => dispatch(ACTIONS.login_success()),
        login_failure: () => dispatch(ACTIONS.login_failure()),
        add_profile: (profile) => dispatch(ACTIONS.add_profile(profile)),
        remove_profile: () => dispatch(ACTIONS.remove_profile()),
    }
}

export default connect(null,mapDispatchToProps)(Routes);