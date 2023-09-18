
  
let counter = 0;
let list = {};
let check_list = [];
let check_list_dict = {};
let completed = 0;
let searchBox = document.getElementById("in_val");
let button_click = document.getElementById("btn1");
completed = parseInt(localStorage.getItem('completed'));
counter = parseInt(localStorage.getItem('counter'));
document.getElementById("task_left_val").innerHTML = completed;


//To store checked item on localstorage so that consistency will be there even after page refresh or closure
document.addEventListener('DOMContentLoaded', function() {
  const storedObject = JSON.parse(localStorage.getItem('list'));
  const storedObject2 = JSON.parse(localStorage.getItem('check_list_dict'));
  
  if (storedObject) {
    list = storedObject;
  }
  if (storedObject2) {
    check_list_dict = storedObject2;
  }
});

// This will add input value to the to-do list when Enter is pressed
searchBox.addEventListener('keydown', function(event) {
  // Check if the pressed key is the Enter key (key code 13)
  if (event.keyCode === 13) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Programmatically click the button
    button_click.click();
  }
});

// This function will add the input value to the list and clear the input box
function Add_input() {
  val = document.getElementById("in_val").value;
  document.getElementById("in_val").value = "";
  
  if (val.length <= 0) {
    alert("Please enter some target");
  } else {
    completed = completed + 1;
    counter = counter + 1;
    localStorage.setItem('counter', counter);
    list[counter] = val;
    localStorage.setItem("list", JSON.stringify(list));
    // If the length of val > 0, then only add
    load_prod(val, counter);
  }
}

// Remove the checked item from the list
function removeCheckedCheckboxes() {
  for (let i = check_list.length - 1; i >= 0; i--) {
    Remove_Element("o" + check_list[i]);
  }
  check_list = [];
}

// This function will load or append newly created objects in the DOM dynamically
function load_prod(x, c) {
  let new_item = document.getElementById("checkb");
  div_m = document.createElement("div");
  div_m.className = "checkbox-item";
  div_m.id = "o" + c;
  const outer_id = "o" + c;
  div_m.innerHTML =
    `
    <div id="todo_area">
      <div id="todo_ip">
        <div id="ip_cb">
          <input type="checkbox" value="${x}" id="${c}">
        </div>
        <div id="todo_val"><label for="${c}">${x}</label></div>
      </div>
      <div id="remove_area">
        <button class="remove-button" onclick="Remove_Element('${outer_id}')"> Remove </button>
      </div>
    </div>
    `;
  new_item.appendChild(div_m);
  let new_task = document.getElementById(c);
  new_task.addEventListener('change', handlechangeevent);
  document.getElementById("task_left_val").innerHTML = completed;
  localStorage.setItem('completed', completed);
}

// To remove the item from the DOM either by clicking on the remove button or by removing the checked items
function Remove_Element(id_to_remove) {
  completed = completed - 1;
  const remove_item_id = id_to_remove;
  let remove_div = document.getElementById(remove_item_id);
  remove_div.remove();
  const checkboxId = remove_item_id.substring(1);
  const index = check_list.indexOf(checkboxId);
  
  if (index !== -1) {
    check_list.splice(index, 1);
  }
  
  delete list[checkboxId];
  document.getElementById("task_left_val").innerHTML = completed;
  localStorage.setItem('completed', completed);
  localStorage.setItem('list', JSON.stringify(list));
  
  if (checkboxId in check_list_dict) {
    delete check_list_dict[checkboxId];
  }
  
  localStorage.setItem('check_list_dict', JSON.stringify(check_list_dict));
  const numberOfProperties = Object.keys(check_list_dict).length;
  document.getElementById("in_progress_val").innerHTML = numberOfProperties;
}

// To handle the changes when a checkbox is checked or unchecked
function handlechangeevent(event) {
  const checkbox_event = event.target;
  const checkboxId = checkbox_event.id;
  const checkbox = document.getElementById(checkboxId);
  
  if (checkbox.checked) {
    check_list.push(checkboxId);
    check_list_dict[checkboxId] = true;
  } else {
    const index = check_list.indexOf(checkboxId);
    
    if (index !== -1) {
      check_list.splice(index, 1);
      delete check_list_dict[checkboxId];
    } else if (checkboxId in check_list_dict) {
      delete check_list_dict[checkboxId];
    }
  }
  
  localStorage.setItem('check_list_dict', JSON.stringify(check_list_dict));
  const numberOfProperties = Object.keys(check_list_dict).length;
  document.getElementById("in_progress_val").innerHTML = numberOfProperties;
}


//load the values from localstorage on page refresh
function load_list() {
  const numberOfProperties = Object.keys(check_list_dict).length;
  document.getElementById("in_progress_val").innerHTML = numberOfProperties;
  
  for (const key in list) {
    load_prod(list[key], key);
    
    if (key in check_list_dict) {
      const id_v = document.getElementById(key);
      id_v.checked = true;
    }
  }
}


//on body load this function will be called
function bodyload() {
  if (Object.keys(list).length <= 0) {
    completed = 0;
    localStorage.setItem('completed', completed);
  }
  
  load_list();
}

    

