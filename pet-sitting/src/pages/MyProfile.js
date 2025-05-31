import React from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../hooks/useGet";

export const UserProfile = () => {
  const { id } = useParams();

  const { data: user, loading, error } = useGet(`users/${id}`);

  const {
    data: ads = [],
    loading: adsLoading,
    error: adsError,
  } = useGet(user ? `ads/owner/${user.id}` : null);

  if (loading || loading2 || user === null || ads === null)
    return <p> Loading...</p>;
  if (error || error2)
    return (
      <>
        {console.log(error.message || error2.message)}
        {error.message || error2.message}
      </>
    );

  
  return (
    <div className="container my-5">
      <div className="profile-header box-shadow rounded p-4 mb-4 d-flex align-items-center">
        <div className="profile-photo-wrapper me-4">
          <img
            src={user.avatar_url || "/default-avatar.png"}
            alt={`${user.first_name} ${user.last_name}`}
            className="profile-photo rounded-circle"
          />
        </div>
        <div>
          <h1 className="mb-1">
            {user.first_name} {user.last_name}
          </h1>
          <h5 className="text-muted">@{user.username}</h5>
        </div>
      </div>


      {user.description && (
        <div className="profile-description box-shadow rounded p-4 mb-4">
          <p className="mb-0">{user.description}</p>
        </div>
      )}


      <h3 className="mb-3">Posts by {user.first_name}</h3>
      {ads.length === 0 ? (
        <div className="alert alert-secondary">No posts yet.</div>
      ) : (
        <div className="row g-4">
          {ads.map((ad) => (
            <div key={ad.id} className="col-md-6 col-lg-4">
              <div className="card ad-card h-100 box-shadow">
                {ad.image_url && (
                  <img
                    src={ad.image_url}
                    className="card-img-top"
                    alt={ad.title}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{ad.title}</h5>
                  <p className="card-text text-truncate">{ad.description}</p>
                  <a
                    href={`/post/${ad.id}`}
                    className="mt-auto btn btn-primary"
                  >
                    View Post
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
