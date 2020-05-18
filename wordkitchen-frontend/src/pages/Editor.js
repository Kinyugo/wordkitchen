import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { editorStateFromRaw, editorStateToJSON } from "megadraft";

import { makeStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import SaveIcon from "@material-ui/icons/Save";

import AppBar from "../components/AppBar";
import Editor from "../components/Editor/Editor";
import Snackbar from "../components/info/Snackbar";
import TitleModal from "../components/EditorPage/Title/TitleModal";

const ADD_ARTICLE = gql`
  mutation AddArticle($title: String!, $body: String!) {
    addArticle(title: $title, body: $body) {
      _id
      title
      body
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: 500,
  },
  editor: {
    fontFamily: '"Open Sans", sans-serif',
    marginRight: theme.spacing(15),
    marginLeft: theme.spacing(15),
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      marginRight: theme.spacing(10),
      marginLeft: theme.spacing(10),
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(8),
    },
  },
  saveButton: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
    display: "flex",
    marginLeft: "auto",
    marginTop: theme.spacing(5),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(5),
    zIndex: 9,
    [theme.breakpoints.down("sm")]: {
      marginRight: theme.spacing(0),
      right: theme.spacing(2),
    },
  },
}));
export default function () {
  const classes = useStyles();

  // Mutation to save the article's content to the DB
  const [addArticle, { data, error }] = useMutation(ADD_ARTICLE);
  // Handles the editor's state
  const [editorState, setEditorState] = useState(editorStateFromRaw(null));

  // Handles the opening and closing of the title modal
  const [titleOpen, setTitleOpen] = useState(false);

  // Handles the valut of the title
  const [title, setTitle] = useState("Hello World");

  // Handles update of the title
  const handleTitleUpdate = (e) => setTitle(e.target.value);

  // Handles closing of the tile modal
  const handleTitleClose = () => {
    // Close the title modal first.
    setTitleOpen(false);

    // Open the snackbar to display the progress of saving.
    setOpen(true);

    // Persist article to DB
    const editorStateJSON = JSON.stringify(editorStateToJSON(editorState));
    persistArticle({ title, body: editorStateJSON });
  };

  // Handles the opening and closing of the snackbar
  const [open, setOpen] = useState(false);

  // Handle closing of the snackBar
  const handleClose = () => setOpen(false);

  // Handles the update of the editor state
  const onChange = (editorState) => setEditorState(editorState);

  // Saves the editor's state to a server
  const onSave = () => {
    // Open the title modal to enable the user to verify the default title
    setTitleOpen(true);
  };

  // Persists the user's article to the DB.
  // The article is actually saved once the user closes the title modal.
  const persistArticle = ({ title, body }) => {
    addArticle({
      variables: { title: title, body: body },
    }).catch(() => {
      console.log(error);
    });
  };

  return (
    <div className={classes.root}>
      <AppBar title="Editor" />
      <TitleModal
        open={titleOpen}
        handleClose={handleTitleClose}
        handleTitleChange={handleTitleUpdate}
        title={title}
      />
      <Snackbar
        open={open}
        status={error ? "error" : data ? "success" : "info"}
        handleClose={handleClose}
        statusMessage={
          error
            ? "Could not save your article!"
            : data
            ? "Saved your article successfully"
            : "Saving your article..."
        }
      />
      {/* Save Button */}
      <Fab
        color="secondary"
        size="medium"
        aria-label="save"
        onClick={() => onSave()}
        className={classes.saveButton}
      >
        <SaveIcon />
      </Fab>
      <Editor
        editorState={editorState}
        onChange={onChange}
        readOnly={false}
        className={classes.editor}
        placeholder={"Write here..."}
      />
    </div>
  );
}
