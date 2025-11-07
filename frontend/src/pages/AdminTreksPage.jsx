import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTreksPage = () => {
  const [treks, setTreks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);

  // ✅ Fetch treks from backend
  const fetchTreks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/treks");
      setTreks(res.data);
    } catch (error) {
      console.error("Error fetching treks:", error);
    }
  };

  useEffect(() => {
    fetchTreks();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add or update trek
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/treks/${editingId}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/treks", formData);
      }
      setFormData({ title: "", image: "", description: "" });
      setEditingId(null);
      fetchTreks();
    } catch (error) {
      console.error("Error saving trek:", error);
    }
  };

  // ✅ Edit trek
  const handleEdit = (trek) => {
    setEditingId(trek._id);
    setFormData({
      title: trek.title,
      image: trek.image,
      description: trek.description,
    });
  };

  // ✅ Delete trek
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trek?")) {
      try {
        await axios.delete(`http://localhost:5000/api/treks/${id}`);
        fetchTreks();
      } catch (error) {
        console.error("Error deleting trek:", error);
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        🧭 Admin Trek Management
      </h1>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 max-w-xl mx-auto mb-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingId ? "Edit Trek" : "Add New Trek"}
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Trek Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded-md focus:outline-blue-500"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border p-3 rounded-md focus:outline-blue-500"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border p-3 rounded-md focus:outline-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {editingId ? "Update Trek" : "Add Trek"}
          </button>
        </div>
      </form>

      {/* Treks List */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {treks.length === 0 ? (
          <p className="text-center text-gray-600 col-span-full">
            No treks found.
          </p>
        ) : (
          treks.map((trek) => (
            <div
              key={trek._id}
              className="bg-white shadow-md rounded-xl overflow-hidden"
            >
              <img
                src={trek.image}
                alt={trek.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {trek.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                  {trek.description}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEdit(trek)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(trek._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminTreksPage;
