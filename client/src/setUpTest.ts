import "@testing-library/jest-dom";

import { server } from "./mocks/server";

// Establish API mocking before all tests.
before(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
after(() => server.close());
