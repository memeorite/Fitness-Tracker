import React, { Fragment } from 'react';

const Posts = ({ posts }) => {

    return (
        <div id="outer div element">
            {
                posts.map((post) => {
                    const { description, location, price, title, _id } = post;
                    return (
                        <Fragment>
                            <div key={_id}>
                                <h3>{title}</h3>
                                <p>Description: {description}</p>
                                <p>Price: {price}</p>
                                <p>Location: {location}</p>
                            </div>
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default Posts;