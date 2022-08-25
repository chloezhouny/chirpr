import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Signup from '@pages/Signup';
import Login from '@pages/Login';
import Tweets from '@pages/Tweets';
import ComposeTweet from '@pages/ComposeTweet';
import Tweet from '@pages/Tweet';
import Reply from '@pages/Reply';
import { AppProvider } from '@utils/context';

const App = () => (
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Tweets />} />
            <Route path="/tweet/:id" element={<Tweet />} />
            <Route path="/compose/tweet" element={<ComposeTweet />} />
            <Route path="/reply/:id" element={<Reply />} />
            <Route path="/explore" element={<Reply />} />
            <Route path="/notifications" element={<Reply />} />
            <Route path="/messages" element={<Reply />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

export default App;
