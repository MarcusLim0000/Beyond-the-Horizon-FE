import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { convertCurrency } from '../../utilities/currency-services';
import "./currencyCon.css";

export default function CurrencyConverter() {
  const [formData, setFormData] = useState({
    yourCurrency: '',
    targetCurrency: '',
    amount: '',
  });
  const [conversionResult, setConversionResult] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const currencies = ["USD", "EUR", "GBP", "JPY", "AUD", "CAD", "IDR", "CNY", "NZD", "SGD", "MYR", "THB", "RUB", "CHF", "PHP"];

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
      const result = await convertCurrency(formData.yourCurrency, formData.targetCurrency);
      setConversionResult(result);

      // Perform the calculation on the frontend
      const rate = result.data; // Use the `data` field from the API response
      const converted = (formData.amount * rate).toFixed(2); // Format to 2 decimal places
      setConvertedAmount(converted);

    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <>
      <nav>
        <Link to='/profile'>
          <button>Go back to profile</button>
        </Link>
      </nav>
      <div className="currency-container">
        <h2>Currency Converter</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="yourCurrency">Your Currency:</label>
            <select
              id="yourCurrency"
              name="yourCurrency"
              value={formData.yourCurrency}
              onChange={handleChange}
              required
            >
              <option value="">Select your currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="targetCurrency">Target Currency:</label>
            <select
              id="targetCurrency"
              name="targetCurrency"
              value={formData.targetCurrency}
              onChange={handleChange}
              required
            >
              <option value="">Select target currency</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="amount">Amount to Convert:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter the amount"
              min="0"
              required
            />
          </div>
          <button type="submit">Convert</button>
        </form>
        {conversionResult && (
          <div className='result'>
            <h3>Conversion Result:</h3>
            <p>Rate: {conversionResult.data.toFixed(2)}</p>
            <p>Converted Amount: {convertedAmount} {formData.targetCurrency}</p>
          </div>
        )}
      </div>
    </>
  );
}
