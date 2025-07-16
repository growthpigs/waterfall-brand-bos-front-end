import axios, { AxiosError } from "axios";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Log error for debugging
    console.error("API Error:", error.message);

    // Handle specific error cases
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Clear auth token and redirect to login
          localStorage.removeItem("authToken");
          // In a real app, you might redirect to login here
          throw new Error("Authentication required. Please log in.");
        case 403:
          throw new Error("You do not have permission to perform this action.");
        case 404:
          throw new Error("The requested resource was not found.");
        case 500:
          throw new Error("Server error. Please try again later.");
        default:
          // Extract error message from response
          const errorMessage =
            (error.response.data as { message?: string })?.message ||
            (error.response.data as { error?: string })?.error ||
            "An unexpected error occurred.";
          throw new Error(errorMessage);
      }
    } else if (error.request) {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  },
);

export default api;
