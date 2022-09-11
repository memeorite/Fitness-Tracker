import React from 'react';

const Profile = ({ user }) => {
    const messages = user.messages;
    const userID = user._id;

    return (
        <div>
            <div>
                <h1>Your Messages</h1>
                {
                    messages && messages.map(message => {
                        const fromUserID = message.fromUser._id;
                        const { username } = message.fromUser;
                        const { title } = message.post;

                        if (userID !== fromUserID) {
                            return (
                                <div key={message._id}>
                                    <p>From User: {username}</p>
                                    <p>Message: {message.content}</p>
                                    <p>Post Reference: {title}</p>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Profile;