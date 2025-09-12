import { Link } from "react-router-dom";

function TrekCard({ trek }) {
  return (
    <div className="border rounded-2xl shadow-md p-6 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold">{trek.name}</h2>
      <p className="text-gray-600">Difficulty: {trek.difficulty}</p>
      <p className="text-gray-700 font-medium">Price: ${trek.price}</p>
      <Link to={`/customize/${trek.id}`}>
        <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Customize
        </button>
      </Link>
    </div>
  );
}

export default TrekCard;
