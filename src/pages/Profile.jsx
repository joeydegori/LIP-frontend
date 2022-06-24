import UserContext from '../contexts/UserContext';
import { authAxios } from '../customAxios/authAxios';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import blueflower from '../images/blueflower.png';
import pinkflower from '../images/pinkflower.png';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);

    const getUser = async () => {
        const { data } = await authAxios.get(`http://localhost:5005/profile`);
        setUser(() => data);
    };

    const profileButton = {
        textDecoration: 'none',
        color: '#9baf95',
        fontFamily: 'Joan',
        fontSize: '14px',
        fontWeight: 'bolder',
    };

    const h1Style = {
        color: '#fbf9f2',
        fontWeight: 'bold',
    };

    const blueCorner = {
        height: '300px',
        weight: '300px',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '100px',
        right: '800px',
    };

    const pinkRightMiddle = {
        display: 'flex',
        position: 'absolute',
        top: '450px',
        right: '10px',
    };

    return (
        <div key={user._id}>
            <h3>
                <img src={user.imageUrl} />
            </h3>
            <h1 style={h1Style}>
                {user ? `Welcome ${user.username}!` : <></>}
            </h1>
            <p>
                <button className='profileDetails'>
                    <Link style={profileButton} to={user._id}>
                        View Profile Details{' '}
                    </Link>
                    {/* {console.log(user._id)} */}
                </button>
            </p>
            <img style={blueCorner} src={blueflower} />
            <img style={pinkRightMiddle} src={pinkflower} />
        </div>
    );
};

export default Profile;
