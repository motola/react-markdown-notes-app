import React from "react"
import Sidebar from "./components/Sidebar.jsx"
import Editor from "./components/Editor.jsx"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"
import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore";
import { notesCollection, db } from "./firebase.js"

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNoteId, setCurrentNoteId] = React.useState("");
    const [tempNoteText, setTempNoteText] = React.useState("")
    const currentNote = 
    notes.find(note => note.id === currentNoteId) 
    || notes[0] 

    const sortedNotes = notes.sort( (a, b) =>  b.updatedAt - a.updatedAt )
    React.useEffect(() => { 
      
       const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
        const notesArr = snapshot.docs.map(document => ({
            ...document.data(),
            id: document.id
        }));
        
            setNotes(notesArr);
            
       })
       return unsubscribe
    } , [])

    React.useEffect(() => {
        if (!currentNoteId) {
            setCurrentNoteId(notes[0]?.id)
        }
    }, [notes])

    React.useEffect ( () => {
        if (currentNote) {
            setTempNoteText(currentNote.body);
        }
    }, [currentNote])
    
    React.useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (tempNoteText !== currentNote.body) {
                updateNote(tempNoteText)
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [tempNoteText])


    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(), 
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    
    async function updateNote(text) {
        const documentRef = doc(db, "notes", currentNoteId)
        await setDoc(documentRef, {body: text, updatedAt: Date.now() }, {merge: true})
    }
    async function deleteNote(noteId) {
       const documentRef =  doc(db, "notes", noteId)
       await deleteDoc(documentRef)
    }
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }
    
    return (
        <main>
        <Header />
        {
            notes.length > 0 
            ?
           
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >   
               
                <Sidebar
                    notes={sortedNotes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                    <Editor 
                        tempNoteText={tempNoteText} 
                        setTempNoteText={setTempNoteText} 
                    />
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        <Footer />
        </main>
    )
}
