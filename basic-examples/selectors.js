import {parseHTML} from "k6/html";
import http from "k6/http";

export default function() {
  const res = http.get("https://loadimpact.com");
  const doc = parseHTML(res.body);
  const pageTitle = doc.find('head title').text();
  const langAttr = doc.find('html').attr('lang');
};