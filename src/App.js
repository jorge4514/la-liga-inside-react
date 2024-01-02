import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlayersPage from './components/playersPage';
import NavigationBar from './components/navigationBar';

const App = () => {
  return (
    <BrowserRouter basename="/app">
      <NavigationBar />
      <Routes>
        <Route index element={<PlayersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

