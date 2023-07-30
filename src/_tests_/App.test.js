import { render, screen } from '@testing-library/react';
import App from "../../src/Components/App"

xtest('renders text', () => {
  render(<App />);
  const textElement = screen.getByText("Station:");
  expect(textElement).toBeInTheDocument();
});
