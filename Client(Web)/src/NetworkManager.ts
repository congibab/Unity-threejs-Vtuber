import { Game } from "./Game";

export class NetworkManager {
    private static _instance: NetworkManager;

    private constructor() {
        const sock = new WebSocket("ws://127.0.0.1:5001");

        sock.addEventListener("open", e => {
            console.log("接続が開かれたときに呼び出されるイベント");
            Game.Instance.test();
        });

        sock.addEventListener("message", e => {


            let Data: VrmAnim[] = JSON.parse(e.data).vrmanim;
            console.log(Data[0].name);

        });

        sock.addEventListener("close", e => {
            console.log(e);
        });

        sock.addEventListener("error", e => {
            console.log(e);
        });

        console.log("WepSocket client inti");
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}

export interface VrmAnim {
    name: string;
    bone: string;
    keys: key[];
}

export interface key {
    pos: number[];
    rot: number[];
    scl: number[];
    time: number;
}