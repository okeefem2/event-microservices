import React from 'react';
import PostCreate from './post-create/post-create';
import './app.scss';
import PostList from './post-list/post-list';
export const App = () => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Create Post</h1>
        <PostCreate/>
        <hr />
        <h1>Posts</h1>
        <PostList />
      </div>
    </>
  );
};

export default App;
