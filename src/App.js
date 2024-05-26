import { useState } from "react";
import RenderUpdated from "./component/RenderUpdated";

function App() {
  const [obj, setObj] = useState({
    "slug": "diya-foundation",
    "name": "Diya Foundation",
    "registration_number": "386/98-99",
    "auditor_name": "Das Kumar And Company",
    "created_at": "2013-02-08T09:28:51.000Z",
    "updated_at": "2020-02-25T06:11:35.814Z",
    "external_profiles": [{
    "label": "Website",
    "uri": "http://www.diyafoundation-india.org/Site/index.html"
    }, {
    "label": "Youtube",
    "uri": "http://www.youtube.com/watch?v=DezbmReWMf0"
    }],
    "tags": ["hoh18", "lfc19", "tbpp", "housie19", "gfc2020", "housie18"]
    });
  const [patches, setPatches] = useState( [
    {
        "op": "replace",
        "path": "/tags/5",
        "value": "spbm18"
    },
    {
        "op": "replace",
        "path": "/tags/4",
        "value": "bengaluru10k-18"
    },
    {
        "op": "replace",
        "path": "/tags/3",
        "value": "lfc18-wow2"
    },
    {
        "op": "replace",
        "path": "/tags/2",
        "value": "tcs10k-18"
    },
    {
        "op": "replace",
        "path": "/tags/1",
        "value": "lfc18-cbp"
    },
    {
        "op": "replace",
        "path": "/tags/0",
        "value": "lfc18"
    },
    {
        "op": "add",
        "path": "/tags/6",
        "value": "housie18"
    },
    {
        "op": "add",
        "path": "/tags/7",
        "value": "hoh18"
    },
    {
        "op": "add",
        "path": "/tags/8",
        "value": "lfc19"
    },
    {
        "op": "add",
        "path": "/tags/9",
        "value": "tbpp"
    },
    {
        "op": "add",
        "path": "/tags/10",
        "value": "housie19"
    },
    {
        "op": "add",
        "path": "/tags/11",
        "value": "gfc2020"
    },
    {
        "op": "replace",
        "path": "/external_profiles/1/uri",
        "value": "https://www.facebook.com/pages/DIYA-Foundation/"
    },
    {
        "op": "replace",
        "path": "/external_profiles/1/label",
        "value": "Facebook"
    },
    {
        "op": "add",
        "path": "/external_profiles/2",
        "value": {
            "label": "Youtube",
            "uri": "http://www.youtube.com/watch?v=DezbmReWMf0"
        }
    },
    {
        "op": "add",
        "path": "/official_name",
        "value": "Diya Foundation"
    }
]);
     
  return (
    <div className="w-full h-screen">
      <div className="h-[50%] flex">
      <div className="w-[50%] text-center">
        <h3>{`Base Object {}`}</h3>
       
          <textarea onChange={(e)=>{setObj(e.target.value)}} value={obj ? JSON.stringify(obj, null, 2) : ''} className="textAreaInputs"/>
       
      </div>
      <div className="w-[50%] text-center">
        <h3>{`JSON patch {}`}</h3>
        <textarea onChange={(e)=>setPatches(JSON.parse(e.target.value))} value={patches.length > 0 ? JSON.stringify(patches, null, 2) :""} className="textAreaInputs"/>
      </div>

      </div>
      <RenderUpdated obj={obj} patches={patches} setObj={setObj} setPatches={setPatches}/>
    </div>
  );
}

export default App;
