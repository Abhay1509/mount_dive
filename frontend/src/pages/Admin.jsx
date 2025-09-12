import { useState, useEffect } from "react";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

function Admin() {
  const [treks, setTreks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    difficulty: "Easy",
    price: "",
    description: "",
    duration: "",
    location: "",
  });
  const [editingId, setEditingId] = useState(null);

  const fetchTreks = async () => {
    const res = await fetch("http://localhost:5000/api/treks");
    const data = await res.json();
    setTreks(data);
  };

  useEffect(() => {
    fetchTreks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`http://localhost:5000/api/treks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditingId(null);
    } else {
      await fetch("http://localhost:5000/api/treks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    setForm({
      name: "",
      difficulty: "Easy",
      price: "",
      description: "",
      duration: "",
      location: "",
    });
    fetchTreks();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trek?")) return;
    await fetch(`http://localhost:5000/api/treks/${id}`, { method: "DELETE" });
    fetchTreks();
  };

  const handleEdit = (trek) => {
    setForm({
      name: trek.name,
      difficulty: trek.difficulty,
      price: trek.price,
      description: trek.description,
      duration: trek.duration,
      location: trek.location,
    });
    setEditingId(trek._id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">🏔️ Admin Panel</h1>

        {/* Form */}
        <div className="bg-white shadow rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? "✏️ Edit Trek" : "➕ Add New Trek"}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <input
              className="border p-2 rounded"
              name="name"
              placeholder="Trek Name"
              value={form.name}
              onChange={handleChange}
            />
            <select
              className="border p-2 rounded"
              name="difficulty"
              value={form.difficulty}
              onChange={handleChange}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
            <input
              className="border p-2 rounded"
              name="price"
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded"
              name="duration"
              placeholder="Duration (e.g. 5 Days)"
              value={form.duration}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded col-span-2"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            <textarea
              className="border p-2 rounded col-span-2"
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="col-span-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
            >
              {editingId ? "Update Trek" : "Add Trek"}
            </button>
          </form>
        </div>

        {/* Trek List */}
        <div className="bg-white shadow rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">📋 Available Treks</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Difficulty</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Duration</th>
                <th className="p-2 border">Location</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {treks.map((trek) => (
                <tr key={trek._id} className="hover:bg-gray-50">
                  <td className="p-2 border">{trek.name}</td>
                  <td className="p-2 border">{trek.difficulty}</td>
                  <td className="p-2 border">${trek.price}</td>
                  <td className="p-2 border">{trek.duration}</td>
                  <td className="p-2 border">{trek.location}</td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(trek)}
                      className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      <Pencil size={16} className="mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trek._id)}
                      className="flex items-center bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      <Trash2 size={16} className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {treks.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No treks added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;
