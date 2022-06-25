// src/api/service.js

import axios from 'axios';

const service = axios.create({
    // make sure you use PORT = 5005 (the port where our server is running)
    baseURL: 'https://life-in-photos-2022.herokuapp.com',
    // withCredentials: true // => you might need this when having the users in the app
});

const errorHandler = (err) => {
    throw err;
};

const getPhotos = () => {
    return service
        .get('/photos')
        .then((res) => res.data)
        .catch(errorHandler);
};

const uploadImage = (file) => {
    return service
        .post('/upload', file)
        .then((res) => res.data)
        .catch(errorHandler);
};

const createPhoto = (newPhoto) => {
    return service
        .post('/photos', newPhoto)
        .then((res) => res.data)
        .catch(errorHandler);
};

export default {
    service,
    getPhotos,
    uploadImage,
    createPhoto,
};
