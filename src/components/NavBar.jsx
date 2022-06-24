import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Navbar } from 'react-bootstrap';
import LikeContext from '../contexts/LikeContext';
import UserContext from '../contexts/UserContext';
import blueflower from '../images/blueflower.png';
import pinkflower from '../images/pinkflower.png';
import yellowflower from '../images/yellowflower.png';

const styles = {
    display: 'flex',
    justifyContent: 'space-around',
};

//Key difference between Link and NavLink is to hace access of this "isActive" object.
const linkStyle = {
    color: '#fbf9f2',
    textDecoration: 'none',
    fontFamily: 'Joan',
    fontSize: '15px',
    fontWeight: 'bold',
    margin: '20px',
    height: '20px',
};

const navbarColor = {
    display: 'flex',
    justifyContent: 'space-evenly',
    backgroundColor: '#b2c7ac',
    height: '80px',
    margin: '10px',
    borderStyle: 'solid',
    borderRadius: '30px',
    borderColor: 'white',
    borderWidth: '3px',
    borderColor: '#efeade',
    borderPaddingRight: '80px',
};

const imageStyle = {
    height: '50px',
    width: '50px',
    margin: '-45px',
    padding: '-10px',
};

const noUserImg = {
    height: '50px',
    width: '50px',
    margin: '-45px',
    padding: '-10px',
};

const NavBar = () => {
    const { likedposts } = useContext(LikeContext);
    const { user } = useContext(UserContext);

    return (
        <Navbar style={navbarColor}>
            <img style={imageStyle} src={blueflower} />
            {user ? (
                <NavLink to='addphoto' style={linkStyle}>
                    Post
                </NavLink>
            ) : (
                <></>
            )}
            {user ? (
                <NavLink to='photos/likedposts' style={linkStyle}>
                    Liked Posts
                </NavLink>
            ) : (
                <></>
            )}
            {user ? (
                <NavLink to='photos' style={linkStyle}>
                    Search
                </NavLink>
            ) : (
                <></>
            )}
            <NavLink to='/' style={linkStyle}>
                Home
            </NavLink>

            {user ? (
                <NavLink to='login' style={linkStyle}>
                    Logout
                </NavLink>
            ) : (
                <NavLink to='login' style={linkStyle}>
                    Login & Register
                </NavLink>
            )}

            {user ? (
                <NavLink to='profile' style={linkStyle}>
                    Profile
                </NavLink>
            ) : (
                <></>
            )}
            {user ? (
                <div>
                    <img style={imageStyle} src={blueflower} />
                    <img style={imageStyle} src={pinkflower} />
                </div>
            ) : (
                <div>
                    <img style={noUserImg} src={blueflower} />
                    <img style={noUserImg} src={pinkflower} />
                </div>
            )}
        </Navbar>
    );
};
export default NavBar;
