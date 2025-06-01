import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../components/Comment";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import { AuthContext } from "../authorization/AuthContext";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://88.200.63.148:7000";

export const PostDetail = () => {
  const { current_ad_id } = useParams();
  const { authUser } = useContext(AuthContext);

  const { data: ad, loading, error } = useGet(`ads/${current_ad_id}`);
  const {
    data: fetchedComments,
    loading2,
    error2,
  } = useGet(`comments/ad/${current_ad_id}`);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (Array.isArray(fetchedComments)) {
      setComments(fetchedComments);
    }
  }, [fetchedComments]);
  const user_id = ad ? ad.owner_id : null;
  const [newCommentText, setNewCommentText] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { execute: postComment } = usePost("/comments");

  const { data: user, loading3, error3 } = useGet(`users/${user_id}`);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!authUser) {
      setSubmitError("You must be logged in to post a comment.");
      return;
    }
    if (!newCommentText.trim()) {
      setSubmitError("Comment cannot be empty.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ad_id: parseInt(current_ad_id, 10),
        owner_id: authUser.user.id,
        comment_text: newCommentText.trim(),
      };

      const created = await postComment(payload, {
        url: `/comments/ad/${current_ad_id}/newComment`,
      });

      setComments([...(comments || []), created]);

      setNewCommentText("");
    } catch (err) {
      console.error(err);
      setSubmitError(err.response?.data?.message || "Failed to post comment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || loading2 || loading3 || (ad && user === null))
    return <p> Loading...</p>;
  if (error || error2 || error3)
    return (
      <>
        {console.log(error.message || error2.message || error3.message)}
        {error.message || error2.message || error3.message}
      </>
    );
  const fullImage = ad.image_url && `${API_BASE_URL}${ad.image_url}`;
  const fullImageUrl = fullImage ? fullImage : null;
  return (
    <div className="container my-4">
      <h1 className="mb-3">{ad.title}</h1>
      <h5 className="text-secondary mb-4">
        {user.first_name} {user.last_name}{" "}
        <small className="text-muted">
          (
          <Link
            to={`username/:user.username}`}
            className="text-muted"
            style={{ textDecoration: "none" }}
          >
            @{user.username}
          </Link>
          )
        </small>
      </h5>
      <div className="card mb-5">
        {fullImageUrl && (
          <img
            src={fullImageUrl}
            alt="Ad"
            className="card-img-top"
            style={{ objectFit: "cover", maxHeight: "400px" }}
          />
        )}
        <div className="card-body">
          <p className="card-text">{ad.description}</p>
        </div>
      </div>

      <h3 className="mb-3">Comments</h3>
      {comments.length === 0 ? (
        <div className="alert alert-secondary">No comments yet</div>
      ) : (
        comments.map((c) => <Comment key={c.id} cid={c.id} />)
      )}
      <div className="mt-5">
        <h4 className="mb-3">Post a Comment</h4>
        {submitError && <div className="alert alert-danger">{submitError}</div>}
        <form onSubmit={handleCommentSubmit}>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Write your comment..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              disabled={submitting}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? "Posting…" : "Post Comment"}
          </button>
        </form>
      </div>
    </div>
  );
};
