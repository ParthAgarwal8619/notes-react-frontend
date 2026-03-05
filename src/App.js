import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App(){

const [notes,setNotes] = useState([]);
const [title,setTitle] = useState("");
const [content,setContent] = useState("");
const [editId,setEditId] = useState(null);


// Fetch Notes
const fetchNotes = async ()=>{
const res = await axios.get("http://127.0.0.1:8000/notes");
setNotes(res.data);
};


// Create Note
const createNote = async ()=>{
await axios.post("http://127.0.0.1:8000/notes",{
title,
content
});

setTitle("");
setContent("");

fetchNotes();
};


// Delete Note
const deleteNote = async(id)=>{
await axios.delete(`http://127.0.0.1:8000/notes/${id}`);
fetchNotes();
};


// Update Note
const updateNote = async ()=>{

await axios.put(`http://127.0.0.1:8000/notes/${editId}`,{
title,
content
});

setEditId(null);
setTitle("");
setContent("");

fetchNotes();
};


// Load notes
useEffect(()=>{
fetchNotes();
},[]);


return(
<div className="container">

<h1>Notes App</h1>

<h3>Create Note</h3>

<input
placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>

<input
placeholder="Content"
value={content}
onChange={(e)=>setContent(e.target.value)}
/>


{editId ? (

<button onClick={updateNote}>
Update Note
</button>

) : (

<button onClick={createNote}>
Create Note
</button>

)}


<h3>All Notes</h3>

<ul>

{notes.map((note)=>(
<li key={note.id}>

<div className="noteText">
<b>{note.title}</b> - {note.content}
</div>

<div>

<button
className="editBtn"
onClick={()=>{
setEditId(note.id)
setTitle(note.title)
setContent(note.content)
}}
>
Edit
</button>

<button
className="deleteBtn"
onClick={()=>deleteNote(note.id)}
>
Delete
</button>

</div>

</li>
))}

</ul>

</div>
)

}

export default App