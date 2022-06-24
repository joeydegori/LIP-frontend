import service from '../api/service';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Form = ({ formData, setFormData, submitHandler, changeHandler }) => {
    const [imageUrl, setImageUrl] = useState('');
    // ******** this function handles the file upload ********
    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);

        const uploadData = new FormData();

        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append('imageUrl', e.target.files[0]);

        service
            .uploadImage(uploadData)
            .then((response) => {
                console.log('response is: ', response);
                // response carries "fileUrl" which we can use to update the state
                setFormData(() => ({
                    ...formData,
                    imageUrl: response.fileUrl,
                }));
            })
            .catch((err) =>
                console.log('Error while uploading the file: ', err)
            );
    };

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Title: </label>
                <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={changeHandler}
                />
                <br />
                <input type='file' onChange={(e) => handleFileUpload(e)} />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default Form;
