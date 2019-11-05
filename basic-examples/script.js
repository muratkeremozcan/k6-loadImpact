import http from "k6/http";
import { sleep } from "k6";

export let options = {
  // for 15 seconds ramps up 10 users, adds users gradually
  // adds a total of 40 users in the next 15 seconds, and up to 50 in the next 30 seconds..
  // lowers down the users to 10 and 5 in the next 15 second iterations
  stages: [
    { duration: "15s", target: 10 },
    { duration: "15s", target: 140 }
  ]
}

export default function() {
  http.get("http://test.loadimpact.com");
  sleep(5);
};