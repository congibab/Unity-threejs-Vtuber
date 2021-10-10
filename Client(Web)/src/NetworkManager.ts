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
            console.log("Message : " + e.data);
        });

        sock.addEventListener("close", e => {
            console.log("接続が閉じられたときに呼び出されるイベント");
        });

        sock.addEventListener("error", e => {
            console.log("エラーが発生したときに呼び出されるイベント");
        });

        console.log("WepSocket client inti");
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }
}