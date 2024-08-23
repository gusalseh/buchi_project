import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Layout from './layout';
import ImagePage from '../pages/ImagePage';
// 필요한 다른 페이지 컴포넌트도 임포트

const RoutesSetup = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/imagetest" element={<ImagePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default RoutesSetup;
