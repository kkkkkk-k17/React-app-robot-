import React, {useEffect, useRef, useState} from 'react';
import {usePosts} from "../hooks/usePosts";
import {useFetching} from "../hooks/useFeching";
import PostService from "../API/PostService";
import {getPageCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import PostForm from "../components/PostForm";
import {useObserver} from "../hooks/useObserver";
import MySelect from "../components/UI/select/MySelect";

function Posts() {
    const [posts, setPosts] = useState([])
    // const bodyInputRef = useRef();
    const [filter, setFilter] = useState({sort: '', query: ''})
    const [modal, setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    const lastElement = useRef();

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit))
    })
    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false);
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }
    const changePage = (page) => {
        setPage(page);
    }
    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit])

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1)
    })
    return (
        <div className="App">
            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Create post
            </MyButton>
            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue='number'
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'}
                ]}>

            </MySelect>
            {postError && <h1>Error ${postError}</h1>}
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Posts list 1'/>
            <div ref={lastElement}></div>
            {isPostsLoading && <div style={{display: 'flex ', justifyContent: 'center', marginTop: '50px'}}>
                <Loader/>
            </div>}
            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />
        </div>
    );
}

export default Posts;