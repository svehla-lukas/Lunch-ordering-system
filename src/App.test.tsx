import { render, screen } from '@testing-library/react'

import React from 'react'

test('renders learn react link', () => {
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})
