"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// Dynamic import of Editor to ensure it's only loaded on the client side
const DynamicEditor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

const EditorComponent = ({ onEditorStateChange }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    onEditorStateChange(newEditorState);
  };

  return (
    <div>
      <DynamicEditor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
};

export default EditorComponent;
