import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./global.css";
import "./sidebar.css";
import "./app.css";
import "./main.css";
import Notes from "./Components/Notes";
import RadioButton from "./Components/RadioButton";

function App() {
	const [selectedValue, setSelectedValue] = useState("all");
	const [title, setTitles] = useState("");
	const [notes, setNotes] = useState("");
	const [allNotes, setAllNotes] = useState([]);

	useEffect(() => {
		getAllNotes();
	}, []);

	async function getAllNotes() {
		const response = await api.get("./annotations");

		setAllNotes(response.data);
	}

	async function loadNotes(option) {
		const params = { priority: option };
		const response = await api.get("/priorities", { params });

		if (response) {
			setAllNotes(response.data);
		}
	}

	function handleChange(e) {
		setSelectedValue(e.value);
		if (e.checked && e.value !== "all") {
			loadNotes(e.value);
		} else {
			getAllNotes();
		}
	}

	async function handleDelete(id) {
		const deletedNote = await api.delete(`/annotations/${id}`);

		if (deletedNote) {
			setAllNotes(allNotes.filter((note) => note._id !== id));
		}
	}

	async function handleChangePriority(id) {
		const note = await api.post(`/priorities/${id}`);

		if (note && selectedValue !== "all") {
			loadNotes();
		} else {
			getAllNotes();
		}
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await api.post("/annotations", {
			title,
			notes,
			priority: false,
		});

		setTitles("");
		setNotes("");

		if (selectedValue !== "all") {
			getAllNotes();
		} else {
			setAllNotes([...allNotes, response.data]);
		}
		setSelectedValue("all");
	}

	useEffect(() => {
		function enableSubmitButton() {
			let btn = document.getElementById("btn_submit");
			btn.style.background = "#ffd3ca";
			if (title && notes) {
				btn.style.background = "#eb8d7a";
			}
		}
		enableSubmitButton();
	}, [title, notes]);

	return (
		<div id="app">
			<aside>
				<strong>Caderno de Notas</strong>
				<form onSubmit={handleSubmit}>
					<div className="input-block">
						<label htmlFor="title">Titulo da Anotação</label>
						<input
							onChange={(e) => setTitles(e.target.value)}
							maxLength="30"
							required
							value={title}
						/>
					</div>

					<div className="input-block">
						<label htmlFor="nota">Anotações</label>
						<textarea
							onChange={(e) => setNotes(e.target.value)}
							required
							value={notes}
						/>
					</div>

					<button id="btn_submit" type="submit">
						Salvar
					</button>
				</form>
				<RadioButton
					selectedValue={selectedValue}
					handleChange={handleChange}
				/>
			</aside>

			<main>
				<ul>
					{allNotes.map((data) => (
						<Notes
							key={data._id}
							data={data}
							handleDelete={handleDelete}
							handleChangePriority={handleChangePriority}
						/>
					))}
				</ul>
			</main>
		</div>
	);
}

export default App;
