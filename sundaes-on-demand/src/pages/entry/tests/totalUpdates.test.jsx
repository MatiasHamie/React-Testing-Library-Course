import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update coop subtotal when scoops change", async () => {
  // el wrapper puede ser de redux, router, etc.
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  // por defecto busca el texto LITERAL que pones, por eso le pongo exact false
  const scoopsSubtotal = screen.getByText(/scoops total/i, { exact: false });
  expect(scoopsSubtotal).toHaveTextContent(/0.00/i);

  // update vainilla scoops to 1 and check the subtotal
  // el spinButton es el boton que tiene flechitas para arriba y para abajo
  // y va subiendo y bajando el numero
  // es ASYNC porque no va a aparecer en la pantalla hasta q cargue los datos de las opciones
  // de scoops q hay
  const vainillaInput = await screen.findByRole("spinbutton", {
    name: /vainilla/i,
  });

  userEvent.clear(vainillaInput);
  userEvent.type(vainillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent(/2.00/i);

  // update chocolate scoops to 2 and check the subtotal again
  const chocolateScoops = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });

  userEvent.clear(chocolateScoops);
  userEvent.type(chocolateScoops, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  // render parent component
  render(<Options optionType="toppings" />);

  // make sure total starts out at $0.00
  const toppingsTotal = screen.getByText(/toppings total/i, { exact: false });
  expect(toppingsTotal).toHaveTextContent(/0.00/i);

  // add cherries and check subtotal
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });

  userEvent.click(cherriesCheckbox);
  expect(toppingsTotal).toHaveTextContent(/1.50/i);

  // add hot fudge and check subtotal
  const hotFudgeCheckbox = screen.getByRole("checkbox", { name: /hot fudge/i });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent(/3.00/i);

  // remove hot fudge and check subtotal
  userEvent.click(hotFudgeCheckbox);
  expect(toppingsTotal).toHaveTextContent(/1.50/i);
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    // Test that the total starts out at $0.00
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandTotal).toHaveTextContent("0.00");
  });

  test("grand total updates properly if scoop is added first", async () => {
    // Test that the total starts out at $0.00
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vainillaInput = await screen.findByRole("spinbutton", {
      name: /vainilla/i,
    });

    userEvent.clear(vainillaInput);
    userEvent.type(vainillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // add cherries and check grand total
    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    const vainillaInput = await screen.findByRole("spinbutton", {
      name: /vainilla/i,
    });

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vainillaInput);
    userEvent.type(vainillaInput, "2");

    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /Cherries/i,
    });

    const vainillaInput = await screen.findByRole("spinbutton", {
      name: /vainilla/i,
    });

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vainillaInput);
    userEvent.type(vainillaInput, "2");

    userEvent.clear(vainillaInput);
    userEvent.type(vainillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
