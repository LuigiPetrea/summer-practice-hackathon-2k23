import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import "./App.css"

function App() {
  const [codeName, setCodeName] = useState('');
  const [codePairs, setCodePairs] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      regenerateCodes();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const generateCode = () => {
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += Math.floor(Math.random() * 10);
    }
    return code;
  };

  const addCodePair = (event) => {
    event.preventDefault();
    setShowForm(false);
    if (codeName.trim() !== '') {
      const code = generateCode();
      setCodePairs([...codePairs, { name: codeName, code }]);
      setCodeName('');
    }
  };

  const deleteCodePair = (index) => {
    const updatedCodePairs = codePairs.filter((_, i) => i !== index);
    setCodePairs(updatedCodePairs);
  };

  const regenerateCodes = () => {
    const updatedCodePairs = codePairs.map((pair) => ({
      ...pair,
      code: generateCode(),
    }));
    setCodePairs(updatedCodePairs);
    
  };
  const handleAddClick = () => {
    setShowForm(true);
}
  const handleCancelClick = () => {
    setShowForm(false);
  }
  return (
    <div className="mfa-app" align="center">
      <h1 id='title'>Levi's Authentificator</h1>
      <h2>Available MFA code pairs: </h2>
    <button onClick={handleAddClick}>

    <FaPlus />
    
    </button>

      {showForm && (
      <form onSubmit={addCodePair}>
        <input
          type="text"
          id="codeName"
          placeholder="Name Code"
          value={codeName}
          onChange={(e) => setCodeName(e.target.value)}
          />
          <br />
        <button type="submit">Add</button>
        <button onClick={handleCancelClick}>Cancel</button>
      </form>
        )}
     <ul>
        {codePairs.map((pair, index) => (
          <li key={index}>
            {pair.name}: <code>{pair.code}</code>
            <button onClick={() => deleteCodePair(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
