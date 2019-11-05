import http from "k6/http";

export let options = {
  vus: 50,
  duration: "30s"
}

export default function() {
  http.get("https://www.google.com/");
};