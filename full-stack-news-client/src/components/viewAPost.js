import React from "react";
import { useParams } from "react-router";

const ViewAPost = () => {
  const { title } = useParams();

  return <h2>Hello</h2>;
};

export default ViewAPost;
