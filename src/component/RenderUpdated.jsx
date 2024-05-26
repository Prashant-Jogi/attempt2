import { useEffect, useMemo, useRef, useState } from "react";
import * as jsonpatch from "fast-json-patch";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import ConfirmModal from "./ConfirmModal";

const RenderUpdated = ({ obj, patches, setObj, setPatches }) => {
  const lineCounterRef = useRef(null);
  const textareaRef = useRef(null);
  const [modal, setModal] = useState({ status: false, index: "" });
  const [updatedJson, setUpdatedJson] = useState("");
  const [activeLine, setActiveLine] = useState(null);
  useEffect(() => {
    if (patches.length > 0 && obj) {
      const cloned = jsonpatch.deepClone(obj);
      const updatedJson = jsonpatch.applyPatch(obj, patches).newDocument
      setUpdatedJson(cloned);
    }
  }, [patches, obj]);

  useEffect(()=>{
    const lines = document.querySelectorAll('.css-17vezug-marker')
    
    if(lines){
        lines.forEach((val)=>{
           
            if(val.className.includes('diff')){
                val.addEventListener('mouseover',handleMouseover)
            }
        })
    }
   
  },[])

  const handleMouseover = (line) => {
    console.log(line, "line");
    // setActiveLine(line);
  };

  const handleMouseout = () => {
    setActiveLine(null);
  };

  const onClose = () => {
    setModal({ status: false, index: "" });
  };

  //   const lineCount = useMemo(() => {
  //     const lines = JSON.stringify(obj, null, 2).split('\n');
  //     return lines.length;
  //   }, [obj]);

  //   const linesArr = useMemo(() => Array.from({ length: lineCount }, (_, i) => i + 1), [lineCount]);

  //   const handleTextareaScroll = () => {
  //     if (lineCounterRef.current && textareaRef.current) {
  //       lineCounterRef.current.scrollTop = textareaRef.current.scrollTop;
  //     }
  //   };

  //   const getValueByPath = (obj, path) => {
  //     const keys = path.substring(1).split('/');
  //     let value = obj;
  //     keys.forEach(key => {
  //       value = value[key];
  //     });
  //     return value;
  //   };

  //   const getLineNumberByPath = (path) => {
  //     const pathArray = path.substring(1).split('/');
  //     let currentObj = obj;
  //     let lineNumber = 0;

  //     for (let i = 0; i < pathArray.length; i++) {
  //       const key = pathArray[i];
  //       const currentLine = JSON.stringify(currentObj, null, 2).split('\n');
  //       const lineIndex = currentLine.findIndex(line => line.includes(`"${key}":`));
  //       lineNumber += lineIndex + 1;
  //       currentObj = currentObj[key];
  //     }

  //     return lineNumber;
  //   };

  //   const generateDiff = (patch,index) => {
  //     const lineNumber = getLineNumberByPath(patch.path);
  //     let content = '';

  //     if (patch.op === 'add') {
  //       content = `<span class="line added">+ ${JSON.stringify(patch.value, null, 2)}</span>`;
  //     } else if (patch.op === 'remove') {
  //       const removedValue = getValueByPath(obj, patch.path);
  //       content = `<span class="line removed">- ${JSON.stringify(removedValue, null, 2)}</span>`;
  //     } else if (patch.op === 'replace') {
  //       const oldValue = getValueByPath(obj, patch.path);
  //       content = `
  //         <span class="line removed" >- ${JSON.stringify(oldValue, null, 2)}</span>
  //         <span class="line added" >+ ${JSON.stringify(patch.value, null, 2)}</span>
  //       `;
  //     }

  //     return (
  //       <div key={lineNumber} className="line">
  //         <span className="line-number">{lineNumber}</span>
  //         <span className="line-content" onMouseOver={()=>setModal({status:true,index})} dangerouslySetInnerHTML={{ __html: content }} />
  //       </div>
  //     );
  //   };

  const approveOperation = () => {
    const patch = patches[modal.index];
    const newObj = jsonpatch.applyPatch(obj, [patch]).newDocument;
    setObj(newObj);
    const newPatches = patches.filter((_, i) => i !== modal.index);
    setPatches(newPatches);
    onClose();
  };

  const rejectOperation = () => {
    const newPatches = patches.filter((_, i) => i !== modal.index);
    setPatches(newPatches);
    onClose();
  };

  return (
    <>
      <ConfirmModal
        modal={modal.status}
        onClose={onClose}
        approve={approveOperation}
        reject={rejectOperation}
      />
      <div className="h-[50%] flex">
        <ReactDiffViewer
          oldValue={JSON.stringify(updatedJson,null,2)}
          newValue={JSON.stringify(obj,null,2)}
          compareMethod={DiffMethod.LINES}
          splitView={false}
          hideLineNumbers={false}
          showDiffOnly={false}
          onLineNumberClick={(e,event)=>console.log(e,event,"check")}
        />
      </div>
    </>
  );
};

export default RenderUpdated;
