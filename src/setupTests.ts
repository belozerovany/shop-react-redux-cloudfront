// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import fetch from "cross-fetch";
import { server } from "~/mocks/server";

// Native undici fetch bypasses MSW's Node interceptors; cross-fetch uses http(s).
globalThis.fetch = fetch as typeof globalThis.fetch;

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
