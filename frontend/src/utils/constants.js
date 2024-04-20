let api_root = "";

// api_root = "http://localhost:8017/";

// eslint-disable-next-line no-undef
if (process.env.BUILD_MODE === "dev") {
  api_root = "http://localhost:8017/";
} else {
  api_root = "https://trello-backend-podq.onrender.com";
}

export const API_ROOT = api_root;