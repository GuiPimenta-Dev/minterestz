import React, { useState, useEffect } from "react";
import axios from "axios";
import AppContext from "./AppContext";
import { useHistory } from "react-router-dom";

const AppState = (props) => {
  const baseUrl = "http://localhost:3333";

  const [login, setLogin] = useState({ email: "", password: "" });
  const [headers, setHeaders] = useState({
    Authorization: "",
  });

  const [post, setPost] = useState({ file: {}, title: "", description: "" });

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
      setHeaders({
        Authorization: "Bearer " + token,
      });
      return true;
    } catch (err) {
      setLogin({ email: "", password: "" });
      alert("Usuário ou senha inválidos");
      return false;
    }
  };

  const listAllPosts = async () => {
    const results = await axios.get(`${baseUrl}/posts`, {
      headers: headers,
    });
    return results;
  };

  const createPost = async () => {
    const fd = new FormData();
    fd.append("title", post.title);
    fd.append("description", post.description);
    fd.append("file", post.file);
    const multiPartHeader = headers;
    multiPartHeader["content-type"] = "'Content-Type: multipart/form-data";
    const results = await axios.post(`${baseUrl}/posts`, fd, {
      headers: multiPartHeader,
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
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
