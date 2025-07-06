import { EventPayload } from "./types";
import { Action } from "./models/action";

async function calculate(event: EventPayload) {
  const { actionid } = JSON.parse(event.body);
  const action = await Action.getById(actionid);
  return await calculateAction(action);
}

async function calculateAction(action: any): Promise<any> {
  // If the action has data and no handler, return the data directly
  if (action.data && !action.handler) {
    return action.data;
  }
  
  // If the action has a handler, get child results and process
  if (action.handler && typeof action.handler.handle === "function") {
    const childActions = await action.getChildActions();
    let childResults: any[] = [];
    if (childActions && childActions.length > 0) {
      childResults = await Promise.all(childActions.map((ca: any) => calculateAction(ca)));
    }
    return action.handler.handle(...childResults);
  }
  
  // If no handler and no data, return empty object
  return {};
}

export default calculate;
