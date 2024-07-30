import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../client/styles.css";
import Header from './Header.jsx'; 

const Dashboard = () => {
  const [shows, setShows] = useState([]);
  const ssid = document.cookie;
  console.log(ssid);

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  console.log(getCookie(ssid))

  useEffect(() => {
    const fetchUserShows = async () => {
      try {
        const response = await fetch(`/shows?${ssid}`);
        const result = await response.json();
        setShows(result);
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    };
    fetchUserShows();
  }, []);

  return (
    <Container>
      <Header title ='Currently Watching test Header' />
      <h1>Currently Watching</h1>
      <div className="shows-container">
        <Row>
          {Array.isArray(shows) && shows.length > 0 ? (
            shows.map((show) => (
              <Col key={show.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className="m-2">
                  <Card.Img variant="top" src={show.image} alt={show.title} className="card-img-top" />
                  <Card.Body>
                    <Card.Title>{show.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No shows found</p>
          )}
        </Row>
      </div>
      <div className="d-flex flex-column align-items-center mt-3">
        <div>Don't see your show?</div>
        <Button as={Link} to="/addshow" variant="primary" className="mt-2">
          +
        </Button>
      </div>
    </Container>
  );
};


export default Dashboard;





// *** OLD CODE (previous groups) ***
// const ShowSelection = () => {
//     return (
//         <CardGroup style={{display: "flex", justifyContent: "space-around", alignItems: "center"}}>
//         <Button style={{width: "100px"}}>
//         <Card className='bridgertonCard'>
//           <Card.Img variant="top" src="./client/assets/bridgerton.jpg"  alt='bridgerton-picture' style={{width: "100px"}}/>
//           <Card.Body>
//             <Card.Title>Bridgerton</Card.Title>
//             <Card.Text>
//               TBD
//             </Card.Text>
//           </Card.Body>
//         </Card>
//         </Button>
//         <Button>
//         <Card className='marioCard'>
//           <Card.Img variant="top" src="./client/assets/supermario.jpg" alt='mario-picture' style={{width: "100px"}} />
//           <Card.Body>
//             <Card.Title>Super Mario Bros. Movie</Card.Title>
//             <Card.Text>
//               TBD
//             </Card.Text>
//           </Card.Body>
//         </Card>
//         </Button>
//         <Card>
//           <Card.Img variant="top" src="holder.js/100px160" />
//           <Card.Body>
//             <Card.Title>Card title</Card.Title>
//             <Card.Text>
//                 TBD
//             </Card.Text>
//           </Card.Body>
//         </Card>
//       </CardGroup>
//     );
// }

// export default ShowSelection;
