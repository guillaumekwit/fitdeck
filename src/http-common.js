import axios from "axios";

export default axios.create({
  baseURL: "https://fitdeck.herokuapp.com/api/v1/exercise",
  headers: {
    "Content-type": "application/json"
  }
});