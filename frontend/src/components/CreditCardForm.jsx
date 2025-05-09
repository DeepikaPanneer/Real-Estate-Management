import { useState } from "react";

function CreditCardForm({ onSave }) {
  const [cardNumber, setCardNumber] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ cardNumber, billingAddress });
    setCardNumber("");
    setBillingAddress("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
      <input
        type="text"
        placeholder="Card Number"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Billing Address"
        value={billingAddress}
        onChange={(e) => setBillingAddress(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Save Card
      </button>
    </form>
  );
}

export default CreditCardForm;
