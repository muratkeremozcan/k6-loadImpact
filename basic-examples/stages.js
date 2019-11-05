import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
 stages: [
    { duration: "20s", target: 20 },
    { duration: "30s", target: 50 },
    { duration: "10s", target: 10 },
  ]
};

export default function() {
  let res = http.get("https://preview-buildingoperator.siemens.com");
  check(res, {
    "status was 200": (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 500 // check for transactions to be below 500ms
  });
  sleep(1);
}