import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//components
import NavBar from './components/NavBar';

//pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Photos from './pages/Photos';
import AddPhoto from './pages/AddPhoto';
import PhotoDetails from './pages/PhotoDetails';
import LikedPosts from './pages/LikedPosts';
import UserDetails from './pages/UserDetails';

//providers
import { UserProvider } from './contexts/UserContext';
import { LikeProvider } from './contexts/LikeContext';
import ProtectedRoute from './routeGuard/ProtectedRoute';
import AdminRoute from './routeGuard/AdminRoute';

const App = () => {
    return (
        <BrowserRouter>
            <UserProvider>
                <LikeProvider>
                    <div className='App'>
                        <NavBar />
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path='profile/:id'
                                    element={<UserDetails />}
                                />
                                <Route path='photos' element={<Photos />} />

                                <Route path='profile' element={<Profile />} />
                                <Route
                                    path='photos/:id'
                                    element={<PhotoDetails />}
                                />
                                <Route
                                    path='photos/likedposts'
                                    element={<LikedPosts />}
                                />
                                {/* <Route element={<AdminRoute />}> */}
                                <Route path='addphoto' element={<AddPhoto />} />
                                {/* </Route> */}
                            </Route>
                            <Route path='login' element={<Login />} />
                        </Routes>
                    </div>
                </LikeProvider>
            </UserProvider>
        </BrowserRouter>
    );
};

export default App;
