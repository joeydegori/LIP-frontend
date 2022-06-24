import { useState } from 'react';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import Form from '../components/Form';
import { authAxios } from '../customAxios/authAxios';
import { useNavigate } from 'react-router-dom';

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

    return user ? (
        <div>
            <h1>Add Post</h1>
            <Form
                formData={formData}
                setFormData={setFormData}
                submitHandler={submitHandler}
                changeHandler={changeHandler}
            />
        </div>
    ) : (
        <div></div>
    );
};
export default AddPhoto;
