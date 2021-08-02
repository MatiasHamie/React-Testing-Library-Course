// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utils";
// import { OrderDetailsProvider } from "../../../contexs/OrderDetails";

import Options from "../Options";

/**
 * Cuando estamos esperando a que aparezca algo de forma async
 * necesitamos usar await y findBy
 */

test("displays images for each scoop from the server", async () => {
  render(<Options optionType="scoops" />);

  // find the images
  // scoop$ signfica que TERMINA con 'scoop'
  //   const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vainilla scoop"]);
});

test("displays images for each topping from the server", async () => {
  render(<Options optionType="toppings" />);

  const toppingsImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingsImages).toHaveLength(3);

  const altText = toppingsImages.map((element) => element.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
