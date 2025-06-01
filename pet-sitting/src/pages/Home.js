// src/pages/Home.jsx
import React, { useState, useMemo } from "react";
import { useGet } from "../hooks/useGet";
import { Post } from "../components/Post";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://88.200.63.148:7000";

const FILTERS = [
  "all",
  "dog",
  "cat",
  "fish",
  "bird",
  "reptile",
  "other",
  "weekend",
  "week",
  "month"
];

export const Home = () => {

  const { data: allAds = [], loading, error } = useGet("ads");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredAds = useMemo(() => {
    if (selectedFilter === "all") return allAds;
    return allAds.filter((ad) => {
      const tagsArray = ad.tags ? ad.tags.split(",") : [];
      return tagsArray.includes(selectedFilter);
    });
  }, [allAds, selectedFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container my-4">
      <div className="mb-3 d-flex align-items-center">
        <label htmlFor="tagFilter" className="me-2 fw-semibold">
          Filter by Tag:
        </label>
        <select
          id="tagFilter"
          className="form-select w-auto"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          {FILTERS.map((tag) => (
            <option key={tag} value={tag}>
              {tag === "all"
                ? "All Ads"
                : tag.charAt(0).toUpperCase() + tag.slice(1)}
            </option>
          ))}
        </select>
      </div>


      <div className="row row-cols-1 row-cols-md-2 g-4">
        {filteredAds.map((a) => (
          <div key={a.id} className="col">
            <Link
              to={`/post/${a.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Post
                title={a.title}
                description={a.description}
                imageUrl={a.image_url ? `${API_BASE_URL}${a.image_url}` : null}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
