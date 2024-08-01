import React from "react";
import { useState, useEffect } from "react";
import { Form, Container, Button, ListGroup } from "react-bootstrap";
import "../../client/styles.css";

const Comment = ({ showId, season, episode }) => {
  // use effect fetch comments from db from specific show
  // fetch comments ()
  //  /comments/${showId}/${season}/${episode}
  // sort comments to display the comments for the episodes up to the user has watched
  // compare users specific point vs all comments
  // hide comments past the point the user has watched

  const [comments, setComments] = useState([]); // holds the list of comments fetched from backend
  const [seeComments, setSeeComments] = useState(false); // toggles visibility of comments?

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `/getcomments?showId=${showId}`
        );
        const result = await response.json();
        console.log(result);
        setComments(result);
      } catch (error) {
        console.log("Failed to fetch comments", error);
      }
    };
    fetchComments();
  }, [showId, season, episode]);

  return (
    <Container>
      <ListGroup className="mt-3">
        {comments.map((comment, index) => (
          <ListGroup.Item key={index}>
            <strong>{comment.user_id}:</strong> {comment.body} {comment.created_at} <em>{new Date(comment.created_at).toLocaleString()}</em>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Comment;


