import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
  ListItemSecondaryAction,
} from "@mui/material";
import { Mic, MicOff, Delete, RadioButtonUnchecked } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const RecordingView = () => {
  const theme = useTheme();
  const [isRecord, setIsRecord] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [notes, setNotes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
  const recognitionRef = useRef(null);

  // Function to start recording
  const startRecording = () => {
    setIsRecord(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";
    recognitionRef.current.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + " ";
      }
      setTranscript(finalTranscript.trim());
    };
    recognitionRef.current.start();
  };

  // Function to stop recording
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecord(false);
    }
  };

  // Toggle recording
  const handleToggleRecording = () => {
    if (isRecord) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Save note locally
  const handleSaveNote = () => {
    if (transcript) {
      const newNote = {
        id: notes.length + 1, // Generate unique ID for local storage example
        title: `Note ${notes.length + 1}`,
        content: transcript,
      };
      setNotes([...notes, newNote]);
      setTranscript(""); // Clear transcript after saving
      setIsRecordingDialogOpen(false); // Close recording dialog after saving
    }
  };

  // Delete note locally
  const handleDeleteNote = (index) => {
    setNoteToDelete(index);
    setOpenDialog(true);
  };

  // Confirm note deletion
  const confirmDeleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== noteToDelete);
    setNotes(newNotes);
    setOpenDialog(false);
    setNoteToDelete(null);
  };

  // Close delete confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNoteToDelete(null);
  };

  // Mock fetch notes (not needed if not using a backend)
  const fetchNotes = () => {
    // Simulate fetching notes from a backend
    const mockNotes = [
      { id: 1, title: "Note 1", content: "This is note 1" },
      { id: 2, title: "Note 2", content: "This is note 2" },
    ];
    setNotes(mockNotes);
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      // justifyContent="center"
      height="100vh"
      mt={4}
      p={3}
    >
      <Box textAlign="center" mb={3}>
        <Typography variant="h3" color={theme.palette.text.primary}>
          AudioPen
        </Typography>
        <Typography variant="h6" color={theme.palette.text.secondary}>
          Go from fuzzy thought to clear text. Fast.
        </Typography>
      </Box>
      {notes.length > 0 && (
        <>
          <Box
            mb={3}
            width="50%"
            boxShadow={3}
            p={3}
            borderRadius={2}
            bgcolor={theme.palette.background.paper}
          >
            <Typography
              variant="h6"
              align="center"
              color={theme.palette.text.primary}
            >
              Saved Notes
            </Typography>
            <List>
              {notes.map((note, index) => (
                <ListItem
                  key={note.id}
                  divider
                  sx={{ color: noteToDelete === index ? "gray" : "black" }}
                >
                  <IconButton
                    edge="start"
                    onClick={() => handleDeleteNote(index)}
                  >
                    <RadioButtonUnchecked />
                  </IconButton>
                  <ListItemText primary={note.title} secondary={note.content} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteNote(index)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            boxShadow={2}
            color={"gray"}
            padding={2}
            borderRadius={2}
            bgcolor={theme.palette.background.paper}
          >
            <Typography variant="h6" color={theme.palette.text.primary}>
              {notes.length}/10 notes saved
            </Typography>
          </Box>
        </>
      )}

      <Box mb={3}>
        <IconButton
          color="primary"
          onClick={() => setIsRecordingDialogOpen(true)}
        >
          <Mic fontSize="large" />
        </IconButton>
      </Box>

      <Dialog
        open={isRecordingDialogOpen}
        onClose={() => setIsRecordingDialogOpen(false)}
      >
        <DialogTitle>Record Note</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton
              color={isRecord ? "secondary" : "primary"}
              onClick={handleToggleRecording}
            >
              {isRecord ? (
                <MicOff fontSize="large" />
              ) : (
                <Mic fontSize="large" />
              )}
            </IconButton>
            <Typography variant="body1" mt={2}>
              {transcript}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <MuiButton
            onClick={() => setIsRecordingDialogOpen(false)}
            color="primary"
          >
            Cancel
          </MuiButton>
          <MuiButton
            onClick={handleSaveNote}
            color="primary"
            disabled={!transcript}
          >
            Save
          </MuiButton>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MuiButton onClick={handleCloseDialog} color="primary">
            Cancel
          </MuiButton>
          <MuiButton onClick={confirmDeleteNote} color="primary" autoFocus>
            Delete
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecordingView;
