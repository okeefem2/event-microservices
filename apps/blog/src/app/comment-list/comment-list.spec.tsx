import React from 'react';
import { render } from '@testing-library/react';

import CommentList from './comment-list';

describe(' CommentList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentList />);
    expect(baseElement).toBeTruthy();
  });
});
