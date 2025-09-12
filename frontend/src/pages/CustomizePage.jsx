import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTrekById, createBooking } from "../services/trekService";
import AddonOptions from "../components/trek/AddonOptions";

function CustomizePage() {
  const { trekId } = useParams();
  const [trek, setTrek] = useState(null);
  const [date, setDate] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [addons, setAddons] = useState({
    camping: false,
    food: false,
    transport: false,
    guide: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getTrekById(trekId).then(setTrek);
  }, [trekId]);

  if (!trek) return <p className="p-6">Loading...</p>;

  const addonPrices = { camping: 50, food: 30, transport: 100, guide: 80 };

  const totalPrice =
    trek.price * groupSize +
    Object.entries(addons)
      .filter(([_, val]) => val)
      .reduce((sum, [key]) => sum + addonPrices[key], 0);

  const handleBooking = async () => {
    const bookingData = {
      trekId: trek.id,
      trekName: trek.name,
      date,
      groupSize,
      addons,
      totalPrice,
    };

    const res = await createBooking(bookingData);
    if (res.success) {
      alert("✅ Booking Confirmed & Saved!");
      navigate("/");
    } else {
      alert("❌ Booking Failed: " + res.error);
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold text-gray-800">
        Customize: {trek.name}
      </h1>

      <div className="mt-6 space-y-6">
        {/* Date Picker */}
        <div>
          <label className="block text-gray-700 font-medium">
            Select Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 p-2 border rounded-lg w-full"
          />
        </div>

        {/* Group Size */}
        <div>
          <label className="block text-gray-700 font-medium">
            Group Size:
          </label>
          <input
            type="number"
            min="1"
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="mt-2 p-2 border rounded-lg w-full"
          />
        </div>

        <AddonOptions addons={addons} setAddons={setAddons} addonPrices={addonPrices} />

        {/* Demo Test Card */}
        <div className="mt-6 p-4 border rounded-lg bg-yellow-50">
          <h3 className="font-semibold text-gray-800">💳 Demo Payment Info</h3>
          <ul className="list-disc ml-6 text-gray-700 text-sm mt-2">
            <li>Card Number: <b>4242 4242 4242 4242</b></li>
            <li>Expiry: <b>12/34</b></li>
            <li>CVC: <b>123</b></li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            *Demo only. No real payment will be charged.
          </p>
        </div>

        <h2 className="text-lg font-semibold text-gray-900">
          Total Price: ${totalPrice}
        </h2>

        <button
          onClick={handleBooking}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
}

export default CustomizePage;
