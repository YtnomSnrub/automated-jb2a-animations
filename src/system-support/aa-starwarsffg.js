import { trafficCop }       from "../router/traffic-cop.js"
import AAHandler            from "../system-handlers/workflow-data.js";
import { AnimationState }   from "../AnimationState.js";
import { getRequiredData }  from "./getRequiredData.js";

export function systemHooks() {
    Hooks.on("ffgDiceMessage", async (roll) => {
        if (!AnimationState.enabled) { return };

        let compiledData = await getRequiredData({
            item: roll.data,
            workflow: roll,
        })
        if (!compiledData.item) { return; }
        runStarwarsffg(compiledData)
    });
}

async function runStarwarsffg(input) {
    const handler = await AAHandler.make(input)
    if (!handler) { return; }
    trafficCop(handler);
}