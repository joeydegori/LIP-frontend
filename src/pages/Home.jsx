import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import blueflower from '../images/blueflower.png';
import pinkflower from '../images/pinkflower.png';
import yellowflower from '../images/yellowflower.png';

const Home = () => {
    const { user } = useContext(UserContext);

    const noUserStyle = {
        color: '#fbf9f2',
        fontWeight: 'bold',
    };

    const borderStyle = {
        color: '#fbf9f2',
        fontWeight: 'bold',
        border: '2px',
        borderStyle: 'solid',
        padding: '10px',
        position: 'absolute',
        top: '430px',
        right: '300px',
        // marginRight: '350px',
        // marginLeft: '350px',
        // marginTop: '350px',
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

    return user ? (
        <div>
            <h2 style={borderStyle}>
                Welcome, {user.username} to Life in Photos!
            </h2>

            <img style={blueCorner} src={blueflower} />
            <img style={pinkRightMiddle} src={pinkflower} />
        </div>
    ) : (
        <div>
            <h2 style={borderStyle}>
                Welcome to Life in Photos. Register or login to start!
            </h2>
            <img style={blueCorner} src={blueflower} />
            <img style={pinkRightMiddle} src={pinkflower} />
        </div>
    );
};
export default Home;

// const [photos, setPhotos] = useState([]);
// const [searchTerm, setSearchTerm] = useState('');
// //Requestiong all the photos from our database
// //authAxios is custom axios instance, it allows us to send Bearer tokens with the request
// //We are using authAxios here to prevent unauthorized user to view the photos list
// const getPhotos = async () => {
//     const { data } = await authAxios.get(`https://life-in-photos-2022.herokuapp.com/photos`);
//     setPhotos(() => data);
// };

// const changeHandler = (e) => {
//     setSearchTerm(e.target.value);
// };

// //This useEffect will execute getbooks function only one time when this page loads
// useEffect(() => {
//     try {
//         getPhotos();
//     } catch (error) {
//         console.error(error);
//     }
// }, []); //<-- No dependency, means it will execute only one time

/* {photos
                .filter((photo) =>
                    searchTerm.length > 0
                        ? photo.title
                              .toLocaleLowerCase()
                              .includes(searchTerm.toLocaleLowerCase())
                        : photo
                )
                .map((photo) => {
                    return (
                        <div key={photo._id}>
                            <img src={photo.imageUrl} alt='Photos' />
                            <p>
                                <button>
                                    <Link to={`/photos/${photo._id}`}>
                                        {photo.title}
                                    </Link>
                                    {console.log(photo._id)}
                                </button>
                            </p>
                        </div>
                    );
                })} */
