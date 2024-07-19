import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../../client/styles.css';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import updateSeeComments from '../episodeSlice.js';



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
  
  const relativeStatus = (el) => {
    let variant = '';
    
    return variant
  };
  
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
      if (seeCommentsToggle) {
        message = 
          <div>
            {el.message}
          </div>
      }
      watchList.push(
        <ListGroup.Item variant = {el.variant}>
          {`${el.user} - watched up to S${el.season}, Ep ${el.episode}`}
          {message}
        </ListGroup.Item>
      );
      maxCache[el.user]='posted'
    }
  });

  const seeCommentsBtn = () => {
    dispatch(updateSeeComments);
  }

  if(watchList.length > 0){
    header = 
      <div>
        <h3>WATCH PARTY</h3>
        <Button onClick={seeCommentsBtn}>See Comments</Button>
      </div>
      

  };
  
  return (
    <div>
      {header}
      <ListGroup>{watchList}</ListGroup>
    </div>
  );
};

export default WatchParty;
