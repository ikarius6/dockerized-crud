import React, { useState, useEffect } from 'react';

function App() {
  const [examples, setExamples] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    fetchExamples();
  }, []);

  const fetchExamples = async () => {
    try {
      const response = await fetch('http://localhost:3000/examples');
      const data = await response.json();
      setExamples(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addExample = async () => {
    try {
      const newExample = { name, value: Number(value) };
      await fetch('http://localhost:3000/examples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExample),
      });
      fetchExamples();
      setName('');
      setValue('');
    } catch (error) {
      console.error('Error adding example:', error);
    }
  };

  const updateExample = async (id) => {
    try {
      const updatedExample = { name, value: Number(value) };
      await fetch(`http://localhost:3000/examples/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedExample),
      });
      fetchExamples();
      setName('');
      setValue('');
    } catch (error) {
      console.error('Error updating example:', error);
    }
  };

  const deleteExample = async (id) => {
    try {
      await fetch(`http://localhost:3000/examples/${id}`, {
        method: 'DELETE',
      });
      fetchExamples();
    } catch (error) {
      console.error('Error deleting example:', error);
    }
  };

  return (
    <div className="App">
      <h1>Examples</h1>
      <ul>
        {examples.map((example) => (
          <li key={example._id}>
            {example.name} - {example.value}
            <button onClick={() => deleteExample(example._id)}>Delete</button>
            <button onClick={() => updateExample(example._id)}>Update</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={addExample}>Add</button>
      </div>
    </div>
  );
}

export default App;
