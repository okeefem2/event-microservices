import React, { useState} from 'react';
import axios from 'axios';

import './post-create.scss';

/* eslint-disable-next-line */
export interface PostCreateProps {}

export const PostCreate = (props: PostCreateProps) => {
  const [title, setTitle] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/posts-service', { title });
    setTitle('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="title" className="label">Title</label>
          <div className="control">
            <input type="text" name="title" id="title" className="input" value={title} onChange={e => setTitle(e.target.value)}/>
          </div>
        </div>
        <button className="button is-primary">Submit</button>
      </form>
    </div>
  );
};

export default PostCreate;
