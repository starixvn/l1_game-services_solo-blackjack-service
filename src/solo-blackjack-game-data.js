import { Table } from "sc-game-base";

export default class SoloBlackJackGameData extends Table.TableGameData {
    constructor(remainingTime) {
        super(remainingTime);
        this.betId = 0;
    }
}
