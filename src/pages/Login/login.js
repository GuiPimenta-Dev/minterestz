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
      history.push("/home");
    }
  };

  return (
    <>
      <h1>minterestz</h1>

      <div className="login-container">
        <Card className="login">
          <h2>LOGIN</h2>
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
          <Button className="btnLog" onClick={callApi}>
            Enviar
          </Button>
        </Card>
      </div>
    </>
  );
};
