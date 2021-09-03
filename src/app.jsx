import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDom from "react-dom";
import liff from "@line/liff";
import { Button, Col, Container, Row, Card } from "react-bootstrap";

const mainElement = document.getElementById("root");

const App = () => {
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState({});

  const myLiffId = "1656385430-j4VQZ5wo";
  useEffect(async () => {
    await liff.init({ liffId: myLiffId }).catch((err) => alert(err.message));
    if (liff.isInClient()) {
      setLogin(true);
      getUserProfile();
    } else {
      if (liff.isLoggedIn()) {
        setLogin(true);
        getUserProfile();
        getDecodedIDToken();
        //document.getElementById("btnLogIn").style.display = "none"
        //document.getElementById("btnLogOut").style.display = "block"
      } else {
        //document.getElementById("btnLogIn").style.display = "block"
        //document.getElementById("btnLogOut").style.display = "none"
      }
    }
  }, []);

  const getDecodedIDToken = async () => {
    const decode = await liff.getDecodedIDToken();
    console.log({ decode });
  };
  const getUserProfile = async () => {
    const profile = await liff.getProfile().catch((err) => alert(err.message));
    setProfile(profile);
    console.log({ profile });
  };

  function logOut() {
    liff.logout();
    window.location.reload();
  }
  function logIn() {
    liff.login({ redirectUri: window.location.href });
  }

  return (
    <Container className="d-flex justify-content-center mt-10">
      <Row style={{ margin: 20 }}>
        <Col className="">
          <Button variant="primary" onClick={() => logIn()} disabled={login}>
            Login
          </Button>
        </Col>
        <Col>
          <Button variant="danger" onClick={() => logOut()} disabled={!login}>
            Logout
          </Button>
        </Col>
      </Row>
      <Row style={{ margin: 20 }}>
        {login ? (
          <Col md={12} className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={profile.pictureUrl} />
              <Card.Body>
                <Card.Title>Name: {profile.displayName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  userId: {profile.userId}
                </Card.Subtitle>
                <Card.Text>Status: {profile.statusMessage}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <h1>Plase Login</h1>
        )}
      </Row>
    </Container>
  );
};

ReactDom.render(<App />, mainElement);
