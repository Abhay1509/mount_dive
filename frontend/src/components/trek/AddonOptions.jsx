function AddonOptions({ addons, setAddons, addonPrices }) {
    return (
      <div>
        <h3 className="font-medium text-gray-800">Add-ons:</h3>
        <div className="mt-2 space-y-2">
          {Object.keys(addons).map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={addons[key]}
                onChange={() =>
                  setAddons({ ...addons, [key]: !addons[key] })
                }
                className="h-4 w-4"
              />
              <span>
                {key.charAt(0).toUpperCase() + key.slice(1)} (+${addonPrices[key]})
              </span>
            </label>
          ))}
        </div>
      </div>
    );
  }
  
  export default AddonOptions;
  