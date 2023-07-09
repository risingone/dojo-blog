import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('yash');
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();
        const blog = {title, body, author }; 
        
        setIsPending(true);

        fetch('http://localhost:8000/blogs/',{
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
            navigate('/');
        })
    }
    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="blog-title">Blog title:</label>
                <input type="text" 
                    id="blog-title" 
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="blog-body">Blog body:</label>
                <textarea id="blog-body"
                     required
                     value={body}
                     onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label htmlFor="blog-author">Blog-author</label>
                <select id="blog-author"
                 value={author}
                 onChange={(e) => setAuthor(e.target.value)}
                 >
                    <option value="yash">yash</option>
                    <option value="prakash">prakash</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Adding blog...</button>}
            </form>
        </div>
     );
}
 
export default Create;