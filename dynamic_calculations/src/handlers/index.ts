import Counter from "./counter";
import Newest from "./newest";

class Handler {
  static from(input) {
    const handlerType = input.rule || input.handler;
    if (handlerType === "COUNTER") return Counter;
    if (handlerType === "NEWEST") return Newest;
  }
}

export default Handler;
