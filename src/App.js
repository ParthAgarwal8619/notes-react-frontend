import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://fastapi-backend-nvwe.onrender.com"; 

function App() {

const [notes,setNotes] = useState([]);
const [title,setTitle] = useState("");
const [content,setContent] = useState("");
const [editId,setEditId] = useState(null);


// Fetch Notes
const fetchNotes = async ()=>{
try{
const res = await axios.get(`${API}/notes/`);
setNotes(res.data);
}catch(err){
console.log("Fetch error:",err);
}
};


// Create Note
const createNote = async ()=>{
if(!title || !content) return;

try{
await axios.post(`${API}/notes/`,{
title:title,
content:content
});

setTitle("");
setContent("");

fetchNotes();

}catch(err){
console.log("Create error:",err);
}
};


// Delete Note
const deleteNote = async(id)=>{
try{
await axios.delete(`${API}/notes/${id}`);
fetchNotes();
}catch(err){
console.log("Delete error:",err);
}
};


// Update Note
const updateNote = async ()=>{
try{
await axios.put(`${API}/notes/${editId}`,{
title:title,
content:content
});

setEditId(null);
setTitle("");
setContent("");

fetchNotes();

}catch(err){
console.log("Update error:",err);
}
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

export default App;
