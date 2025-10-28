import api from "./api";

export const userService = {
  addPoints(points) {
    return api.put("points", { points });
  },
  getLeaderboard() {
    return api.get("leaderboard");
  }
};
