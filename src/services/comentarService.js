import { data } from "../assets/data/data.js";

const getApiUrl = () => {
  if (typeof window === "undefined") return data.api;
  const base = window.location.origin;
  return data.api.startsWith("/") ? `${base}${data.api}` : data.api;
};

export const comentarService = {
  getComentar: async function () {
    try {
      const url = getApiUrl();
      const response = await fetch(url);
      if (!response.ok) {
        const text = await response.text();
        let err = { status: response.status, message: text };
        try {
          err = JSON.parse(text);
        } catch (_) {}
        return { error: err.message || `Lỗi ${response.status}` };
      }
      const json = await response.json();
      return json;
    } catch (error) {
      return { error: error && error.message };
    }
  },

  addComentar: async function (payload) {
    const comentar = {
      id: payload.id,
      name: payload.name,
      status: payload.status,
      message: payload.message,
      date: payload.date,
      color: payload.color,
    };

    try {
      const url = getApiUrl();
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comentar),
      });

      const text = await response.text();
      let result;
      try {
        result = text ? JSON.parse(text) : {};
      } catch (_) {
        result = { message: text || "Không có phản hồi" };
      }

      if (!response.ok) {
        return {
          ok: false,
          error: result.message || `Lỗi ${response.status}`,
          status: response.status,
        };
      }

      return { ok: true, data: result };
    } catch (error) {
      console.error("Post error:", error);
      return { ok: false, error: error.message };
    }
  },
};
