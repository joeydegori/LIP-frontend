import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { authAxios } from '../customAxios/authAxios';
import Form from '../components/Form';
import LikeContext from '../contexts/LikeContext';
import UserContext from '../contexts/UserContext';
//react icons
import { FcLikePlaceholder } from 'react-icons/fc';
import { FcLike } from 'react-icons/fc';

const PhotoDetails = () => {
    const defaultFormData = {
        title: '',
        imageUrl: '',
    };

    const [formData, setFormData] = useState(defaultFormData);
    const [photo, setPhoto] = useState(null);
    const [editToggler, setEditToggler] = useState(false);
    const [likeToggler, setLikeToggler] = useState(false);
    const navigateTo = useNavigate();
    const { id } = useParams();
    const { user, setUser } = useContext(UserContext);

    //Getting likes(contains all liked books id) and updateLikedBooks function to add or delete book id
    const { likedposts, updateLikedPhotos } = useContext(LikeContext);

    const getPhotoDetails = async () => {
        const { data } = await authAxios.get(
            `https://life-in-photos-2022.herokuapp.com/photos/${id}`
        );
        setPhoto(() => data);
        setFormData(() => data);
    };

    const updatePhotoDetail = async () => {
        const { data } = await authAxios.post(
            `https://life-in-photos-2022.herokuapp.com/photos/${id}`,
            formData
        );
        setPhoto(() => data);
        setEditToggler(() => !editToggler);
    };

    const deletePhoto = async () => {
        const { data } = await authAxios.delete(
            `https://life-in-photos-2022.herokuapp.com/photos/${id}`
        );
        navigateTo('/photos');
    };

    const likeCheck = () => {
        //we add "photo" in the beginning just to make sure when the photo state is null, we dont want to execute setLikeToggler function. Basically its a short form of saying -> if(photo) {then do something here}
        photo &&
            user.likedposts &&
            setLikeToggler(() => user.likedposts.includes(photo._id));
    };

    useEffect(() => {
        likeCheck();
    }, [photo]); //<-- photo as a dependency means this useEffect will run at the very first time and also whenever the book state get changes.

    useEffect(() => {
        try {
            getPhotoDetails();
        } catch (error) {}
    }, []);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const deleteHandler = () => {
        try {
            deletePhoto();
        } catch (error) {
            console.error(error);
        }
    };

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            updatePhotoDetail();
        } catch (error) {
            console.log(error);
        }
    };

    const editHandler = (e) => {
        setEditToggler(() => !editToggler);
    };

    const setLiked = async () => {
        try {
            //axios call, setlike post route => user+photoid
            if (!likeToggler) {
                const { data } = await authAxios.post(
                    `https://life-in-photos-2022.herokuapp.com/photos/likedposts`,
                    { userID: user._id, photoID: photo._id }
                );
                setUser(() => data);
            } else {
                const { data } = await authAxios.post(
                    `https://life-in-photos-2022.herokuapp.com/photos/deleteposts`,
                    { userID: user._id, photoID: photo._id }
                );
                setUser(() => data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const likeHandler = (e) => {
        setLiked();
        setLikeToggler(() => !likeToggler);
        //this function will execute from the LikeContext, we are passing like state and the photo id as an argument.
        // updateLikedPhotos(!likeToggler, user.id, photo._id);
        // console.log(user._id, photo._id);
    };

    return user ? (
        <div>
            <h1>Photo Details</h1>
            {photo && !editToggler && (
                <div key={photo._id}>
                    <p>Title: {photo.title}</p>
                    <img src={photo.imageUrl} />
                </div>
            )}
            <button onClick={likeHandler}>
                {likeToggler ? <FcLike /> : <FcLikePlaceholder />}
            </button>
            <button onClick={editHandler}>Edit</button>
            {user.role === 'admin' && (
                <button onClick={deleteHandler}>Delete</button>
            )}
            {editToggler && (
                <div>
                    <Form
                        formData={formData}
                        submitHandler={submitHandler}
                        changeHandler={changeHandler}
                        editHandler={editHandler}
                    />
                    <button onClick={editHandler}>Cancel</button>
                </div>
            )}
        </div>
    ) : (
        <></>
    );
};

export default PhotoDetails;
