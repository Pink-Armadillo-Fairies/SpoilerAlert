import React, { useState, useEffect } from "react";
import { Form, Container, Button, ListGroup } from "react-bootstrap";
import "../../client/styles.css";

const Comment = ({ showId, season, episode }) => {

  // state to save all comments for the show 
  const [comments, setComments] = useState([]); 


  // retrieve all comments for the show and save them to 'comments' state  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/getcomments?showId=${showId}`);
        const result = await response.json();
        // console.log('fetched result is', result);
        if (Array.isArray(result)) {
          // Sort the comments by season and episode
          const sortedComments = result.sort((a, b) => {
            if (a.season_number !== b.season_number) {
              return a.season_number - b.season_number;
            }
            return a.episode_number - b.episode_number;
          });
          setComments(sortedComments);
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


  // console.log for test 
  // console.log('current season for user is', season);
  // console.log('current episode for user is', episode);
  

  // function to check if each comment is spoiler (True = spoiler, False = not a spoiler) u
  const isSpoiler = (commentSeason, commentEpisode) => {
    if (commentSeason > season) return true; // if user watch history's season > comment's season, return true (spoilor) 
    if (commentSeason === season && commentEpisode > episode) return true; // if user watch history's season and comment season are the same, episodes > comment's episode, return true(spoiler)
    return false; 
  }
  
  return (
    <Container>
      <ListGroup className="comment-list mt-3">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <ListGroup.Item key={index} className="comment-item">
              {isSpoiler(comment.season_number, comment.episode_number) ? (
                <div className="spoiler-alert">
                  <strong>Spoiler Alert!</strong>
                </div>
              ) : (
                <>
                  <div className="comment-header">
                    <strong>{comment.user_name}</strong> <span className="comment-date">{new Date(comment.created_at).toLocaleString()}</span>
                  </div>
                  <div className="comment-body">{comment.body}</div>
                  <div className="comment-footer">
                    Season: {comment.season_number} | Episode: {comment.episode_number}
                  </div>
                </>
              )}
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

