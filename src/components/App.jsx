import React, { useState, createContext,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from '@mui/icons-material/Update';
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import axios from "axios";
import { BASE_URL } from "./secret";

export const Themecontext = createContext(null);

function App() {
	const [notes, setNotes] = useState([]);
	const [theme, setTheme] = useState(false);
	const [change,setChange] = useState(false)
	const [open, setOpen] = useState(false);
	const [editId,setId] = useState("")
	const [note, setNote] = useState({
		title: "",
		content: ""
	});

	function handleChange(event) {
		const { name, value } = event.target;
		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value
			};
		});
	}

	function expand() {
		setOpen(true);
	}

	const toggleTheme = () => {
		setTheme(!theme);
		document.body.style.backgroundColor = !theme ? "black" : "white";
	};

	useEffect(()=>{
		axios.get(BASE_URL)
        .then((res)=>{
		if(res.data==="fail") alert("failed");
		else setNotes(res.data);
		})
		.catch((err)=>console.log(err))
	},[])

	function addNote(e) {
		e.preventDefault();
		if(note.title.length && note.content.length)
		{
			axios.post(BASE_URL,note)
			.then((res)=>{
			if(res.data==="fail") alert("failed");
			else 
			{
				setNotes(res.data);
				setNote({
					title: "",
					content: ""
				});
				setOpen(false);
			}
			})
			.catch((err)=>console.log(err))
		}
		else{window.alert("Fill all entries...")}
	}

	function updateNote(e) {
		e.preventDefault();
		if(note.title.length && note.content.length)
		{
			axios.put(BASE_URL + `/${editId}`, {
			title: note.title,
			content: note.content
			})
			.then((res) => {
				if (res.data === "fail") 
				{
					alert("Failed to update data");
				} 
				else 
				{
					setNotes(res.data);
					setNote({
						title: "",
						content: ""
					});
					setOpen(false);
					setChange(false);
				}
			})
			.catch((err) => console.log(err));
		}
		else{window.alert("Fill all entries...")}
	}

	function editNote(e) {
		setNote({...e})
		setChange(true)
		setId(e.id)
		setOpen(true)
	}

	function deleteNote(id) {
		axios.delete(BASE_URL + `/${id}`)
		.then((res)=>{
		if(res.data==="fail") alert("failed");
		else setNotes(res.data);
		})
		.catch((err)=>console.log(err))
	}

	return (
		<Themecontext.Provider value={{ theme, change , toggleTheme }}>
			<div id={theme}>
				<Header />
				<form
				style={{
					backgroundColor: theme ? "black" : "white",
					boxShadow: !theme
						? "0 1px 5px rgb(138, 137, 137)"
						: "0 0 10px 5px rgba(255, 255, 255, 0.1)"
				}}
				className="create-note">
				{open && (<input 
							style={{
							backgroundColor: theme ? "black" : "white",
							color: !theme ? "black" : "white"
						}}
						name="title"
						onChange={handleChange}
						value={note.title}
						placeholder="Title"/>
				)}
				<textarea
					style={{
						backgroundColor: theme ? "black" : "white",
						color: !theme ? "black" : "white"
					}}
					name="content"
					onClick={expand}
					onChange={handleChange}
					value={note.content}
					placeholder="Take a note..."
					rows={open ? "3" : "1"}/>
				<Zoom in={open}>
				{
					change ? (<Fab
						onClick={updateNote}
						style={{ color: theme ? "black" : "white" }}>
						<UpdateIcon />
					</Fab>) 
					:
					(<Fab
						onClick={addNote}
						style={{ color: theme ? "black" : "white" }}>
						<AddIcon />
					</Fab>)
				}
				</Zoom>
			</form>
				{notes.map((noteItem, index) => {
					return (
						<Note
							key={index}
							id={noteItem._id}
							title={noteItem.title}
							content={noteItem.content}
							onDelete={deleteNote}
							onEdit={editNote}/>
					);
				})}
				<Footer />
			</div>
		</Themecontext.Provider>
	);
}

export default App;
