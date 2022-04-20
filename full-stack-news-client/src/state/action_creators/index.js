import axios from "axios";

const getAxiosInstance = () => {
    return axios.create({
        baseURL: "http://localhost/",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
};

export const fetchNews = (extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(
            `/view-news/`,
            {
                headers: { ...extraHeaders },
            },
        );
        dispatch({
            type: "FETCH_NEWS",
            payload: results.data
        });
    };
}

export const addNews = (news, extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().post(
            `/view-news/`, news,
            {
                headers: { ...extraHeaders },
            },
        );
        dispatch({
            type: "ADD_NEWS",
            payload: results.data
        });
    };
}