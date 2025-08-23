import React from "react";

export const Post = ({ title, description, imageUrl }) => {
  return (
    <div className="card h-100">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Ad thumbnail"
          className="card-img-top"
          style={{ objectFit: "cover", height: "150px" }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p
          className="card-text"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
