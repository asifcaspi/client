import { useEffect, useState} from 'react';
import axiosInstance from '../axios';
import { posts } from '../temp/posts';

const useFetchData = (url) => {
    const [appState, setAppState] = useState({
        loading: true,
        error: false,
        posts: null,
        next: null,
        previous: null
    }),
        search = new URLSearchParams(window.location.search).get('search');

    const getNextPage = async (e) => {
        const url = e.target.name === "next" ? appState.next : appState.previous;
        axiosInstance.get(url).then((res) => {
            const data = res.data;
            setAppState({ loading: false, error: false, posts: data, next: null, previous: null});
        }).catch(() => {
            setAppState({ loading: false, error: false, posts: posts, next: null, previous: null});
        });
    }

    const getInitialPage = async () => {
        setAppState({ loading: true, error: false, posts: posts, next: null, previous: null})
        axiosInstance.get(url,{
            params: {
                search: search
            }
        }).then((res) => {
                const data = res.data;
                console.log(data)
                setAppState({ loading: false, error: false, posts: data, next: null, previous: null});
        }).catch(() => {
            setAppState({ loading: false, error: false, posts: posts, next: null, previous: null});
        });
    }

    useEffect(() => {
        getInitialPage().catch(err => console.log(err));
    }, []);


    return {
        appState,
        getNextPage,
        search,
        getInitialPage
    };
};

export default useFetchData;
