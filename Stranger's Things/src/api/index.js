const baseURL = 'https://strangers-things.herokuapp.com/api/2206-FTB-ET-WEB-PT/'

export const getPosts = async () => {
    try {
        const response = await fetch('${baseURL}/posts');
        const results = response.json();
        return(results);
    } catch(error) {
        console.log('error getting all posts')
    }
}
