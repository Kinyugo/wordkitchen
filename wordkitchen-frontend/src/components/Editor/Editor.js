import React from "react";
import PropTypes from "prop-types";

import { MegadraftEditor } from "megadraft";
import "megadraft/dist/css/megadraft.css";

import customBlockFn from "./customBlockStyles/customBlockStyles";

function Editor({
  editorState,
  onChange,
  className,
  readOnly,
  placeholder
}) {

  return (
    <div className={className}>
      {/* Editor Pane */}
      <MegadraftEditor
        editorState={editorState}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        blockStyleFn={customBlockFn}
      />
    </div>
  );
}

Editor.propTypes = {
  editorState: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool.isRequired,
  className: PropTypes.string,
  placeholder: PropTypes.string
};

export default Editor;
