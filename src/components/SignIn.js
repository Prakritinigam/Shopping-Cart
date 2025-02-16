import { useRef, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
export default function SignIn() {
    const nameRef = useRef();
    const history = useHistory();
    // const [userName, setUsername] = useState(false);
    // const [password, setPassword] = useState(false);
    // const [valid, validate] = useState(true);
    const initialState = {
        userName: "",
        password: "",
        valid: true
    }
    const reducer = (state, action) => {
        console.log(action.payload, "action.payload");
        switch (action.type) {
            case 'INPUT NAME':
                return { ...state, userName: action.payload }
            case 'INPUT PASSWORD':
                return { ...state, password: action.payload }
            case 'CLICK':
                console.log(state, "STATE");
                if (state.userName === state.password) {
                    history.push({
                        pathname: '/',
                        state: { user: state.userName }
                    });
                   // history.push('./', "admin");
                    // <NavLink to='/'>Shopping Cart</NavLink>
                    return { ...state }
                } else {
                    nameRef.current.focus();
                    return { ...state, valid: false }
                }
            default:
                throw new Error("what's going on?");
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    // const onName = (e) => {
    //     return e.target.value === "admin" ? setUsername(true) : userName;
    // }
    // const onPassword = (e) => {
    //     return e.target.value === "admin" ? setPassword(true) : password;
    // }
    // const onsubmit = () => {
    //     console.log(userName);
    //     if (userName && password) {
    //         history.push('./', "admin");
    //     } else {
    //         nameRef.current.focus();
    //         validate(false);
    //     }
    // }

    return (
        <div>
            <label htmlFor="fname">Username:</label><br></br>
            <input type="text" ref={nameRef} id="fname" name="fname" onChange={(e) => dispatch({ type: 'INPUT NAME', payload: e.target.value })}></input>
            <br></br>
            <label htmlFor="password">Password:</label><br></br>
            <input type="password" id="password" name="password" onChange={(e) => dispatch({ type: 'INPUT PASSWORD', payload: e.target.value })}></input><br></br>
            {state.valid ? '' : 'Please enter correct credentials'}
            <button onClick={() => dispatch({ type: 'CLICK' })}>Submit</button>
        </div>
    );
}