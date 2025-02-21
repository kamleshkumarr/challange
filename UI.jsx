import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [responseData, setResponseData] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-api-url/bfhl', JSON.parse(jsonInput));
      setResponseData(response.data);
    } catch (error) {
      console.error('Error submitting JSON:', error);
    }
  };

  const handleDropdownChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    let result = {};
    if (selectedOptions.includes('Alphabets')) {
      result.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes('Numbers')) {
      result.numbers = responseData.numbers;
    }
    if (selectedOptions.includes('Highest alphabet')) {
      result.highest_alphabet = responseData.highest_alphabet;
    }
    return JSON.stringify(result, null, 2);
  };

  return (
    <div>
      <h1>Flex-It-Out</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON here'
        />
        <button type='submit'>Submit</button>
      </form>
      <select multiple onChange={handleDropdownChange}>
        <option value='Alphabets'>Alphabets</option>
        <option value='Numbers'>Numbers</option>
        <option value='Highest alphabet'>Highest Alphabet</option>
      </select>
      <pre>{renderResponse()}</pre>
    </div>
  );
};

export default App;
