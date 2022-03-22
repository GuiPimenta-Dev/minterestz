import React, { useState } from "react";
import axios from "axios";
import AppContext from "./AppContext";

const AppState = (props) => {
  const baseUrl =
    "https://ec2-54-207-192-146.sa-east-1.compute.amazonaws.com:3334";

  const [login, setLogin] = useState({ email: null, password: null });

  const [post, setPost] = useState({});

  const postLogin = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${baseUrl}/signIn`,
        data: {
          email: login.email,
          password: login.password,
        },
        headers: { "Content-Type": "application/json" },
      });
      const { token } = response.data;
      sessionStorage.setItem("token", token);
      return true;
    } catch (err) {
      setLogin({});
      alert("Usuário ou senha inválidos");
      return false;
    }
  };

  const listAllPosts = async () => {
    const results = await axios.get(`${baseUrl}/posts`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    return results;
  };

  const deletePost = async (id) => {
    await axios.delete(`${baseUrl}/posts/${id}`, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
  };

  const createPost = async () => {
    const fd = new FormData();
    fd.append("title", post.title);
    fd.append("description", post.description);
    fd.append("file", post.file);
    const results = await axios.post(`${baseUrl}/posts`, fd, {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return results;
  };

  return (
    <AppContext.Provider
      value={{
        login,
        post,
        setPost,
        setLogin,
        postLogin,
        listAllPosts,
        createPost,
        deletePost,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
