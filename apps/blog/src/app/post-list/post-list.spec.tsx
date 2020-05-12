import React from 'react';
import { render } from '@testing-library/react';

import PostList from './post-list';

describe(' PostList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostList />);
    expect(baseElement).toBeTruthy();
  });
});
