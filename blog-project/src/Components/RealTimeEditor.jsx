import QuillEditor from "react-quill"
import "react-quill/dist/quill.snow.css"
import { quillModules } from "../utils/constants"
function RealTimeEditor({quillRef}) {
  return (
    <QuillEditor theme="snow" ref={quillRef} modules={quillModules}></QuillEditor>
  )
}

export default RealTimeEditor