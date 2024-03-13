import QuillEditor from "react-quill"
import "react-quill/dist/quill.snow.css"
import { quillModules } from "../utils/constants"
function RealTimeEditor({initialValue,eventHandler,quillRef}) {
  return (
    <QuillEditor theme="snow" ref={quillRef} value={initialValue} modules={quillModules}></QuillEditor>
  )
}

export default RealTimeEditor