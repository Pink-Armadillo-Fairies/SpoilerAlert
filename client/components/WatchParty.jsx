import React from 'react';
import { ListGroup } from 'react-bootstrap';
import '../../client/styles.css';
import { useSelector, useDispatch } from 'react-redux';



const WatchParty = () => {
  const stateParty = useSelector((store) => store.episode.watchParty);
  const party = [];
  const maxCache = {};
  const watchList = [];
  const me = useSelector((store) => store.login.username);
  let header = <></>;

  
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
      watchList.push(
        <ListGroup.Item variant = {el.variant}>
          {`${el.user} - watched up to S${el.season}, Ep ${el.episode}`}
        </ListGroup.Item>
      );
      maxCache[el.user]='posted'
    }
  });

  if(watchList.length > 0){
    header = <h3>WATCH PARTY</h3>
  };
  
  return (
    <div>
      {header}
      <ListGroup>{watchList}</ListGroup>
    </div>
  );
};

export default WatchParty;
