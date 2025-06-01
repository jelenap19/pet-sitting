import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import { usePut } from "../hooks/usePut";
import { AuthContext } from "../authorization/AuthContext";
import { Post } from "../components/Post";
import { Link } from "react-router-dom";
const API_BASE_URL = "http://88.200.63.148:7000";

export const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useGet(`users/username/${username}`);

  const userId = user?.id || null;
  const {
    data: userAds = [],
    loading: adsLoading,
    error: adsError,
  } = useGet(userId ? `ads/owner/${userId}` : null);

  const [editing, setEditing] = useState(false);

  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    description: "",
    avatar_url: "", 
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);


  const { execute: updateUser } = usePut(`/users/${userId}`);
  const { execute: uploadAvatar } = usePost(`/users`);


  useEffect(() => {
    if (user) {
      setFormValues({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        description: user.description || "",
        avatar_url: user.avatar_url || "",
      });
    }
  }, [user]);

  
  const canEdit =
    authUser && (authUser.user.id === userId || authUser.user.role_id === 1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };


  const handleSave = async (e) => {
    e.preventDefault();
    setSaveError("");

    if (!canEdit) {
      setSaveError("You’re not authorized to edit this profile.");
      return;
    }

    setSaving(true);
    try {

      let avatarUrlToUpdate = formValues.avatar_url;
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);


        const resp = await uploadAvatar(formData, {
          url: `/users/${userId}/avatar`,
        });
        avatarUrlToUpdate = resp.avatar_url;
      }

    
      const payload = {
      first_name: formValues.first_name,
      last_name:  formValues.last_name,
      email:      formValues.email,
      username:   user.username,     
      description: formValues.description,
      role_id:    user.role_id,       
      avatar_url: avatarUrlToUpdate,
      
    };

      const updatedUser = await updateUser(payload, {
        url: `/users/${userId}`,
      });


      setEditing(false);

      navigate(`/username/${updatedUser.username}`, { replace: true });
    } catch (err) {
      console.error(err);
      setSaveError(err.response?.data?.message || "Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };


  if (userLoading || adsLoading) return <p>Loading...</p>;
  if (userError) return <p>Error loading user: {userError.message}</p>;
  if (adsError) return <p>Error loading user’s posts: {adsError.message}</p>;


  const avatarFullUrl = formValues.avatar_url
    ? `${API_BASE_URL}${formValues.avatar_url}`
    : "/uploads/default_avatar.png";

  return (
    <div className="container my-4">
      <div className="row mb-4">

        <div className="col-md-3 text-center">
          <img
            src={avatarFullUrl}
            alt={`${user.username}’s avatar`}
            className="rounded-circle img-thumbnail"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          {editing && (
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control form-control-sm"
              />
            </div>
          )}
        </div>

        
        <div className="col-md-9">
          {editing ? (
            <>
              <form onSubmit={handleSave}>
                <div className="mb-2">
                  <label className="form-label">First Name</label>
                  <input
                    name="first_name"
                    type="text"
                    className="form-control"
                    value={formValues.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Last Name</label>
                  <input
                    name="last_name"
                    type="text"
                    className="form-control"
                    value={formValues.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-2">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    rows="3"
                    value={formValues.description}
                    onChange={handleInputChange}
                  />
                </div>
                {saveError && (
                  <div className="alert alert-danger">{saveError}</div>
                )}
                <button
                  type="submit"
                  className="btn btn-primary me-2"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditing(false)}
                  disabled={saving}
                >
                  Cancel
                </button>
              </form>
            </>
          ) : (
            <>
              <h2>
                {user.first_name} {user.last_name}{" "}
                <small className="text-muted">@{user.username}</small>
              </h2>
              <p className="text-muted">{user.description}</p>
              {canEdit && (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>

      
      <h4 className="mb-3">{user.username}’s Posts</h4>
      {userAds.length === 0 ? (
        <div className="alert alert-secondary">No posts yet</div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {userAds.map((ad) => {
            const thumbUrl = ad.image_url
              ? `${API_BASE_URL}${ad.image_url}`
              : null;
            return (
              <div key={ad.id} className="col">
                <Link
                  to={`/post/${ad.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Post
                    title={ad.title}
                    description={ad.description}
                    imageUrl={thumbUrl}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
