import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Card from '../components/Cards';
import NoteCard from '../components/Cards';
import styles from './Pages.module.scss';
const BASE_URL=import.meta.env.VITE_BASE_URL;



function Homepage() {
   // const [notes,setNotes]=useState("");
    //const [addbox,setaddbox]=useState(false);
      const [addBox, setAddBox] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
    const [notes, setNotes] = useState([]);
    const [searchTag, setSearchTag] = useState("");
    const [Filternote,setFilteredNotes]=useState([]);
   // const [tag,settag]=useState(false);
    

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}user/getnotes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
     //   console.log(response.data);

        setNotes(response.data); // Backend sends array directly
      } catch (err) {
        console.error("Error fetching notes:", err.response?.data || err.message);
        alert("Failed to fetch notes.");
      }
    };

    fetchNotes();
  });
    


    

    const addnote =async()=>{
        console.log("hi");
        setAddBox(true);

    }

    const submitnote = async () => {
  const token = localStorage.getItem("token");

  try {
    setAddBox(false);
    const resp = await axios.post(`${BASE_URL}user/create`, {
      title,
      content,
      tags: tag.split(',').map(t => t.trim())
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log(resp.data);

    // Add the new note to the existing notes state
    setNotes(notes => [...notes, {
      title,
      content,
      tags: tag.split(',').map(t => t.trim())
    }]);

    
    setTitle("");
    setContent("");
    setTag("");
     // optional: hide the add form

  } catch (err) {
    console.error("Error creating note:", err);
    alert("Failed to create note.");
  }
};
const handleDelete = async (noteId) => {
  //console.log(noteId);
  const token = localStorage.getItem("token");

  

  try {
    await axios.delete(`${BASE_URL}user/removenotes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    
    setNotes(prevNotes => prevNotes.filter(note => note._id !== noteId));
    alert("Note deleted successfully");
  } catch (err) {
    console.error("Error deleting note:", err.response?.data || err.message);
    alert("Failed to delete note.");
  }
};


const handleUpdateNote = async (id, updatedData) => {
 // console.log(id);
  const token = localStorage.getItem("token");
  try {
    const resp = await axios.put(`${BASE_URL}user/updatenote/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    //console.log("hii");

    // Update the state
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note._id === id ? { ...note, ...updatedData } : note
      )
    );
    
    //fetchNotes();
  } catch (err) {
    console.error("Error updating note:", err.response?.data || err.message);
    alert("Failed to update note.");
  }
};
const getFilteredNotes = () => {
 // const term = searchTerm.toLowerCase();
  return notes.filter(
    note =>
      note.title.toLowerCase().includes(searchTerm) ||
      note.content.toLowerCase().includes(searchTerm)
  );
};


const handleTagSearch = () => {
    const tag = searchTag.trim().toLowerCase();
    if (!tag) {
      setFilteredNotes(notes); // Reset to all notes if empty
      return;
    }

    const filtered = notes.filter(note =>
      note.tags.some(t => t.toLowerCase() === tag)
    );
    setFilteredNotes(filtered);
    //console.log(filtered);
  };






    
    return (
    <div
    className={styles.container}
    >
        <h1
        className={styles.header}
        >Dashboard</h1>

        
        <button
        onClick={addnote}
        className={styles.addButton}
       // className={styles.addButton}
        >Add Note</button>
        {addBox && (
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            className={styles.input}
            //  className={styles.input}
            onChange={e => setTitle(e.target.value)}
        /><br/>

            <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            /><br />

          <input
            type="text"
            placeholder="Tag"
            value={tag}
            onChange={e => setTag(e.target.value)}
          /><br />

            <button
          onClick={submitnote}
          className={styles.addButton}
          >Done</button>
        </div>
      )}
      <div 
      style={{ marginTop: '0.6rem' }}
      >

      </div>
      <br></br>
      {/* <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        
      /> */}
      <div 
      className={styles.searchSection}
      >
  <input
    type="text"
    placeholder="Search notes by title or content"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  //  className={styles.searchInput}
  />
  <button
  className={styles.searchButton}
    //className={styles.searchButton}
    onClick={() => {
      // Optionally, trigger filtering manually here
      //setfilter(searchTerm);
      setSearchTerm(searchTerm);
    }}
  >
    Search
  </button>
</div>
<div className={styles.searchSection}>
  <input
    type="text"
    placeholder="Enter tag..."
    value={searchTag}
    onChange={(e) => setSearchTag(e.target.value)}
  />
  <button
   className={styles.searchButton}
   onClick={handleTagSearch}
  >Apply</button>
</div>

{searchTerm.length==0 && searchTag.length==0 && (
    <div style={{ marginTop: '2rem' }}
    
    >
        <h2
        className={styles.header2}
        >Your Notes:</h2>
        {notes.length==0?(
          <p
          className={styles.para}
          >No notes Added</p>
        ):(
            notes.map((note,index)=>(
              <NoteCard

              key={index}
              id={note._id} 
              title={note.title}
              
              
        content={note.content}
        tags={note.tags}
        onDelete={()=>handleDelete(note._id)}
        onEdit={()=>handleEdit(note._id)}
        onUpdate={handleUpdateNote} 
              >
                
              </NoteCard>

            ))
        )
        }

      </div>

)

}
{searchTerm.length>0 && searchTag.length==0 && (
  <div style={{ marginTop: '2rem' }}>
  <h2>Your Notes:</h2>
  {getFilteredNotes().length === 0 ? (
    <p>No notes found.</p>
  ) : (
    getFilteredNotes().map((note, index) => (
      <NoteCard
        key={index}
        id={note._id}
        title={note.title}
        content={note.content}
        tags={note.tags}
        onDelete={() => handleDelete(note._id)}
        onEdit={() => handleEdit(note._id)}
      />
    ))
  )}
</div>


)}
{searchTerm.length==0 && searchTag.length>0 && (
  <div style={{ marginTop: '2rem' }}>
  <h2>Your Notes:</h2>
  {getFilteredNotes().length === 0 ? (
    <p>No notes found.</p>
  ) : (
    Filternote.map(note => (
  <NoteCard
    key={note._id}
    id={note._id}
    title={note.title}
    content={note.content}
    tags={note.tags}
    onDelete={()=>handleDelete(note._id)}
        onEdit={()=>handleEdit(note._id)}
        onUpdate={handleUpdateNote} 
  />
))

    // getFilteredNotes().map((note, index) => (
    //   <NoteCard
    //     key={index}
    //     id={note._id}
    //     title={note.title}
    //     content={note.content}
    //     tags={note.tags}
    //     onDelete={() => handleDelete(note._id)}
    //     onEdit={() => handleEdit(note._id)}
    //   />
    // ))

  )}
</div>


)}

{searchTerm.length>0 && searchTag.length>0 && (
  <h2>No Notes</h2>
)
}
      



    </div>
    )
}


export default Homepage
