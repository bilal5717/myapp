import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  text-align: center;
`;

const FormContainer = styled.form`
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px; /* Fixed height */
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
`;

const SaveButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const NoteContainer = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  background-color: #f9f9f9;
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const NoteTitle = styled.h2`
  margin: 0;
`;

const EditButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 5px;
  cursor: pointer;
`;

const NoteText = styled.p`
  white-space: pre-wrap;
`;

const NoNotes = styled.p`
  text-align: center;
  font-style: italic;
  color: #777;
`;

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const savedNotes = window.localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const newNote = (title, text) => {
    const updatedNotes = [{ title, text }, ...notes];
    saveNotes(updatedNotes);
  };

  const saveNotes = (updatedNotes) => {
    window.localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const removeNote = (index) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    saveNotes(updatedNotes);
  };

  const updateNote = (index, title, text) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = { title, text };
    saveNotes(updatedNotes);
    setEditingIndex(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '' && text.trim() !== '') {
      if (editingIndex !== null) {
        updateNote(editingIndex, title, text);
      } else {
        newNote(title, text);
      }
      setTitle('');
      setText('');
      setEditingIndex(null);
    }
  };

  return (
    <Container>
      <Header>Notepad</Header>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your note here..."
        ></Textarea>
        <SaveButton type="submit">{editingIndex !== null ? 'Update Note' : 'Save Note'}</SaveButton>
      </FormContainer>
      <div className="notes-container">
        {notes.length > 0 ? (
          notes.map((note, index) => (
            <Note
              key={index}
              index={index}
              title={note.title}
              text={note.text}
              onUpdate={updateNote}
              onRemove={removeNote}
              onEdit={() => setEditingIndex(index)}
            />
          ))
        ) : (
          <NoNotes>No notes yet. Add one above!</NoNotes>
        )}
      </div>
    </Container>
  );
};

const Note = ({ index, title, text, onUpdate, onRemove, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteText, setNoteText] = useState(text);

  const handleEdit = () => {
    onEdit();
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(index, noteTitle, noteText);
    setEditing(false);
  };

  const handleDelete = () => {
    onRemove(index);
  };

  return (
    <NoteContainer>
      <NoteHeader>
        {editing ? (
          <Input
            type="text"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        ) : (
          <NoteTitle>{noteTitle}</NoteTitle>
        )}
        <div>
          {editing ? (
            <SaveButton onClick={handleSave}>Save</SaveButton>
          ) : (
            <EditButton onClick={handleEdit}>Edit</EditButton>
          )}
          <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        </div>
      </NoteHeader>
      {editing ? (
        <Textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
        />
      ) : (
        <NoteText>{noteText}</NoteText>
      )}
    </NoteContainer>
  );
};

export default Main;
