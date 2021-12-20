import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import firebase from 'firebase/app';
const Chats = () => {
    
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    console.log(user);
    const handleLogout = async () => {
        await auth.signOut();

        document.location.href = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://www.example.com";
        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })
    }

    useEffect(() => {
        
        if (!user) {
            history.push('/');
            return;
        }

        axios.get("https://api.chatengine.io/users/me/", {
            headers: {
                "project-id": "32d53844-f7d1-4c6d-bf07-1053d1962412",
                "user-name": user.email,
                "user-secret": user.uid
                
            }
        })
            .then(() => {
                setLoading(false);

            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', user.email);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);

                        axios.post("https://api.chatengine.io/users/",
                            formdata,
                            { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY} }
                        )
                            .then(() => setLoading(false))
                            .catch((error) => console.log(error))
                    })
            })
    }, [user, history]);


     //if(!user || loading) return <div/>;

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    ChatTime
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID="32d53844-f7d1-4c6d-bf07-1053d1962412"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}

export default Chats;
