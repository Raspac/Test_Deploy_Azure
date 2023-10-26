import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Result } from './components/result.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;