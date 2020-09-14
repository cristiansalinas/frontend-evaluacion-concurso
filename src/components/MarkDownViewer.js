import * as React from "react"

const MarkdownViewer = ({ content }) =>{
  return <div dangerouslySetInnerHTML={{__html:content}} />;

}


export default MarkdownViewer;