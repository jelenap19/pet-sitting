import React from "react";
import { useGet } from "../hooks/useGet";
import { Link } from "react-router-dom";

export const Comment = ({ cid }) => {
  const { data: comment, loading, error } = useGet(`comments/${cid}`);
  const user_id = comment ? comment.owner_id : null;
  const { data: user, loading2, error2 } = useGet(`users/${user_id}`);

  if (loading || loading2 || comment === null || user === null)
    return <p> Loading...</p>;
  if (error || error2)
    return (
      <>
        {console.log(error.message || error2.message)}
        {error.message || error2.message}
      </>
    );

  return (
    <div className="border rounded p-3 mb-3">
      <h6 className="text-secondary mb-4">
  {user.first_name} {user.last_name}{" "}
  <small className="text-muted">
    (
    <Link
      to={`/username/${user.username}`}
      className="text-muted"
      style={{ textDecoration: "none" }}
    >
      @{user.username}
    </Link>
    )
  </small>
</h6>
      <p className="mb-0">{comment.comment_text}</p>
    </div>
  );
};
