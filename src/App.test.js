import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn first page", () => {
  render(<App />);
  const titles = screen.getAllByText(/ROWEND36/i);
  expect(titles.length).toBeGreaterThanOrEqual(1);
  expect(titles[0]).toBeInTheDocument();
});
