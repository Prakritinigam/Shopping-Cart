import React, { Suspense } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
const OrderPlaced = React.lazy(() => import('./components/OrderPlaced'));
const Main = React.lazy(() => import('./components/Main'));
const NotFound = React.lazy(() => import('./components/NotFound'));
const SignIn = React.lazy(() => import('./components/SignIn'));
const Product = React.lazy(() => import('./components/Product'))

//Lazy loading for code splitting
function App() {

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/ordered" component={OrderPlaced} />
            <Route path="/signIn" component={SignIn} />
            <Route path="/prodDetails" component={Product} />
            <Route path="/*" component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;