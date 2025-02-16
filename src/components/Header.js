import React, { memo } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

function Header(props) {
  const history = useHistory();
  console.log("From Header", history);
  return (
    <header className="block row center">
      <div>
        <a href="#/">
          <h1>Shopping Cart</h1>
        </a>
      </div>
      <div>
        <a href="#/cart">
          Cart{' '}
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ''
          )}
        </a>
        {history.location.state ? `Hello ${history.location.state.user}` : <NavLink to="/signIn">Sign In</NavLink>}
      </div>
    </header>
  );
}

export default memo(Header);