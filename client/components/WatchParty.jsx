import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../../client/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { updateSeeComments } from '../episodeSlice.js';



const WatchParty = () => {
  const stateParty = useSelector((store) => store.episode.watchParty);
  const party = [];
  const maxCache = {};
  const watchList = [];
  const me = useSelector((store) => store.login.username);
  let header = <></>;
  const seeCommentsToggle = useSelector((store) => store.episode.seeComments);
  const dispatch = useDispatch();

  
  stateParty.forEach((el) => {
    //create a value to index viewer's progress in a series
    let viewOrder = el.season * 1000 + el.episode;
    if(el.user===me){viewOrder=viewOrder+0.5}
    //keep a record of the latest episode the viewer has watched
    maxCache[el.user] === undefined
    ? (maxCache[el.user] = viewOrder)
    : (maxCache[el.user] = Math.max(maxCache[el.user], viewOrder));
    
    
    //add the view to the party array along with the viewOrder value
    party.push({ ...el, viewOrder });
  });
  
  party.sort((a, b) => a.viewOrder - b.viewOrder);
  
  party.forEach((el) => {
    el.user === me
      ? (el.variant = 'primary')
      : el.viewOrder > maxCache[me]
      ? (el.variant = 'danger')
      : (el.variant = 'success');
    
  })

  party.forEach((el) => {
    if (el.viewOrder === maxCache[el.user]) {
      let message = <div></div>;
      if (seeCommentsToggle && el.variant !== 'danger') {
        message = 
          <div>
            <h4 style={{fontFamily: "Ubuntu Condensed", paddingTop: "10px"}}>{el.message}</h4>
          </div>
      }

      if (seeCommentsToggle && el.variant === 'danger'){
        message = 
          <div>
            <h4 style={{fontFamily: "Ubuntu Condensed", paddingTop: "10px"}}>Warning: Spoilers!</h4>
          </div>
      }

      watchList.push(
        <ListGroup.Item variant = {el.variant}>
          <span style={{fontFamily: "Ubuntu Condensed", marginBottom: "5px"}}>{`${el.user} - watched up to S${el.season}, Ep ${el.episode} - "${el.title}"`}</span>
          {message}
        </ListGroup.Item>
      );
      maxCache[el.user]='posted'
    }
  });

  const seeCommentsBtn = () => {
    dispatch(updateSeeComments());
  }

  if(watchList.length > 0){
    header = 
      <div style={{display: "flex", flexDirection: "column", marginTop: "30px"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "Ubuntu Condensed", paddingLeft: "10px", paddingRight: "10px"}}>
          <h3>WATCH PARTY</h3>
          <Button onClick={seeCommentsBtn} style={{backgroundColor: "white", color: "black", border: "1px solid black"}}>See Comments</Button>
        </div>
        <hr className="horizontalLine" ></hr>
      </div>
      

  };
  
  return (
    <div>
      {header}
      <ListGroup style={{marginBottom: "80px"}}>{watchList}</ListGroup>
    </div>
  );
};

export default WatchParty;
