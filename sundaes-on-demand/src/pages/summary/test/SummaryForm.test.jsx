import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { SummaryForm } from "../SummaryForm";

import userEvent from "@testing-library/user-event";
// https://github.com/testing-library/user-event
// npm i @testing-library/user-event @testing-library/dom
// userEvent hay que instalarlo aparte, la diferencia entre esto
// y fireEvent, es que si un user 'clickea' un checkbox,
// tmb se fija que si hace click en el label se ponga
// checked y cosas de ese estilo

/**
 * -- 'screen' Query Methods --
 * command[All]ByQueryType
 *
 * - Comandos segun lo que se desee:
 *  get: espera que el elemento ESTE en el DOM
 *  query: espera que el elemento NO este en el DOM
 *  find: espera que el elemanto aparezca pero async
 *
 * - [All] (opcional):
 *  Si se espera mas de una coincidencia, se debe poner
 *  caso contrario no hace falta
 *
 * - QueryType
 *  Role: preferible, se asegura q sea accesible
 *  AltText: para imagenes
 *  Text: elementos que se estan mostrando q no tiene un rol especial
 *        ni son interactivos
 *
 *  Form Elements:
 *  - PlaceholderText
 *  - LabelText
 *  - DisplayValue
 *
 * - Referencias:
 * https://testing-library.com/docs/queries/about/#priority
 * https://testing-library.com/docs/react-testing-library/cheatsheet/
 * https://testing-library.com/docs/queries/about/
 */

test("Initial conditions, checkbox unchecked and button disabled", () => {
  render(<SummaryForm />);

  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });

  // checkbox should start unchecked
  expect(checkbox).not.toBeChecked();

  const button = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  // button starts disabled
  expect(button).toBeDisabled();

  // checkbox should be unchecked on click
  // fireEvent.click(checkbox);
  userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("Checkbox should enable/disable 'Confirm Order' button", () => {
  render(<SummaryForm />);

  const button = screen.getByRole("button", {
    name: /Confirm Order/i,
  });
  const checkbox = screen.getByRole("checkbox", {
    name: /Terms and Conditions/i,
  });

  // click on checkbox should enable the button
  // fireEvent.click(checkbox);
  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  // click again on checkbox should disable the button
  // fireEvent.click(checkbox);
  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);
  // popover starts out hidden
  // para probar que algo no esta, no se usa getBy
  // https://testing-library.com/docs/react-testing-library/cheatsheet/
  // ahi puedo ver que de todos los getBy, findBy, etc.
  // veo que el UNICO q no tira un error con throw es queryBy,
  // devuelve un NULL
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument(); // esto es de JEST no es de RTL, pero nos sirve

  // popover appears upon mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  // popover disappears when we mouse out
  userEvent.unhover(termsAndConditions);

  // OJO, ESTO FALLA, tira el error de "debe estar envuelto en un act(..)"
  // const nullPopover2 = screen.queryByText(/no ice cream will actually be delivered/i)
  // expect(nullPopover).not.toBeInTheDocument();
  // RTL en su doc, nos dice que todos sus metodos ya tienen el act() adentro
  // por ende lo unico q hay q hacer es usar un metodo asincrono de ellos
  // en este caso es el waitFor..... y el MISMO ya tiene el expect

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
