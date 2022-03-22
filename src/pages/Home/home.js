import React, { useEffect, useState, useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import AppContext from "../../context/AppContext";
import "./home.css";
import ImageCards from "../../components/ImageCards/ImageCards";

export const Home = () => {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({});

  const appContext = useContext(AppContext);
  const { listAllPosts, post, setPost, createPost } = appContext;

  async function fetchData() {
    const results = await listAllPosts();
    setData(results.data);
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  async function callApi() {
    setLoading(true);
    await createPost();
    fetchData();
  }

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
            <ClipLoader size={150} color={"#fff"} loading={loading} />
          </div>
        </>
      ) : (
        <>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>Document</title>
              <link rel="stylesheet" href="style.css" />
            </head>
            <body>
              <header>
                <h1>minterestz</h1>
                <p>Upload a card to our database.</p>
              </header>
              <section class="form-section">
                <div class="form-wrapper">
                  <form>
                    <div class="input-block">
                      <label for="login-email">Title:</label>
                      <input
                        type="text"
                        id="title"
                        onChange={handleInput("title")}
                      />
                    </div>

                    <div class="input-block">
                      <label for="login-password">Description:</label>
                      <input
                        type="text"
                        id="description"
                        onChange={handleInput("description")}
                      />
                    </div>
                    <div class="input-block">
                      <label for="login-email">File:</label>

                      <input
                        type="file"
                        id="fileInput"
                        className="inputFile"
                        onChange={handleFileInput("file")}
                      />
                    </div>
                    <button
                      type="submit"
                      class="btn-login"
                      disabled={
                        post.title && post.description && post.file
                          ? false
                          : true
                      }
                      onClick={callApi}
                    >
                      Send
                    </button>
                  </form>
                </div>

                <h3>API pitcures</h3>
                <p>Check our database cards.</p>

                <div className="imageCardsLine">
                  <ImageCards
                    data={data}
                    setLoading={setLoading}
                    fetchData={fetchData}
                  />
                </div>
              </section>
            </body>
          </html>
        </>
      )}
    </>
  );
};
