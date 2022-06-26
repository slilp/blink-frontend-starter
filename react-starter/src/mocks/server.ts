import { setupServer } from "msw/node";
import { rest } from "msw";
import handlers from "./handlers";

// This configures a request mocking server with the given request handlers.
const server = setupServer(...handlers);
export { server, rest };
