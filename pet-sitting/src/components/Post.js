import React from "react";

export const Post = ({ image, title, description }) =>  {
  return (
    <div className="card mb-4" style={{ maxWidth: "100%" }}>
      <div className="row g-0">
        <div className="col-3">
          <img
            src={image} 
            alt={"not loaded"}
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-9">
          <div className="card-body">
            <h5 className="card-title text-primary">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
