import axios from "axios";

const getAxiosInstance = () => {
  return axios.create({
    baseURL: "http://localhost:3001/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const modifyContent = (content) => {
  return (dispatch) => {
    dispatch({
      type: "MODIFY_CONTENT",
      payload: String(content),
    });
  };
};

export const fetchNews = (type, extraHeaders = {}) => {
  return async (dispatch) => {
    const results = await getAxiosInstance().get(`/news/${type}`, {
      headers: { ...extraHeaders },
    });
    dispatch({
      type: "FETCH_NEWS",
      payload: results.data,
    });
  };
};

export const fetchNewsDetail = (id, extraHeaders = {}) => {
  return async (dispatch) => {
    const results = await getAxiosInstance().get(`/news/detail/${id}`, {
      headers: { ...extraHeaders },
    });
    dispatch({
      type: "FETCH_NEWS_DETAIL",
      payload: results.data,
    });
  };
};

export const fetchCategories = (extraHeaders = {}) => {
  return async (dispatch) => {
    console.log("getting categories");
    const results = await getAxiosInstance().get(`/categories`, {
      headers: { ...extraHeaders },
    });
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: results.data,
    });
  };
};

export const clearNews = (extraHeaders = {}) => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_NEWS",
      payload: [],
    });
  };
};

export const addNews = (news, extraHeaders = {}) => {
  return async (dispatch) => {
    const results = await getAxiosInstance().post(`/news/`, news, {
      headers: { ...extraHeaders },
    });
    dispatch({
      type: "ADD_NEWS",
      payload: results.data,
    });
  };
};

export const editNews = ({ values, id }, extraHeaders = {}) => {
  return async (dispatch) => {
    const results = await getAxiosInstance().put(`/news/${id}`, values, {
      headers: { ...extraHeaders },
    });
    dispatch({
      type: "EDIT_NEWS",
      payload: results.data,
    });
  };
};

export const deleteNews = (id, type, extraHeaders = {}) => {
  return async (dispatch) => {
    await getAxiosInstance().delete(`/news/${id}`, {
      headers: { ...extraHeaders },
    });
    dispatch(fetchNews(type));
  };
};
