import { Remarkable } from 'remarkable';
import * as React from "react"

const MarkdownViewer = ({ content }) =>{
  const md = new Remarkable();
  const markdown = md.render(content)
  return <div dangerouslySetInnerHTML={{__html:markdown}} />;

}


export default MarkdownViewer;