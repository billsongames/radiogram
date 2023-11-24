import { render } from '@testing-library/react';
import App from "../../src/Components/App"

describe("App render", () => {

  xtest('App renders correctly', () => {
    const { asFragment } =  render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
})