import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { Button, Card } from "react-bootstrap";
import FloatingLabel from "../../components/FloatingLabel/FloatingLabel";
import { useHistory } from "react-router-dom";
import "./login.css";

export const Login = () => {
  const appContext = useContext(AppContext);
  const { login, setLogin, postLogin } = appContext;

  const handleInput = (input) => (e) => {
    setLogin((obj) => ({ ...obj, [input]: e.target.value }));
  };
  const history = useHistory();

  const callApi = async () => {
    const results = await postLogin();
    if (results === true) {
      setLogin({ email: null, password: null });
      history.push("/home");
    }
  };

  return (
    <>
      <div className="login-container">
        <Card className="p-3 mt-3 text-center login-border">
          <FloatingLabel
            type="text"
            name="email"
            placeholder="Email"
            value={login.email}
            onChangeText={handleInput("email")}
            isActive={login.email ? true : false}
          />
          <FloatingLabel
            type="password"
            name="password"
            placeholder="Password"
            value={login.password}
            onChangeText={handleInput("password")}
            isActive={login.password ? true : false}
          />
          <Button
            onClick={callApi}
            style={{
              marginTop: "20px",
              width: "100%",
              backgroundColor: "#7159c1",
              boxShadow: "0 0 0 0.25rem #7159c1",
              border: "0px solid",
            }}
          >
            Enviar
          </Button>
        </Card>
      </div>
    </>
  );
};
