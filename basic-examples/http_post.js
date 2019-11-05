import http from "k6/http";

export default function() {
  var url = "http://test.loadimpact.com/login";
  var payload = JSON.stringify({ email: "aaa", password: "bbb" });
  var params =  { headers: { "Content-Type": "application/json" } }
  http.post(url, payload, params);
}