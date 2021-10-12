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

    [SerializeField]
    Animator _animator;

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

        for(int i = 0; i < 55; i++ )
        {
            Transform bone = _animator.GetBoneTransform((HumanBodyBones) 10 );
            float[] rot = new float[4] { bone.localRotation.x, bone.localRotation.y, bone.localRotation.z, bone.localRotation.w};
            Debug.Log(bone.localRotation);
        }
    }

    // Update is called once per frame
    void Update()
    {
        //ws.Send("pone");
    }
}
