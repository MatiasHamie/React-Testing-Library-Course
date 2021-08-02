// import { render, screen, waitFor } from "@testing-library/react";
import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings routes", async () => {
  /**
   * Los handlers ya estan configurados, PERO aca los configuro
   * para q me devuelvan un error aproposito. (al decir configurar
   * tambien me refiero a resetear)
   */
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  // waitFor se usa cuando queres q pase algo que se tiene q dar mas de una vez
  // por ej, si usabamos solamente findBy, al aparecer 1 de los 2 alerts
  // era tomado como valido, pero nosotros queriamos que sean 2.
  // por eso usamos waitFor para eso
  await waitFor(async () => {
    // esto daba error de que se solapaban los act(), no se porque
    // const alerts = await screen.findAllByRole("alert", {
    //   name: /an unexpected error ocurred. please try again later./i,
    // });
    // esto funciona ok
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});
