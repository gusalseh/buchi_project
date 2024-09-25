import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Layout from './layout';
import ImagePage from '../pages/ImagePage';
import ConsentPage from '../pages/ConsentPage';
import FilterResultPage from '../pages/FilterResultPage';
import SpotDetailPage from '../pages/SpotDetailPage';

const RoutesSetup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/spotdetail/:id" element={<SpotDetailPage />} />
          <Route path="/filterResult" element={<FilterResultPage />} />
          <Route path="/imagetest" element={<ImagePage />} />
        </Route>
        <Route path="/consent" element={<ConsentPage />} />
      </Routes>
    </Router>
  );
};

export default RoutesSetup;
