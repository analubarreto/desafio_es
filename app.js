/* Funções */

// Buscar elemento pela id
const $getId = function(id) {
    return document.getElementById(id);
}

// Buscar elemento pela tag name
const $getTagName = function(tagName) {
    return document.getElementsByTagName(tagName);
}

// Criar novo elemento
const $createEl = function(el) {
    return document.createElement(el);
}

////////////////////////////////////////////////////////////////
/* Lógica */

const taskInput = $getId("new-task")// Nova task
const addButton = $getTagName("button")[0];// Primeiro Botão
const incompleteTaskHolder = $getId("incomplete-tasks");// ul de #incomplete-tasks
const completedTasksHolder = $getId("completed-tasks");// #completed-tasks


//New task list item
function createNewTaskElement(taskString) {

	let listItem = $createEl("li"); // li
	let checkbox = $createEl("input");// checkbx
	let label = $createEl("label");// label
	let editInput = $createEl("input");// input
	let btnEdit = $createEl("button");// edit button
	let btnDelete = $createEl("button");// delete button

	label.innerText = taskString;

	// Cada elemento precisar de appending
	checkbox.type = "checkbox";
	editInput.type = "text";

	// set texto do botão para "Edit"
	btnEdit.innerText = "Edit";

	btnEdit.className = "edit";
	btnDelete.innerText = "Delete";
	btnDelete.className = "delete";

	// e mais appending
	listItem.appendChild(checkbox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(btnEdit);
	listItem.appendChild(btnDelete);

	return listItem;
}



function addTask() {
	console.log("Add Task...");
	//  Criar um novo item da lista com o texto do #new-task
	var listItem = createNewTaskElement(taskInput.value);

	// Dar append no listItem para o incompleteTaskHolder
	incompleteTaskHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value="";

}

// Editar uma task existente
function editTask() {
	let listItem = this.parentNode;

	const editInput = listItem.querySelector("input[type=text]");
	const label = listItem.querySelector("label");
	const containsClass = listItem.classList.contains("editMode");
	
	// Se a classe do pai estiver em .editmode
	if (containsClass) {
		// mudar para .editmode
		// label torna o value do input
		label.innerText = editInput.value;
	} else {
		editInput.value = label.innerText;
	}
		//mudar o .editmode no pai
		listItem.classList.toggle("editMode");
	}

// Deletar task
function deleteTask() {
	const listItem = this.parentNode;
	let ul = listItem.parentNode;
	// Remover o pai da lista de itens da ul
	ul.removeChild(listItem);

}


// Marcar task como completa
function taskCompleted() {	
	// Dar append na lista de tasks com o #completed-tasks
	const listItem = this.parentNode;
	completedTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskIncomplete);

}


function taskIncomplete() {
// Marcar task como incompleta
	// Quando a checkbox não estiver checada
		// Dar append na lista de tasks com o #incomplete-task
		const listItem = this.parentNode;
		incompleteTaskHolder.appendChild(listItem);
		bindTaskEvents(listItem, taskCompleted);
}



function ajaxRequest(){
	console.log("AJAX Request");
}

// Juntando tudo...


// Setar o handler do click para a função addTask
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


function bindTaskEvents(taskListItem,checkboxEventHandler) {
	console.log("bind list item events")	// selecionar ListItems children
	const checkbox = taskListItem.querySelector("input[type=checkbox]");
	const btnEdit = taskListItem.querySelector("button.edit");
	const btnDelete = taskListItem.querySelector("button.delete");


			//Bind editTask ao botão edit
			btnEdit.onclick = editTask;
			//Bind deleteTask ao botão delete
			btnDelete.onclick = deleteTask;
			//Bind taskCompleted ao checkboxEventHandler
			checkbox.onchange = checkboxEventHandler;
}

// percorerrer os itens do ul incompleteTaskHolder
	//for each list item
	for (var i = 0; i < incompleteTaskHolder.children.length; i++){
		//bind eventos a lista de itens children(tasksCompleted)
		bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
	}




// percorerrer os itens do ul completedTaskHolder
	for (var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind eventos a lista itens children(tasksIncompleted)
		bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
	}