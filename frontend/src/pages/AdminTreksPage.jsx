import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTreksPage = () => {
  const [treks, setTreks] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    images: [""],
    location: "",
    price: "",
    duration: "",
    difficulty: "",
    altitude: "",
    bestSeason: "",
    description: "",
    itinerary: [{ day: "", details: [""] }],
  });

  const [editingId, setEditingId] = useState(null);

  // Fetch all treks
  const fetchTreks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/treks`);
      setTreks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTreks();
  }, []);

  // Handle basic input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle images
  const handleImageChange = (index, value) => {
    const updated = [...formData.images];
    updated[index] = value;
    setFormData({ ...formData, images: updated });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ""] });
  };

  const removeImageField = (index) => {
    const updated = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: updated });
  };

  // Handle itinerary days
  const addItineraryDay = () => {
    setFormData({
      ...formData,
      itinerary: [...formData.itinerary, { day: "", details: [""] }],
    });
  };

  const handleItineraryChange = (index, field, value) => {
    const updated = [...formData.itinerary];
    updated[index][field] = value;
    setFormData({ ...formData, itinerary: updated });
  };

  // Handle itinerary details
  const addDetail = (dayIndex) => {
    const updated = [...formData.itinerary];
    updated[dayIndex].details.push("");
    setFormData({ ...formData, itinerary: updated });
  };

  const handleDetailChange = (dayIndex, detailIndex, value) => {
    const updated = [...formData.itinerary];
    updated[dayIndex].details[detailIndex] = value;
    setFormData({ ...formData, itinerary: updated });
  };

  // CLEAN + SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    // CLEAN IMAGES (remove empty strings)
    const cleanImages = formData.images.filter(
      (img) => img && img.trim() !== ""
    );

    // CLEAN ITINERARY
    const cleanItinerary = formData.itinerary
      .filter((day) => day.day.trim() !== "") // no empty day title
      .map((day) => ({
        day: day.day.trim(),
        details: day.details.filter((d) => d.trim() !== ""), // no empty details
      }))
      .filter((day) => day.details.length > 0); // ensure at least 1 detail

    const payload = {
      ...formData,
      images: cleanImages,
      itinerary: cleanItinerary,
    };

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/treks/${editingId}`,
          payload
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/treks`, payload);
      }

      resetForm();
      setEditingId(null);
      fetchTreks();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed — open console for details!");
    }
  };

  // Reset form to empty
  const resetForm = () => {
    setFormData({
      title: "",
      type: "",
      images: [""],
      location: "",
      price: "",
      duration: "",
      difficulty: "",
      altitude: "",
      bestSeason: "",
      description: "",
      itinerary: [{ day: "", details: [""] }],
    });
  };

  // Load trek in edit mode safely
  const handleEdit = (trek) => {
    setEditingId(trek._id);
    setFormData({
      ...trek,
      images:
        trek.images && trek.images.length > 0 ? trek.images : [""],
      itinerary:
        trek.itinerary && trek.itinerary.length > 0
          ? trek.itinerary.map((d) => ({
              day: d.day || "",
              details:
                d.details && d.details.length > 0 ? d.details : [""],
            }))
          : [{ day: "", details: [""] }],
    });
  };

  // Delete trek
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this trek?")) {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/treks/${id}`);
      fetchTreks();
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Admin Trek Manager
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-6 rounded-xl max-w-3xl mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Trek" : "Add Trek"}
        </h2>

        {/* BASIC INPUTS */}
        <div className="grid grid-cols-2 gap-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="border p-2 rounded"
            required
          />

          <input
            name="type"
            value={formData.type}
            onChange={handleChange}
            placeholder="Type (Hiking/Trekking)"
            className="border p-2 rounded"
            required
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="border p-2 rounded"
            required
          />

          <input
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="border p-2 rounded"
            required
          />

          <input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Duration"
            className="border p-2 rounded"
            required
          />

          <input
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            placeholder="Difficulty"
            className="border p-2 rounded"
            required
          />

          <input
            name="altitude"
            value={formData.altitude}
            onChange={handleChange}
            placeholder="Altitude"
            className="border p-2 rounded"
            required
          />

          <input
            name="bestSeason"
            value={formData.bestSeason}
            onChange={handleChange}
            placeholder="Best Season"
            className="border p-2 rounded"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded mt-4"
          required
        />

        {/* IMAGES */}
        <h3 className="font-semibold mt-4">Images</h3>

        {formData.images.map((img, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              value={img}
              onChange={(e) => handleImageChange(i, e.target.value)}
              placeholder="Image URL"
              className="border p-2 rounded w-full"
            />

            {i > 0 && (
              <button
                type="button"
                onClick={() => removeImageField(i)}
                className="bg-red-500 text-white px-3 rounded"
              >
                X
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addImageField}
          className="mt-2 text-blue-600"
        >
          + Add Image
        </button>

        {/* ITINERARY */}
        <h3 className="font-semibold mt-6">Itinerary</h3>

        {formData.itinerary.map((day, index) => (
          <div key={index} className="border p-4 rounded mt-2 bg-gray-100">
            <input
              value={day.day}
              onChange={(e) =>
                handleItineraryChange(index, "day", e.target.value)
              }
              placeholder="Day Title"
              className="border p-2 rounded w-full mb-2"
            />

            {day.details.map((detail, i) => (
              <input
                key={i}
                value={detail}
                onChange={(e) =>
                  handleDetailChange(index, i, e.target.value)
                }
                placeholder="Detail"
                className="border p-2 rounded w-full mt-1"
              />
            ))}

            <button
              type="button"
              onClick={() => addDetail(index)}
              className="text-blue-600 mt-2"
            >
              + Add Detail
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItineraryDay}
          className="text-green-600 mt-3"
        >
          + Add Itinerary Day
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded mt-6"
        >
          {editingId ? "Update Trek" : "Add Trek"}
        </button>
      </form>

      {/* TREKS LIST */}
      <h2 className="text-2xl font-bold mt-10 mb-4">All Treks</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {treks.map((t) => (
          <div key={t._id} className="bg-white p-4 shadow rounded-lg">
            <img
              src={t.images?.[0]}
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="font-bold mt-2">{t.title}</h3>
            <p className="text-gray-600 text-sm">{t.location}</p>

            <div className="flex justify-between mt-3">
              <button
                onClick={() => handleEdit(t)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTreksPage;
