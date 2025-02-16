import ReactDOM from 'react-dom';
import {memo} from 'react';

function Copyright() {
    console.log("From Copyright");
    return(
        ReactDOM.createPortal(
        <footer>Copyright © 2021 Shoping Cart</footer>,
        document.getElementById('portal-root'))
    );
}

export default memo(Copyright);