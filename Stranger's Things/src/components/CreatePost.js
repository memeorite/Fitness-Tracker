import React, { useState } from 'react';
import { createPost } from '../api';

const CreatePost = ( { token, fetchposts, navigate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    
    const newPost = {
        title: 'Husband for sale!',
        description: `million-dollar life insurance policy`, 
        price: `$10`,
        location: `Fishing on a Lake`,
        willDeliver: false
    }

    async function addPost() {
        const result = await createPost(token, newPost)
        fetchposts();
        navigate(`/posts`)
        // if (result.success) {
        //     setTitle, setDescription, setPrice, setLocation(result.data.token)
        // } else {
        //     console.log(results.error.message)
        // }
        // console.log(result)
    }
    return(
        <form onSubmit={(event) => {
            event.preventDefault();
            addPost();
        }}>
            <label>Enter Title</label><br></br>
             <input
                type='text'
                onChange={(event) => setTitle(event.target.value)}
            />
            <label>Enter Description </label><br></br>
             <input
                type='text'
                onChange={(event) => setDescription(event.target.value)}
            />
            <label>Enter Price</label><br></br>
             <input
                type='text'
                onChange={(event) => setPrice(event.target.value)}
            />
            <label>Enter Location</label><br></br>
             <input
                type='text'
                onChange={(event) => setLocation(event.target.value)}
            />
            <input type="checkbox" >
                <label for="willDeliver">Will Deliver?</label><br></br>
            </input>
            <button type='submit'>Create a New Post</button>
        </form>
    )
}


export default CreatePost;