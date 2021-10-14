using System.Collections;
using System.Collections.Generic;
using WebSocketSharp;
using WebSocketSharp.Net;
using UnityEngine;
using static VrmAnimJson;
using System;

public class NetworkManager : MonoBehaviour
{
    private WebSocket ws;

    [SerializeField]
    string IP = "localhost";

    [SerializeField]
    string Port = "5001";

    [SerializeField]
    Animator _animator;

    private VrmAnimJson _vrmAnimjson;
    private string TempJson;

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

        _vrmAnimjson = new VrmAnimJson();
        for (int i = 0; i < System.Enum.GetValues(typeof(HumanBodyBones)).Length - 1; i++)
        {
            //Transform bone = _animator.GetBoneTransform((HumanBodyBones)i);

            //if (bone == null)
            //    continue;

            _vrmAnimjson.vrmanim.Add(new VrmAnim());
        }
    }

    // Update is called once per frame
    void Update()
    {

        for (int i = 0; i < System.Enum.GetValues(typeof(HumanBodyBones)).Length - 1; i++)
        {
            Transform bone = _animator.GetBoneTransform((HumanBodyBones)i);
            if (bone == null)
                continue;

            Vector3 pos = bone.localPosition;
            Quaternion rot = bone.localRotation;
            Vector3 scl = bone.localScale;

            _vrmAnimjson.vrmanim[i].keys.pos = pos;
            _vrmAnimjson.vrmanim[i].keys.rot = rot;
            _vrmAnimjson.vrmanim[i].keys.scl = scl;

            //test.time = (DateTime.Now).ToString();
            _vrmAnimjson.vrmanim[i].name = ((HumanBodyBones)i).ToString();

            //Debug.Log(test.vrmanim[i].name + " : " + test.vrmanim[i].keys.rot);
        }

        string Data = JsonUtility.ToJson(_vrmAnimjson);
        if (Data == TempJson)
        {
            return;
        }
        TempJson = Data;
        ws.Send(Data);
    }
}
