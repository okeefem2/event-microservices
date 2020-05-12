import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './post-list.scss';
import CommentCreate from '../comment-create/comment-create';
import CommentList from '../comment-list/comment-list';

/* eslint-disable-next-line */
export interface PostListProps {}

export const PostList = (props: PostListProps) => {
  const [posts, setPosts] = useState<{ [k: string]: { id: string, title: string, comments: { id: string, content: string }[] }}>({});

  const fetchPosts = async () => {
    const res = await axios.get('/query-service/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);
  const renderedPosts = Object.values(posts).map(p => (
    <div className="card" key={p.id}>
      <div className="card-header">
        <p className="card-header-title">
          {p.title}
        </p>
      </div>
      <div className="card-body">
        <CommentList comments={p.comments}/>
        <CommentCreate postId={p.id}/>
      </div>
    </div>
  ));

  return (
    <div className="container">
      {renderedPosts}
    </div>
  );
};

export default PostList;
