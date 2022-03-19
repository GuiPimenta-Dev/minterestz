import React, { useEffect, useContext } from "react";
import AppContext from "../../context/AppContext";
import { Button, Card } from "react-bootstrap";
import FloatingLabel from "../../components/FloatingLabel/FloatingLabel";
import { useHistory } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
export const Login = () => {
  const appContext = useContext(AppContext);
  const { login, setLogin, postLogin } = appContext;
  const handleInput = (input) => (e) => {
    setLogin((obj) => ({ ...obj, [input]: e.target.value }));
  };
  const history = useHistory();
  function goBack() {
    history.push("/recent");
  }

  const callApi = async () => {
    const results = await postLogin();
    if (results === true) {
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
            placeholder="Usuário"
            value={login.email}
            onChangeText={handleInput("email")}
            isActive={login.email.length > 0 ? true : false}
          />
          <FloatingLabel
            type="password"
            name="password"
            placeholder="Senha"
            value={login.password}
            onChangeText={handleInput("password")}
            isActive={login.password.length > 0 ? true : false}
          />
          <Button variant="info" onClick={callApi} style={{ width: "100%" }}>
            Enviar
          </Button>
        </Card>
      </div>
    </>
  );
};
