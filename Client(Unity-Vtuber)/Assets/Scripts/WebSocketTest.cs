using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
using UnityEngine;

public class WebSocketTest : MonoBehaviour
{
    private WebSocket ws;

    // Start is called before the first frame update
    void Start()
    {
        ws = new WebSocket("ws://localhost:5001/");


        ws.OnOpen += (sender, e) =>
        {

        };

        ws.OnMessage += (sender, e) =>
        {
            Debug.Log(e.Data);
        };

        ws.OnClose += (sender, e) =>
        {

        };

        ws.Connect();
        ws.Send("pone");
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
