import React, { useState } from "react";
import { Link } from "react-router-dom";
import { convertCurrency } from "../../utilities/currency-services";

export default function CurrencyConverter() {
  const [formData, setFormData] = useState({
    yourCurrency: "",
    targetCurrency: "",
    amount: "",
  });
  const [conversionResult, setConversionResult] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "CAD",
    "IDR",
    "CNY",
    "NZD",
    "SGD",
    "MYR",
    "THB",
    "RUB",
    "CHF",
    "PHP",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await convertCurrency(
        formData.yourCurrency,
        formData.targetCurrency
      );
      setConversionResult(result);

      const rate = result.data;
      const converted = (formData.amount * rate).toFixed(2);
      setConvertedAmount(converted);
    } catch (error) {
      console.error("Error converting currency:", error);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <Link to="/profile">
          <button className="py-2 px-4 bg-black text-white font-bold rounded-full hover:bg-red-600 mt-5 mb-10">Go back to your profile</button>
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Currency Converter</h2>
        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="mb-4">
            <label htmlFor="yourCurrency" className="block font-bold mb-2">
              Your Currency:
            </label>
            <select
              id="yourCurrency"
              name="yourCurrency"
              value={formData.yourCurrency}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select your currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="targetCurrency" className="block font-bold mb-2">
              Target Currency:
            </label>
            <select
              id="targetCurrency"
              name="targetCurrency"
              value={formData.targetCurrency}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select target currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="amount" className="block font-bold mb-2">
              Amount to Convert:
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter the amount"
              min="0"
              step="0.01"
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
          >
            Convert
          </button>
        </form>
        {conversionResult && (
          <div className="mt-6 p-4 text-lg font-bold bg-gray-100 rounded-md">
            <h3 className="text-xl">Conversion Result:</h3>
            <p>Rate: {conversionResult.data.toFixed(2)}</p>
            <p>
              Converted Amount: {convertedAmount} {formData.targetCurrency}
            </p>
          </div>
        )}
      </div>
    </>
  );
}