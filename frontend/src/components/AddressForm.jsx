import { useState } from "react";

function AddressForm({ onSave }) {
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(address);
    setAddress("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Enter Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
}

export default AddressForm;
