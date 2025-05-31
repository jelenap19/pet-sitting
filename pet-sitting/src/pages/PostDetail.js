import React from "react";
import { useParams } from "react-router-dom";
import { Comment } from "../components/Comment";
import { useGet } from "../hooks/useGet";

export const PostDetail = () => {
  const { current_ad_id } = useParams();

  const { data: ad, loading, error } = useGet(`ads/${current_ad_id}`);
  const {
    data: comments,
    loading2,
    error2,
  } = useGet(`comments/ad/${current_ad_id}`);
  const user_id = ad ? ad.owner_id : null;
  const { data: user, loading3, error3 } = useGet(`users/${user_id}`);

  if (loading || loading2 || loading3 || (ad && user === null))
    return <p> Loading...</p>;
  if (error || error2 || error3)
    return (
      <>
        {console.log(error.message || error2.message || error3.message)}
        {error.message || error2.message || error3.message}
      </>
    );

    return (
    <div className="container my-4">
      <h1 className="mb-3">{ad.title}</h1>
      <h5 className="text-secondary mb-4">
        {user.first_name} {user.last_name}{' '}
        <small className="text-muted">(@{user.username})</small>
      </h5>

      <div className="card mb-5">
        {ad.image && (
          <img
            src={ad.image_url}
            alt={"no pic yet"}
            className="card-img-top"
            style={{ objectFit: 'cover', maxHeight: '400px' }}
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
        comments.map((c) => (
          <Comment key={c.id} cid = {c.id}/>
        ))
      )}
    </div>
  );
};
