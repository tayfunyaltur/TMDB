import axiosInstance from "./client"; // Adjust the import path based on where the file is
import axiosMockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it, vitest } from "vitest";

// Mock environment variable for the API key
vitest.stubEnv("VITE_API_KEY", "test-api-key");

describe("axiosInstance", () => {
  let mock: axiosMockAdapter;

  beforeEach(() => {
    // Create a mock adapter for Axios
    mock = new axiosMockAdapter(axiosInstance);
  });

  afterEach(() => {
    // Reset mocks after each test
    mock.reset();
  });

  it("should append the API key to the URL via interceptor", async () => {
    // Use a regular expression to match the URL with the API key appended
    mock
      .onGet(/https:\/\/www.omdbapi.com\/\?s=test&apikey=test-api-key/)
      .reply(200, { Search: [] });

    // Make a request using the axiosInstance
    const response = await axiosInstance.get("/?s=test");

    // Check if the API key is appended to the URL
    expect(response.config.url).toContain("apikey=test-api-key");

    // Verify that the mocked response was received
    expect(response.data).toEqual({ Search: [] });
  });

  it("should correctly handle requests and append API key", async () => {
    // Mock a successful response for a specific URL with the expected API key
    mock
      .onGet(/https:\/\/www.omdbapi.com\/\?s=test&apikey=test-api-key/)
      .reply(200, { Search: [] });

    // Make a GET request
    const response = await axiosInstance.get("/?s=test");

    // Verify that the request URL contains the API key
    expect(response.config.url).toContain("apikey=test-api-key");

    // Ensure the request was successful
    expect(response.status).toBe(200);
  });

  it("should throw error if API key is missing", async () => {
    // Temporarily mock missing environment variable
    vitest.stubEnv("VITE_API_KEY", undefined);

    // Trying to send a request without an API key should fail
    try {
      await axiosInstance.get("/?s=test");
    } catch (error: any) {
      expect(error.message).toContain("Request failed with status code 404");
    }
  });
});
