using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class VrmAnimJson
{
    public VrmAnim[] vrmanim = new VrmAnim[System.Enum.GetValues(typeof(HumanBodyBones)).Length];

    [Serializable]
    public class VrmAnim
    {
        public string name = "";
        public string bone = "";
        public key keys;
    }

    [Serializable]
    public class key
    {
        public float[] pos;
        public float[] rot;
        public float[] scl;
        public long time;
    }
}
