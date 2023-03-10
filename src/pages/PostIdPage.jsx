import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFeching";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({})
    const [comments,setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })
    const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data)

    })
    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    },[])
    return (
        <div>
            <h1>Opened post Nr. {params.id}</h1>
            {isLoading ? <Loader/> : <div>{post.title}</div>

            }
            <h1>Comments</h1>
            {isLoading ? <Loader/> : <div>{comments.map(comm =>
                <div style={{marginTop: '15px'}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>
            )}</div>

            }
        </div>
    );
};

export default PostIdPage;