import React from 'react';
import { render } from '@testing-library/react';

import PostCreate from './post-create';

describe(' PostCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PostCreate />);
    expect(baseElement).toBeTruthy();
  });
});
