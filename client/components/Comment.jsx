import React, { useState, useEffect } from "react";
import { Form, Container, Button, ListGroup } from "react-bootstrap";
import "../../client/styles.css";

const Comment = ({ showId, season, episode }) => {
  const [comments, setComments] = useState([]); // holds the list of comments fetched from backend

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/getcomments?showId=${showId}&season=${season}&episode=${episode}`);
        const result = await response.json();
        console.log(result);
        if (Array.isArray(result)) {
          setComments(result);
        } else {
          console.error("Comments data is not an array:", result);
          setComments([]);
        }
      } catch (error) {
        console.log("Failed to fetch comments", error);
        setComments([]);
      }
    };

    fetchComments();
  }, [showId, season, episode]);

  return (
    <Container>
      <ListGroup className="comment-list mt-3">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <ListGroup.Item key={index} className="comment-item">
              <div className="comment-header">
                <strong>{comment.user_name}</strong> {new Date(comment.created_at).toLocaleString()}
              </div>
              <div className="comment-body">{comment.body}</div>
              <div className="comment-footer">
                Season: {comment.season_number} | Episode: {comment.episode_number}
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <p>No comments found</p>
        )}
      </ListGroup>
    </Container>
  );
};


export default Comment;

