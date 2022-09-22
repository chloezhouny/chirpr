import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import Signup from '@pages/Signup';
import Login from '@pages/Login';
import Tweets from '@pages/Tweets';
import ComposeTweet from '@pages/ComposeTweet';
import Tweet from '@pages/Tweet';
import Reply from '@pages/Reply';
import Profile from '@pages/Profile';
import EditProfile from '@pages/EditProfile';
import Follow from '@pages/Follow';
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
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings/profile" element={<EditProfile />} />
            <Route path="/follow" element={<Follow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

export default App;
