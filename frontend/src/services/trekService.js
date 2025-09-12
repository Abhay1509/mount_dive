const BASE_URL = "http://localhost:5000/api";

export const getTreks = async () => {
  const res = await fetch(`${BASE_URL}/treks`);
  return res.json();
};

export const getTrekById = async (id) => {
  const res = await fetch(`${BASE_URL}/treks`);
  const treks = await res.json();
  return treks.find((t) => String(t.id) === String(id));
};

export const createBooking = async (bookingData) => {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });
  return res.json();
};
