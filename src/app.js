import appConfigs from "./app-configs";
import gameSettings from "./game-settings";
import { startTrace } from "sc-instrument";

startTrace(appConfigs.otel?.enabled, appConfigs.otel?.endpoint, appConfigs.otel?.system, appConfigs.sentry.env, gameSettings.name);

import { Core } from "sc-game-base";

import SoloBlackjackContainerRegistry from "./solo-blackjack-container-registry";
import SoloBlackJackGameData from "./solo-blackjack-game-data";
import SoloBlackJackGameDefinition from "./solo-blackjack-game-definition";
import { generateResult, settle } from "./helpers/dealer";

const run = async () => {
    const gameData = new SoloBlackJackGameData(gameSettings.durations.wholeRound);

    const definition = new SoloBlackJackGameDefinition(gameSettings, generateResult, settle, gameSettings.actions, gameSettings.payouts);

    const container = new SoloBlackjackContainerRegistry().register(appConfigs, definition, gameData);
    const app = new Core.BaseGameApp(definition.name, appConfigs);

    await app.run();
    await app.startGame(container);
};

run();
