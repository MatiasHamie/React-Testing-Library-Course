import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has the correct initial color", () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to Medium Violet Red'
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("should disable on checkbox checked and enable on unchecked button", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });

  // check the checkbox
  fireEvent.click(checkbox);

  // check that the checkbox is checked
  expect(checkbox).toBeChecked();

  // check that button change to disabled after click on checkbox
  expect(colorButton).toBeDisabled();

  // check the checkbox again
  fireEvent.click(checkbox);

  // check that button change to enabled after click again on checkbox
  expect(colorButton).toBeEnabled();
});

test("Disabled button has gray background and reverts to red", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

test("Clicked disabled button has gray background and reverts to blue", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to Midnight Blue" });
  const checkbox = screen.getByRole("checkbox", { name: "Disable Button" });

  // change color to blue
  fireEvent.click(colorButton);

  // disable button
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // enable it again
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("Spaces Before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
