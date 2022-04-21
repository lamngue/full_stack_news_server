import axios from "axios";

const getAxiosInstance = () => {
    return axios.create({
        baseURL: "http://localhost:3001/",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    });
};

export const modifyContent = (content) => {
    return dispatch => {
        dispatch({
            type: "MODIFY_CONTENT",
            payload: String(content)
        })
    }
}

export const fetchNews = (extraHeaders = {}) => {
    return async dispatch => {
        const results = await getAxiosInstance().get(
            `/news/`,
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
            `/news/`, news,
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