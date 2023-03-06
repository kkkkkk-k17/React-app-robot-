import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../Context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = event => {
        event.preventDefault()
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <MyInput placeholder="your login"/>
                <MyInput placeholder="your password"/>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};

export default Login;