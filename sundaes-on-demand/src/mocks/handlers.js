/**
 * -- Mock Service Worker Handler
 *
 * rest.get('http://localhost:3030/scoops',(req, res, ctx) => {})
 *
 * - Handler Type: rest o graphql
 *
 * - HTTP method to mock: get, post, etc.
 *
 * - Full URL to mock
 *  Response resolver function
 *      req: request object
 *      res: function to create response
 *      ctx: utility to build response
 *
 * more info: https://mswjs.io/docs/basics/response-resolver
 *
 */

import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vainilla", imagePath: "/images/vainilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
];
