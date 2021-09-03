import React, { useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDom from "react-dom";
import liff from "@line/liff";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
const mainElement = document.getElementById("root");

const App = () => {
  const [login, setLogin] = useState(false);
  const [profile, setProfile] = useState({});
  const [decode, setDecode] = useState({});

  useLayoutEffect(() => {
    liff.ready.then(() => {
      if (liff.isInClient()) {
        if (liff.isLoggedIn()) {
          getUserProfile();
          getDecodedIDToken();
          setLogin(true);
        }
        if (liff.getOS() === "android") {
          logIn();
        }
      } else {
        if (liff.isLoggedIn()) {
          getUserProfile();
          getDecodedIDToken();
          setLogin(true);
        }
      }
    });

    liff.init({ liffId: process.env.LIFF_ID }, (suc) =>
      console.log({ suc }, (err) => console.log({ err }))
    );
  }, [login]);

  const getDecodedIDToken = async () => {
    const decode = await liff.getDecodedIDToken();
    setDecode(decode);
  };
  const getUserProfile = async () => {
    const profile = await liff
      .getProfile()
      .catch((err) => alert(`get profile ${err.message}`));
    setProfile(profile);
  };

  const logOut = () => {
    liff.logout();
    window.location.reload();
  };

  const logIn = () => {
    liff.login({ redirectUri: window.location.href });
  };

  return (
    <Container className="d-flex justify-content-center mt-10">
      {!liff.isInClient() && (
        <Row style={{ margin: 20 }}>
          <>
            <Col className="">
              <Button
                variant="primary"
                onClick={() => logIn()}
                disabled={login}
              >
                Login
              </Button>
            </Col>
            <Col>
              <Button
                variant="danger"
                onClick={() => logOut()}
                disabled={!login}
              >
                Logout
              </Button>
            </Col>
          </>
        </Row>
      )}
      <Row style={{ marginTop: 20 }}>
        {login ? (
          <Col md={12} className="d-flex justify-content-center">
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={profile.pictureUrl} />
              <Card.Body>
                <Card.Title>Name: {profile.displayName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  userId: {profile.userId}
                </Card.Subtitle>
                <Card.Text>
                  Status: {profile.statusMessage}
                  <hr />
                  Email: {decode.email}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          !liff.isInClient() && <h1>Plase Login</h1>
        )}
      </Row>
    </Container>
  );
};

ReactDom.render(<App />, mainElement);
