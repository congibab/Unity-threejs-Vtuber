using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
using UnityEngine;

public class NetworkManager : MonoBehaviour
{
    private WebSocket ws;

    [SerializeField]
    string IP = "localhost";

    [SerializeField]
    string Port = "5001";

    private static NetworkManager _instance = null;
    public static NetworkManager Instance
    {
        get
        {
            return _instance;
        }
    }

    void Awake()
    {
        _instance = this;
    }


    // Start is called before the first frame update
    void Start()
    {
        ws = new WebSocket("ws://" + IP + ":" + Port);

        ws.OnOpen += (sender, e) =>
        {

        };

        ws.OnMessage += (sender, e) =>
        {
            Debug.Log(e.Data);
        };

        ws.OnError += (sender, e) =>
        {

        };

        ws.OnClose += (sender, e) =>
        {

        };
        ws.Connect();
        var test = new VrmAnimJson();
    }

    // Update is called once per frame
    void Update()
    {
        //ws.Send("pone");
    }
}
