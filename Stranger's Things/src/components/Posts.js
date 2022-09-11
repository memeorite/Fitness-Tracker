import React from 'react';
import { Link } from 'react-router-dom';



const Posts = ({ posts }) => {

    return (
        <div id="outer div element">
            {
                posts.map((post) => {
                    const { description, location, price, title, _id, isAuthor } = post;
                    return (
                        <div key={_id}>
                            <h3>{title}</h3>
                            <p>Description: {description}</p>
                            <p>Price: {price}</p>
                            <p>Location: {location}</p>
                            {
                                isAuthor ? (
                                    <>
                                     <Link to={`/posts/edit-post/$(_id)`}>Edit</Link>
                                    </>    
                                ) : (
                                    <Link to={'/posts/${_id}'}>View</Link>
                                )
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
 // <>
                            {/* <button>Delete</button>
                            <button>Edit</button>
                            </>
                        ) : (
                            <button>View</button>
                            ) */}
export default Posts;