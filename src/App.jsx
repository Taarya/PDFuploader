import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState('');
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded PDFs from the backend
    axios.get('/api/pdf-list')
      .then((response) => {
        setPdfs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching PDF list:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleUpload = () => {
    if (!selectedFile || !username) {
      console.error('Please select a file and enter a username.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', selectedFile);

    // Send the file to the backend along with the username
    axios.post('/api/upload-pdf', formData, {
      params: {
        username: username,
      },
    })
      .then((response) => {
        // File uploaded successfully, update the list of uploaded PDFs
        setPdfs([...pdfs, response.data]);
        setSelectedFile(null);
        setUsername('');
      })
      .catch((error) => {
        console.error('Error uploading PDF:', error);
      });
  };

  return (
    <div className="App">
      <h1>PDF Uploader</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={handleUsernameChange}
      />
      <button onClick={handleUpload}>Upload</button>
      <ul>
        {pdfs.map((pdf, index) => (
          <li key={index}>
            <a href={pdf.url} target="_blank" rel="noopener noreferrer">
              {pdf.filename}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
