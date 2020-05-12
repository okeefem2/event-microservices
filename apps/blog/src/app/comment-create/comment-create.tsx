import React, { useState } from 'react';
import axios from 'axios';

import './comment-create.scss';

/* eslint-disable-next-line */
export interface CommentCreateProps {
  postId: string;
}

export const CommentCreate = ({ postId }: CommentCreateProps) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`/comments-service/posts/${postId}/comments`, { content });
    setContent('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="content" className="label">New Comment</label>
          <div className="control">
            <input type="text" name="content" id="content" className="input" value={content} onChange={e => setContent(e.target.value)}/>
          </div>
        </div>
        <button className="button is-primary">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
