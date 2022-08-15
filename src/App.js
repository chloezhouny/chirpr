import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Signup from '@pages/Signup';
import Login from '@pages/Login';
import Tweets from '@pages/Tweets';
import Reply from '@pages/Reply';
import { AppProvider } from '@utils/context';

const App = () => (
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Tweets />} />
            <Route path="/reply/:id" element={<Reply />} />
            <Route path="/explore" element={<Reply />} />
            <Route path="/notifications" element={<Reply />} />
            <Route path="/messages" element={<Reply />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

export default App;
