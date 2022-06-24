import { createContext, useState, useEffect } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
    const [likedposts, setLikes] = useState(
        JSON.parse(localStorage.getItem('likedposts')) || []
    );

    //store the likes(liked photos id) in the local storage
    useEffect(() => {
        localStorage.setItem('likedphotos', JSON.stringify(likedposts));
    }, [likedposts]);

    const uniqueLikes = (photoId) => {
        if (!likedposts.includes(photoId))
            setLikes((prevLikes) => [...prevLikes, photoId]);
    };

    const updateLikedPhotos = (likeState, photoId) => {
        likeState
            ? uniqueLikes(photoId)
            : setLikes((prevLikes) => prevLikes.filter((id) => id !== photoId));
    };
    return (
        <LikeContext.Provider value={{ likedposts, updateLikedPhotos }}>
            {children}
        </LikeContext.Provider>
    );
};

export default LikeContext;
