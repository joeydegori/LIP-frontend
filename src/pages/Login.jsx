import { useState, useContext } from 'react';
import axios from 'axios';
//context
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import blueflower from '../images/blueflower.png';
import pinkflower from '../images/pinkflower.png';

const Login = () => {
    const defaultFormData = {
        username: '',
        password: '',
    };
    //Getting setUser function from UserContext to update the of user
    const { user, setUser } = useContext(UserContext);
    //This function will help us to navigate between routes
    const navigateTo = useNavigate();

    const [loginState, setLoginState] = useState('Login');

    const [formData, setFormData] = useState(defaultFormData);

    const [isLoading, setIsLoading] = useState(false);

    //Updating the user value from input field
    const changeHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const submitFormData = async () => {
        try {
            // console.log({ isLoadingBefore: isLoading });
            setIsLoading(true);
            // console.log({ isLoadingAfter: isLoading });
            const { data } = await axios.post(
                `https://life-in-photos-2022.herokuapp.com/${loginState}`,
                formData
            );
            // console.log({ data });
            setUser(() => data);
            localStorage.setItem('token', JSON.stringify(data.token));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await submitFormData();
        navigateTo('/');
    };

    const logoutHandler = (e) => {
        setUser(() => null);
        localStorage.removeItem('token');
    };

    const buttonLettersStyle = {
        color: '#fbf9f2',
    };

    const blueCorner = {
        height: '300px',
        weight: '300px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '-270px',
        transform: 'rotate(-20deg)',
    };

    const pinkRightMiddle = {
        display: 'flex',
        marginLeft: '785px',
        marginTop: '100px',
        transform: 'rotate(20deg)',
    };
    const blueCorner2 = {
        height: '300px',
        weight: '300px',
        display: 'flex',
        alignItems: 'center',
        marginTop: '-10px',
        transform: 'rotate(-20deg)',
    };

    const pinkRightMiddle2 = {
        display: 'flex',
        marginLeft: '760px',
        marginTop: '30px',
        transform: 'rotate(20deg)',
    };
    console.log({ isLoading });

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    return user ? (
        <div>
            <button className='logoutButton' onClick={logoutHandler}>
                Logout
            </button>
            <img style={blueCorner2} src={blueflower} />
            <img style={pinkRightMiddle2} src={pinkflower} />
        </div>
    ) : (
        <div>
            <h1 className='loginState'>{loginState}</h1>
            {/* <p style={buttonLettersStyle}>Please Register/Login</p> */}
            <button
                className='loginButton'
                onClick={() => setLoginState('Login')}
            >
                Login
            </button>
            <button
                className='loginButton'
                onClick={() => setLoginState('Register')}
            >
                Register
            </button>
            <form onSubmit={submitHandler}>
                <label className='userDets'>Username: </label>
                <input
                    className='boxUserDets'
                    type='text'
                    name='username'
                    onChange={changeHandler}
                    value={formData.username}
                />
                <label className='userDets'>Password: </label>
                <input
                    className='boxUserDets'
                    type='text'
                    name='password'
                    onChange={changeHandler}
                    value={formData.password}
                />
                <button className='submitLogin'>Submit</button>
                <img style={blueCorner} src={blueflower} />
                <img style={pinkRightMiddle} src={pinkflower} />
            </form>
        </div>
    );
};

export default Login;
