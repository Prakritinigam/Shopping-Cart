import {memo} from 'react';
function ContactUs(props) {
    console.log("from ContactUs");
    return <footer>{props.info()}</footer>
}

export default memo(ContactUs);