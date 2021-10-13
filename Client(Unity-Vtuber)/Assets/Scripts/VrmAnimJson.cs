using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[Serializable]
public class VrmAnimJson
{
    //public string time = "";
    public List<VrmAnim> vrmanim = new List<VrmAnim>();
    //public VrmAnim[] vrmanim;
    //public VrmAnim vrmanim = new VrmAnim();


    [Serializable]
    public class VrmAnim
    {
        public string name = "";
        public string bone = "";
        public key keys = new key();
        
    }

    [Serializable]
    public class key
    {
        public Vector3 pos;
        public Quaternion rot;
        public Vector3 scl;
        public long time;
    }
}
