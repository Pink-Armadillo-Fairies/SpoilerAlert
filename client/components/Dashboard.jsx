import React, { useState, useEffect } from "react";
import { Card, CardGroup, Container, Button } from "react-bootstrap";
import "../../client/styles.css";

const Dashboard = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        const response = await fetch("/shows");
        const result = await response.json();
        setShows(result); // Set shows with the result
      } catch (error) {
        console.error("Failed to fetch shows:", error); 
      }
    };
    fetchShows();
  }, []);

  return (
    <Container>
      <h1>Currently Watching</h1>
      <CardGroup>
        {shows.map((show) => (
          <Card key={show.id} className="m-2">
            <Card.Body>
              <Card.Title>{show.title}</Card.Title>
            </Card.Body>
          </Card>
        ))}
      </CardGroup>
      {/* Button links to '/AddShows' page */}
      <div className="d-flex flex-column align-items-center mt-3">
                <div>Don't see your show?</div>
                <Button variant="primary" className="mt-2">
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
