import { useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import Form from '../components/Form';
import { authAxios } from '../customAxios/authAxios';
import { useNavigate } from 'react-router-dom';
import blueflower from '../images/blueflower.png';
import pinkflower from '../images/pinkflower.png';

const AddPhoto = () => {
    const defaultFormData = {
        title: '',
        imageUrl: '',
    };

    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState(defaultFormData);
    console.log({ formData });
    const navigateTo = useNavigate();

    const addNewPhoto = async () => {
        const { data } = await authAxios.post(
            `https://life-in-photos-2022.herokuapp.com/photos/newphoto`,
            formData
        );
        navigateTo('/photos');
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        try {
            addNewPhoto();
        } catch (error) {
            console.log(error);
        }
    };

    const h1Style = {
        color: '#fbf9f2',
        fontWeight: 'bold',
    };

    const blueCorner = {
        height: '300px',
        weight: '300px',
        display: 'flex',

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

    const pStyle = {
        color: '#fbf9f2',
        fontWeight: 'bold',
        margin: '10px',
    };

    return user ? (
        <div>
            <h1 style={h1Style}>Add Post</h1>
            <p style={pStyle}>Anything you post can be seen by every user!</p>
            <Form
                className='secondFormData'
                formData={formData}
                setFormData={setFormData}
                submitHandler={submitHandler}
                changeHandler={changeHandler}
            />
            <img style={blueCorner} src={blueflower} />
            <img style={pinkRightMiddle} src={pinkflower} />
        </div>
    ) : (
        <div></div>
    );
};
export default AddPhoto;
