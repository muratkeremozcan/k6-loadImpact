// sample script that uses all different types of metrics, and sets different types of thresholds for them:
import http from "k6/http";
import { check } from "k6";
import { Trend, Rate, Counter, Gauge } from "k6/metrics";

export let TrendRTT = new Trend("RTT");
export let RateContentOK = new Rate("Content OK");
export let GaugeContentSize = new Gauge("ContentSize");
export let CounterErrors = new Counter("Errors");

export let options = {
	thresholds: {
    // A Trend metrics that gets fed with response time samples, and which has the following threshold criteria:
    // 99th percentile response time must be below 300 ms
    // 70th percentile response time must be below 250 ms
    // Average response time must be below 200 ms
    // Median response time must be below 150 ms
    // Minimum response time must be below 100 ms
    "RTT": [
      "p(99)<300",
      "p(70)<250",
      "avg<200",
      "med<150",
      "min<100",
    ],
    // A Rate metric that keeps track of how often the content returned was OK. 
    // This metric has one success criteria: content must have been OK more than 95% of the time.
    "Content OK": ["rate>0.95"],
    // // A Gauge metric that contains the latest size of the returned content. 
    // The success criteria for this metric is that the returned content must be smaller than 4000 bytes.
    "ContentSize": ["value<4000"],
    // // A Counter metric that keeps track of the total number of times content returned was not OK. 
    // The success criteria here is that content can't have been bad more than 99 times.
    "Errors": ["count<100"]
  }
};

export default function() {  
  let res = http.get("https://loadimpact.com");
  let contentOK = res.html("h1").text().includes("Load Impact");
  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);
};