import React from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from '../views/LoginForm';

export default class LoginRouter extends React.Component {
    render() {
        return(
            <Router>
                <Stack key="root" hideNavBar>
                    <Scene initial key="login" component={Login} title="Login" />
                </Stack>
            </Router>
        )
    }
}      ``