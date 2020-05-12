import React from 'react';
import { render } from '@testing-library/react';

import CommentCreate from './comment-create';

describe(' CommentCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommentCreate />);
    expect(baseElement).toBeTruthy();
  });
});
