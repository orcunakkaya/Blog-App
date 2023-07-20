import React from "react";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://64b8463721b9aa6eb079bd4f.mockapi.io/blog", {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if (localStorage.getItem("orcunAkkayaCase") !== null) {
            setBlogs([
              ...data,
              ...JSON.parse(localStorage.getItem("orcunAkkayaCase")),
            ]);
          } else {
            setBlogs(data);
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    if (blogs.length === 0) return;
    const parser = new DOMParser();
    blogs.map((i) => {
      const element = document.getElementById(`blog-item-${i.id}`);
      const string = Buffer.from(i.content, "base64").toString("utf-8");
      const child = parser.parseFromString(string, "text/html");
      element.appendChild(child.body);
    });
  }, [blogs]);
  return (
    <div className="blogs-container-main">
      <div className="blogs-container">
        {blogs.map((blog) => (
          <Link
            to={`/blog/${blog.id}`}
            key={Number(blog.id)}
            className="blogs-container__item"
          >
            <div className="blogs-container__item-text">
              <div className="blogs-header">{blog.header}</div>
              <div
                className="blogs-container__item-content"
                id={`blog-item-${blog.id}`}
                style={{
                  maxWidth: "400px",
                  maxHeight: "400px",
                  overflow: "hidden",
                }}
              ></div>
            </div>
            <img src={blog.image} alt={`thumbnail-${blog.id}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blog;
