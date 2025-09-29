import './App.css'
import { useState } from 'react';

// Main App component: a small mortgage calculator
function App() {

  // component-level state using React hooks
  // `balance` holds the loan principal entered by the user as a string
  // `setBalance` updates the balance state
  const [balance, setBalance] = useState('');

  // `rate` holds the annual interest rate (as a number or string depending on input handling)
  // `setRate` updates the rate state
  const [rate, setRate] = useState('');

  // `term` is the loan term in years (default to 15). We store it as a number.
  const [term, setTerm] = useState(15);

  // `output` is the text shown in the UI with the calculated monthly payment
  const [output, setOutput] = useState('');

  
  function calculate() {

    // Parse the user-entered values into numbers
    const balanceNum = parseFloat(balance);
    const rateNum = parseFloat(rate);

    // monthly interest rate (annual rate divided by 12, converting percent -> decimal)
    const monthlyRate = rateNum / 100 / 12;

    // total number of monthly payments
    const numberOfPayments = term * 12;

    // standard amortization formula components:
    // payment = P * r * (1 + r)^n / ((1 + r)^n - 1)
    const numerator =
      balanceNum * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    const monthlyPayment = numerator / denominator;

    // If the calculated payment is a finite number, format it and set output.
    // Otherwise (e.g. empty fields, zero division), clear the output.
    if (isFinite(monthlyPayment)) {
      setOutput(`$${monthlyPayment.toFixed(2)} is your payment`);
    } else {
      setOutput('');
    }
  }

  return (
    <>
      <h1>Mortgage Calculator</h1>

      {/* input for loan principal (balance) - stored as string from the input element */}
      <input
        type="number"
        data-testid="balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />

      {/* input for annual interest rate (percentage). We coerce value to Number on change */}
      <input
        type="number"
        data-testid="rate"
        step="0.01"
        value={rate}
        onChange={(e) => setRate(Number(e.target.value))}
      />

      {/* select for loan term in years (15 or 30) */}
      <select
        data-testid="term"
        value={term}
        onChange={(e) => setTerm(Number(e.target.value))}
      >
        <option value="15">15 Years</option>
        <option value="30">30 Years</option>
      </select>

      {/* clicking this button triggers the mortgage calculation */}
      <button data-testid="submit" onClick={calculate}>
        submit
      </button>

      {/* output area that displays the calculated monthly payment */}
      <div id="output" data-testid="output">{output}</div>
    </>
  );
}

export default App
