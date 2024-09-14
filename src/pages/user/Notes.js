import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'antd';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";


const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [noteData, setNoteData] = useState({ title: '', content: '' });
  const [editMode, setEditMode] = useState(false);
  const [noteId, setNoteId] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Fetch all notes
  const fetchNotes = async () => {
    const response = await axios.get('https://notes-2-bi3k.onrender.com/notes');
    setNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMode) {
      await axios.put(`https://notes-2-bi3k.onrender.com/notes/${noteId}`, noteData);
      setEditMode(false);
    } else {
      await axios.post('https://notes-2-bi3k.onrender.com/notes', noteData);
    }
    setNoteData({ title: '', content: '' });
    fetchNotes();
  };

  // Handle edit
  const handleEdit = (note) => {
    setNoteData({ title: note.title, content: note.content });
    setEditMode(true);
    setNoteId(note._id);
  };

  // Delete Note
  const handleDelete = async (id) => {
    await axios.delete(`https://notes-2-bi3k.onrender.com/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className="container">

<div className='d-flex justify-content-between my-3'>
<h4 className='text-light your-notes'> Your Notes</h4>
<button className='add-notes-btn btn-outline-dark' type="" onClick={showModal}>
<IoIosAddCircleOutline /> Add Notes
      </button>
      <Modal className=''  title="Add Your notes" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <form  onSubmit={handleSubmit} className='d-flex flex-column '>
        <input
          type="text"
          placeholder="Title"
          value={noteData.title}
          onChange={(e) => setNoteData({ ...noteData, title: e.target.value })}
          required
          className='my-2 '
        /><hr/>
        <textarea
          placeholder="Your notes here"
          value={noteData.content}
          onChange={(e) => setNoteData({ ...noteData, content: e.target.value })}
          required
          className='mb-5 mt-2 border-0 '
        />
        <button type="submit" className="">
          {editMode ? 'Update Note' : 'Add Note'}
        </button>
      </form>
      </Modal>
</div>
      
      

      <div className="row">
        {notes.map((note) => (
          <div key={note._id} className="col-md-6 col-lg-6 col-6 mb-3">
            <div className="note note-card p-3">
              <div className="d-flex justify-content-between">
                <div>
                  <h6 className='text-white'>{note.title}</h6>
                </div>
                <div className='edit-buttons'>
                <button><FaEdit onClick={() => handleEdit(note)} className='text-warning mx-1' /></button>
                <button>
                <MdDelete onClick={() => handleDelete(note._id)} className='text-danger' />
                </button>
                 
                </div>
              </div>
              <hr />
              <p>{note.content}</p>
              <div className="text-end text-muted" style={{ fontSize: '0.85rem' }}>
                {note.createdAt 
                  ? new Date(note.createdAt).toLocaleString('en-US', {
                      weekday: 'long', 
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                     
                    })
                  : 'No date available'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
