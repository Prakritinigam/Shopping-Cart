import React from 'react';
import {NavLink} from 'react-router-dom';

const withHOC = OriginalComponent => {
  class HOC extends React.Component {
    render() {
        return (
            <div style={{textAlign: 'center'}}>
             <OriginalComponent/>
                <NavLink to='/'>Shopping Cart</NavLink>
            </div>
        );
    }
  }
  return HOC;
}

export default withHOC;