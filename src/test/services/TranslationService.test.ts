import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import TranslationService from "../../services/TranslationService";

vi.mock("axios", () => ({
  __esModule: true,
  default: vi.fn(),
}));

const mockedAxios = axios as unknown as {
  mockResolvedValueOnce: vi.Mock;
  mockRejectedValueOnce: vi.Mock;
  mockClear: vi.Mock;
};

describe("TranslationService", () => {
  beforeEach(() => {
    mockedAxios.mockClear();
  });

  it("returns axios response for getTranslationAllLyrics", async () => {
    const mockResponse = {
      data: [{ translations: [{ text: "hola" }] }],
      status: 200,
    };

    mockedAxios.mockResolvedValueOnce(mockResponse);

    const result = await TranslationService.getTranslationAllLyrics(
      "hello",
      "es",
    );

    expect(mockedAxios).toHaveBeenCalledTimes(1);
    expect(mockedAxios).toHaveBeenCalledWith(
      expect.objectContaining({
        url: expect.stringContaining("translate?api-version=3.0&to=es"),
        method: "POST",
        headers: expect.objectContaining({
          Accept: "*/*",
          "Content-type": "application/json",
          "Ocp-Apim-Subscription-Key": expect.anything(),
          "Ocp-Apim-Subscription-Region": expect.anything(),
        }),
        data: [{ Text: "hello" }],
      }),
    );
    expect(result).toBe(mockResponse);
  });

  it("returns an empty string when lyrics is undefined", async () => {
    const result = await TranslationService.getTranslationAllLyrics(
      undefined,
      "es",
    );

    expect(result).toBe("");
    expect(mockedAxios).not.toHaveBeenCalled();
  });

  it("returns a fallback message when getTranslationAllLyrics fails", async () => {
    mockedAxios.mockRejectedValueOnce(new Error("Network failure"));

    const result = await TranslationService.getTranslationAllLyrics(
      "hello",
      "es",
    );

    expect(result).toBe("Translation not available for this track.");
  });

  it("returns response.data for lexicalaTranslation", async () => {
    const mockData = { entry: "translated" };
    mockedAxios.mockResolvedValueOnce({ data: mockData });

    const result = await TranslationService.lexicalaTranslation(
      "Hello",
      "en",
    );

    expect(mockedAxios).toHaveBeenCalledTimes(1);
    const call = mockedAxios.mock.calls[0]?.[0];
    expect(call.url).toContain(
      "text=hello&language=en&analyzed=true&morph=true",
    );
    expect(call.headers).toHaveProperty("x-rapidapi-host");
    expect(call.headers).toHaveProperty("x-rapidapi-key");
    expect(result).toBe(mockData);
  });

  it("returns a fallback string when lexicalaTranslation fails", async () => {
    mockedAxios.mockRejectedValueOnce(new Error("API error"));

    const result = await TranslationService.lexicalaTranslation(
      "hello",
      "fr",
    );

    expect(result).toBe("Translation unavailable.");
  });
});
