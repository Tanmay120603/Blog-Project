import QuillEditor from "react-quill"
import "react-quill/dist/quill.snow.css"
import { quillModules } from "../utils/constants"
function RealTimeEditor({value,eventHandler,editorStyling=""}) {
  return (
    <div><QuillEditor className={editorStyling} theme="snow" onChange={eventHandler} value={value} modules={quillModules}></QuillEditor></div>
  )
}

export default RealTimeEditor