import awilix from "awilix";
import { Table } from "sc-game-base";
import {
    InGameConsumer,
    OutGameConsumer,
    UserDealConsumer,
    UserDoubleConsumer,
    UserHitConsumer,
    UserSplitConsumer,
    UserStandConsumer,
} from "./consumers";
import SettleGameConsumer from "./consumers/settle-game-consumer";
import SoloBlackJackBot from "./crons/solo-blackjack-bot";
import SoloBlackJackProcessBetQueue from "./crons/solo-blackjack-process-bet-queue";
import GameCron from "./crons/game-cron";

import { SoloBlackJackBets } from "./models/solo-blackjack-bets";
import { SoloBlackJackRounds } from "./models/solo-blackjack-rounds";
import RoundResultPublisher from "./publishers/round-result-publisher";
import HistoryQuery from "./query-apis/history-query";
import SoloBlackJackSocketRouter from "./routers/solo-blackjack-socket-router";
import HttpRouter from "./routers/http-router";
import { gameNotifications } from 'sc-base-database';

const { asClass, asValue } = awilix;

export default class SoloBlackjackContainerRegistry extends Table.TableContainerRegistry {
    registerModels() {
        super.registerModels();

        this.container.register({
            roundsRepository: asValue(SoloBlackJackRounds),
            betsRepository: asValue(SoloBlackJackBets),
            gameNotificationsRepository: asValue(gameNotifications),
        });
    }

    registerConsumers() {
        super.registerConsumers();

        this.container.register({
            settleGameRoundConsumer: asClass(SettleGameConsumer).singleton().proxy(),
            userStandConsumer: asClass(UserStandConsumer).singleton(),
            userHitConsumer: asClass(UserHitConsumer).singleton(),
            userDoubleConsumer: asClass(UserDoubleConsumer).singleton(),
            userSplitConsumer: asClass(UserSplitConsumer).singleton(),
            userDealConsumer: asClass(UserDealConsumer).singleton(),
            inGameConsumer: asClass(InGameConsumer).singleton(),
            userDisconnectConsumer: asClass(OutGameConsumer).singleton(),
        });
    }

    registerPublishers() {
        super.registerPublishers();

        this.container.register({
            roundResultPublisher: asClass(RoundResultPublisher).singleton(),
        });
    }

    registerRouters() {
        super.registerRouters();

        this.container.register({
            socketRouter: asClass(SoloBlackJackSocketRouter).proxy(),
            httpRouter: asClass(HttpRouter),
        });
    }

    registerCrons() {
        super.registerCrons();

        this.container.register({
            processBetQueue: asClass(SoloBlackJackProcessBetQueue).singleton().proxy(),
            gameCron: asClass(GameCron).singleton().proxy(),
            bot: asClass(SoloBlackJackBot).singleton(),
        });
    }

    registerApis() {
        super.registerApis();

        this.container.register({
            historyQuery: asClass(HistoryQuery).singleton(),
        });
    }
}
