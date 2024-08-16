const axios = require("axios");

class ApiConfig {
  constructor() {
    this.url = "http://20.244.56.144/test";
    this.headers = {
      "Content-Type": "application/json",
    };
    this.token = "";
    this.tokenExpiry = null;
  }

  async setAuthorizationToken() {
    const res = await axios.post(this.url + "/auth", {
      companyName: "goMart",
      clientID: "ab455f49-2358-435c-9f76-e379107952a8",
      clientSecret: "rtuJnJHBRnVQzyjH",
      ownerName: "Pramod",
      ownerEmail: "pramod.toleti@sasi.ac.in",
      rollNo: "21K61A05H2",
    });

    this.token = res.data.access_token;
    const expiresIn = res.data.expires_in;

    this.tokenExpiry = new Date().getTime() + expiresIn * 1000;

    this.headers = {
      ...this.headers,
      Authorization: `Bearer ${this.token}`,
    };
  }

  isTokenExpired() {
    return !this.tokenExpiry || this.isTokenExpired < new Date().getTime();
  }

  async getProductsByCategory(endpoint) {
    if (this.isTokenExpired() || !this.token) {
      await this.setAuthorizationToken();
    }
    return axios.get(this.url + endpoint, {
      headers: this.headers,
    });
  }
}

const apiConfig = new ApiConfig();

module.exports = apiConfig;
