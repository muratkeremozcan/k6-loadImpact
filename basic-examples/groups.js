import { group } from "k6";

export default function() {
  group("user flow: returning user", function() {
    group("visit homepage", function() {
      // load homepage resources
    });
    group("login", function() {
      // perform login
    });
  });
};