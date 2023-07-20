import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import editButton from "../assets/images/edit.svg";

const BlogDetail = () => {
  let navigate = useNavigate();
  const [blog, setBlog] = useState();
  const { id } = useParams();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [dataControl, setDataControl] = useState(false);
  useEffect(() => {
    fetch(`https://64b8463721b9aa6eb079bd4f.mockapi.io/blog/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setBlog(data);
          setDataControl(true);
        });
      } else {
        let localBlogs = JSON.parse(localStorage.getItem("orcunAkkayaCase"));
        localBlogs.map((i) => {
          if (i.id === id) {
            return setBlog(i);
          }
        });
        setDataControl(true);
      }
    });
  }, [id]);

  const handleComment = () => {
    if (
      userName.trim().length === 0 ||
      email.trim().length === 0 ||
      comment.trim().length === 0
    )
      return;
    let newBlog = { ...blog };
    newBlog.comment.push({
      comment: comment,
      email: email,
      nameSurname: userName,
    });
    setBlog(newBlog);

    setUserName("");
    setEmail("");
    setComment("");
  };

  useEffect(() => {
    if (!blog || !dataControl) return;

    const parser = new DOMParser();
    const element = document.getElementById(`blog-detail-content`);
    const string = Buffer.from(blog.content, "base64").toString("utf-8");
    const child = parser.parseFromString(string, "text/html");
    element.appendChild(child.body);
    setDataControl(false);
  }, [blog]);

  return (
    <div className="blog-detail">
      {blog && (
        <div className="blog-detail__container">
          <div className="blog-detail__header">
            <div>{blog?.header}</div>
            <button onClick={() => navigate(`/update-blog/${id}`)}>
              <img src={editButton} alt="edit-btn" />
            </button>
          </div>
          <img
            src={blog?.image}
            alt="blog-img"
            width={blog.imageWidth && blog.imageWidth}
          />
          <p id="blog-detail-content"></p>

          {blog && blog.comment.length > 0 ? (
            <div className="comments">
              <div>Yorumlar</div>
              {blog.comment.map((c) => (
                <div className="comment">
                  <div>{c.nameSurname};</div>
                  <div>{c.comment}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>Henüz yorum yok</div>
          )}
          <div className="blog-comment">
            <div>
              <label>İsim Soyisim</label>
              <input
                type="text"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
            </div>
            <div>
              <label>E-posta</label>
              <input
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Yorum</label>
              <input
                value={comment}
                type="text"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => handleComment()}>Yorum Yap</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;
