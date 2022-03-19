import React, { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { Navbar, Card, Button } from "react-bootstrap";
import AppContext from "../../context/AppContext";
import FloatingLabel from "../../components/FloatingLabel/FloatingLabel";
import "./home.css";
import ImageCards from "../../components/ImageCards/ImageCards";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const appContext = useContext(AppContext);
  const { listAllPosts, post, setPost, createPost } = appContext;

  useEffect(() => {
    async function fetchData() {
      const results = await listAllPosts();
      setData(results.data);
      setLoading(false);
    }

    fetchData();
  }, []);

  const handleInput = (input) => (e) => {
    setPost((obj) => ({ ...obj, [input]: e.target.value }));
  };

  const handleFileInput = (input) => (e) => {
    setPost((obj) => ({ ...obj, [input]: e.target.files[0] }));
  };

  return (
    <>
      {loading ? (
        <>
          <div className="loading-content">
            <ClipLoader size={150} color={"#17a2b8"} loading={loading} />
          </div>
        </>
      ) : (
        <>
          <div className="upload">
            <Card className="p-3 mt-3 text-center login-border">
              <FloatingLabel
                type="text"
                name="title"
                placeholder="Title"
                value={post.title}
                onChangeText={handleInput("title")}
                isActive={post.title.length > 0 ? true : false}
              />
              <FloatingLabel
                type="text"
                name="description"
                placeholder="Description"
                value={post.description}
                onChangeText={handleInput("description")}
                isActive={post.description.length > 0 ? true : false}
              />

              <div>
                <input type="file" onChange={handleFileInput("file")} />
              </div>
              <Button
                variant="info"
                onClick={createPost}
                style={{ width: "100%", "margin-top": "10px" }}
              >
                Enviar
              </Button>
            </Card>
          </div>

          <ImageCards data={data} />
        </>
      )}
    </>
  );
};
