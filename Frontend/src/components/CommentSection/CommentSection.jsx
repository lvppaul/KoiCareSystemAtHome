import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { getComments, addComment } from "../../Config/BlogApi";
import { getAccountByUserId } from "../../Config/UserApi";
import { format } from "date-fns";
import { useAuth } from "../../pages/Login/AuthProvider";

const CommentSection = ({ blogId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const userId = user.userId;
  console.log("userId", userId);

  const fetchComments = useCallback(async () => {
    try {
      const comments = await getComments(blogId);
      const updatedComments = await Promise.all(
        comments.map(async (comment) => {
          const user = await getAccountByUserId(comment.userId);
          return { ...comment, userName: `${user.firstName} ${user.lastName}` };
        })
      );
      setComments(updatedComments);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    const user = await getAccountByUserId(userId);

    const comment = {
      blogId,
      content: newComment,
      userId: userId,
    };
    try {
      const addedComment = await addComment(comment);
      addedComment.userName = `${user.firstName} ${user.lastName}`;

      setComments([addedComment, ...comments]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <Container className="comment-section">
      <h3 style={{ fontWeight: "bold" }}>Comments</h3>
      <Form className="mb-3" onSubmit={handleAddComment}>
        <Form.Group controlId="formComment">
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter your comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button className="mt-2" variant="primary" type="submit">
          Add Comment
        </Button>
      </Form>
      {loading ? (
        <p>Loading comments...</p>
      ) : (
        <div>
          <Container
            className="p-3"
            style={{ backgroundColor: "#E4E0E1", borderRadius: "10px" }}
          >
            {comments.map((comment) => (
              <div
                className="mb-3"
                key={comment.commentId}
                style={{
                  border: "2px solid gray",
                  padding: "10px",
                }}
              >
                <p className="mb-0">
                  <strong>{comment.userName}</strong>
                </p>
                <p style={{ color: "gray" }}>
                  {format(
                    new Date(comment.createDate),
                    "MMMM dd, yyyy - hh:mm a"
                  )}
                </p>
                <hr />
                <p>{comment.content}</p>
              </div>
            ))}
          </Container>
        </div>
      )}
    </Container>
  );
};

export default CommentSection;
