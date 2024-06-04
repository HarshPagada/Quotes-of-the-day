import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Quotes from './components/Quotes'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from './components/About';

function App() {
  const [search, setSearch] = useState('');

  return (
    <>
      <BrowserRouter>
        <Navbar search={search} setSearch={setSearch} />
        <Routes>
          <Route exact path="/" element={<Quotes search={search} />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
