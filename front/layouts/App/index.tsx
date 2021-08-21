import React from 'react';
import loadable from '@loadable/component';
import { Switch, Route, Redirect } from 'react-router-dom';

const LogIn = loadable(() => import('@pages/LogIn'));
const SignUp = loadable(() => import('@pages/SignUp'));
const Main = loadable(() => import('@pages/Main'));
// const House = loadable(() => import('@pages/House'));
const LandAnalyzation = loadable(() => import('@pages/LandAnalyzation'));
const News = loadable(() => import('@pages/News'));
const Favorite = loadable(() => import('@pages/Favorite'));

const App = () => {
    return (
        <Switch>
            <Redirect exact path="/" to="/login" />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/main" component={Main} />
            {/*<Route path="/house" component={House} />*/}
            <Route path="/landAnalyzation" component={LandAnalyzation} />
            <Route path="/news" component={News} />
            <Route path="/favorite" component={Favorite} />
        </Switch>
    )
}

export default App;