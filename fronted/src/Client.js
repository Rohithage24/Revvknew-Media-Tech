import React, { useState } from "react";
import axios from "axios";

function Client() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "", 
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [dataI, setDataI] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.image) {
      return setMessage("All fields are required.");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/posts",
        {
          title: form.title,
          description: form.description,
          image: form.image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(res.data.message);
      setData(res.data);
      console.log(res.data);
      

      setForm({
        title: "",
        description: "",
        image: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowdata = async () => {
    try {
      if (!data?.data?.slug) {
        return setMessage("No client data available.");
      }

      const slug = data.data.slug;

      const res = await axios.get(
        `http://localhost:5000/api/posts/${slug}`
      );

      setDataI(res.data);
    } catch (error) {
      setMessage("Failed to fetch client data.");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <h1>Add Client</h1>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>

        <div className="form-group mb-3">
          <label>Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            rows="3"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <button
        className="btn btn-success mt-3 w-100"
        onClick={handleShowdata}
      >
        Show Client
      </button>

      {dataI?.client && (
        <div className="card mt-4">
          <img
             src={dataI.client.image} 
            className="card-img-top"
            alt={dataI.client.title}
            style={{ height: "250px", objectFit: "cover" }}
          />

          <div className="card-body">
            <h5>{dataI.client.title}</h5>
            <p>{dataI.client.description}</p>
            <small>Slug: {dataI.client.slug}</small>
          </div>
        </div>
      )}
    </div>
  );
}

export default Client;