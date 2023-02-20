let notes = [];
let archive = [];
let trash = [];
let idCount = 1;

if (localStorage.getItem("count") == null) {
  localStorage.setItem("count", 1);
}
copyDataFromLocalStorage();

function copyDataFromLocalStorage() {
  idCount = JSON.parse(localStorage.getItem("count")) || 1;
  notes = JSON.parse(localStorage.getItem("notes")) || [];
  archive = JSON.parse(localStorage.getItem("archive")) || [];
  trash = JSON.parse(localStorage.getItem("trash")) || [];
}

showNotes();

function showNotes() {
  hideMultipleMenu();
  hideAndClearSearchResultDiv();
  removeCategoryDiv();
  hideAllNotesCard();
  clearSearchInputField();
  clearHighlightOfSideMenuAll();
  hightLightGivenSideMenu("notes");
  displayBlockGivenArray("notes");
  clearNotesFromGivenDiv("notes");
  displayAllNotesFromGivenArray(notes);
  checkIfEmpty(notes);
  if (getHighlightedSideMenu() == "all-notes") {
    showAllNotes();
  }
}

function showArchiveNotes() {
  hideAndClearSearchResultDiv();
  hideMultipleMenu();
  removeCategoryDiv();
  clearSearchInputField();
  hideAllNotesCard();
  clearHighlightOfSideMenuAll();
  hightLightGivenSideMenu("archive");
  displayBlockGivenArray("archive");
  clearNotesFromGivenDiv("archive");
  displayAllNotesFromGivenArray(archive);
  checkIfEmpty(archive);
}

function checkIfEmpty(arr) {
  if (arr.length == 0) {
    document.querySelector(".show-when-empty").style.display = "block";
    return false;
  } else {
    document.querySelector(".show-when-empty").style.display = "none";
    return true;
  }
}

function showTrashNotes() {
  hideAllNotesCard();
  hideAndClearSearchResultDiv();
  removeCategoryDiv();
  clearSearchInputField();
  hideAllNotesCard();
  clearHighlightOfSideMenuAll();
  hightLightGivenSideMenu("trash");
  displayBlockGivenArray("trash");
  clearNotesFromGivenDiv("trash");
  displayAllNotesFromGivenArray(trash);
  checkIfEmpty(trash);
}

function showAllNotes() {
  clearSearchInputField();
  hideAndClearSearchResultDiv();
  hideAllNotesCard();
  clearHighlightOfSideMenuAll();
  hightLightGivenSideMenu("all-notes");
  clearNotesFromGivenDiv("archive");
  clearNotesFromGivenDiv("notes");
  clearNotesFromGivenDiv("trash");
  displayBlockGivenArray("archive");
  displayBlockGivenArray("notes");
  displayBlockGivenArray("trash");
  displayAllNotesFromGivenArray(notes);
  displayAllNotesFromGivenArray(archive);
  displayAllNotesFromGivenArray(trash);
  addCategoryDiv();
  if (!checkIfEmpty(notes) || !checkIfEmpty(archive) || !checkIfEmpty(trash)) {
    checkIfEmpty([1, 2]); //just random array
  }
}

// function getHighLightedSideMenu() {
//   let sideMenuNotes = document.querySelector(`#side-menu-all-notes-a`);
//   if (sideMenuNotes.style.backgroundColor == "#feefc3") {
//     return "all-notes-show";
//   }

//   sideMenuNotes = document.querySelector(`#side-menu-notes-a`);
//   if (sideMenuNotes.style.backgroundColor == "#feefc3") {
//     return "notes-show";
//   }

//   sideMenuNotes = document.querySelector(`#side-menu-archive-a`);
//   if (sideMenuNotes.style.backgroundColor == "#feefc3") {
//     return "archive-show";
//   }
// }

function addCategoryDiv() {
  displayBeforeSection("notes");
  displayBeforeSection("archive");
  displayBeforeSection("trash");
}

function removeCategoryDiv() {
  let div = document.querySelector(".before-notes-section-extra");
  if (div != null) {
    div.remove();
  }

  div = document.querySelector(".before-archive-section-extra");
  if (div != null) {
    div.remove();
  }

  div = document.querySelector(".before-trash-section-extra");
  if (div != null) {
    div.remove();
  }
}

function displayBeforeSection(cate) {
  const name = cate[0].toLocaleUpperCase() + cate.slice(1);
  const temp = document.querySelector(`.before-${cate}-section-extra`);
  if (temp != undefined) {
    return;
  }
  const div = getCategoryDOMNode(`${name}: `);
  const notesShowDiv = document.querySelector(`.${cate}-show`);
  div.style.marginBottom = "10px";
  div.style.fontSize = "20px";
  div.className = `before-${cate}-section-extra`;
  notesShowDiv.parentElement.insertBefore(div, notesShowDiv);
}

function getCategoryDOMNode(currentData) {
  const titleNode = document.createElement("div");
  const titleTextNode = document.createTextNode(`${currentData}`);
  titleNode.appendChild(titleTextNode);
  return titleNode;
}

function displayBlockGivenArray(category) {
  document.querySelector(`.${category}-show`).style.display = "";
}

function clearHighlightOfSideMenuAll() {
  document.querySelector(`#side-menu-notes-a`).style.backgroundColor = "";
  document.querySelector(`#side-menu-archive-a`).style.backgroundColor = "";
  document.querySelector(`#side-menu-trash-a`).style.backgroundColor = "";
  document.querySelector(`#side-menu-all-notes-a`).style.backgroundColor = "";
}

function clearNotesFromGivenDiv(category) {
  const div = document.querySelector(`.${category}-show`);
  div.innerHTML = "";
}

function hightLightGivenSideMenu(category) {
  const sideMenuNotes = document.querySelector(`#side-menu-${category}-a`);
  sideMenuNotes.style.backgroundColor = "#feefc3";
}

function hideAllNotesCard() {
  let div = document.querySelector(".notes-show");
  if (div != null) {
    div.style.display = "none";
  }
  div = document.querySelector(".archive-show");
  if (div != null) {
    div.style.display = "none";
  }
  div = document.querySelector(".trash-show");
  if (div != null) {
    div.style.display = "none";
  }
}

function displayAllNotesFromGivenArray(arr, optional) {
  for (let obj of arr) {
    appendNoteCard(obj, optional);
  }
}

// show hide form - start
// didn't implemented to hide form by clicking anywhere
function showHideForm(event) {
  const divShowHide = document.querySelector(".header-new-notes");
  if (divShowHide.dataset.formDisplay == "hide") {
    divShowHide.dataset.formDisplay = "show";
    showForm();
    blurBackground();
    stopScrolling();
  } else {
    divShowHide.dataset.formDisplay = "hide";
    hideForm();
    unBlurBackground();
    allowScrolling();
  }
  clearAddNoteForm();
}

function stopScrolling() {
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "hidden";
}

function allowScrolling() {
  document.body.style.overflowX = "";
  document.body.style.overflowY = "";
}

function blurBackground() {
  document.querySelector("header").style.filter = "blur(2px)";
  document.querySelector(".side-menu").style.filter = "blur(2px)";
  document.querySelector(".show-when-empty").style.filter = "blur(2px)";
  document.querySelector(".notes-show").style.filter = "blur(2px)";
  document.querySelector(".archive-show").style.filter = "blur(2px)";
  document.querySelector(".all-notes-show").style.filter = "blur(2px)";
  // form.style.filter
}

function unBlurBackground() {
  document.querySelector("header").style.filter = "";
  document.querySelector(".side-menu").style.filter = "";
  document.querySelector(".show-when-empty").style.filter = "";
  document.querySelector(".notes-show").style.filter = "";
  document.querySelector(".archive-show").style.filter = "";
  document.querySelector(".all-notes-show").style.filter = "";
}

function showForm() {
  const form = document.querySelector(".main-form-add-notes");
  form.style.display = "block";
}

function hideForm() {
  const form = document.querySelector(".main-form-add-notes");
  form.style.display = "none";
}
// show hide form - end

// store data to notes array and store it in localStorage - start

function addNote(event) {
  const form = document.querySelector("#form-add-notes");
  const currentTime = getCurrentTime();
  if (form.dataset.formNoteId != 0) {
    continueEditingFrom(event);
  }

  const tempChar = event.target.titleField.value.substring(0, 1).toLowerCase();
  if (!(tempChar == "_" || (tempChar >= "a" && tempChar <= "z"))) {
    showErrorMessageFromAdd();
    event.preventDefault();
    return;
  }

  const obj = getJavascriptObject(
    event.target.titleField.value,
    event.target.description.value,
    event.target.category.value,
    currentTime,
    form.dataset.formColor
  );

  storeNotesInLocalArrayAndInLocalStorage(obj);
  appendNoteCard(obj);
  updateLocalStorageCount();
  clearAddNoteForm(); // we clearing in hideShow function
  showHideForm();
  if (obj.category == "notes") {
    checkIfEmpty(notes);
  } else if (obj.category == "archive") {
    checkIfEmpty(archive);
  } else {
    if (!checkIfEmpty(notes) || !checkIfEmpty(archive)) {
      checkIfEmpty([1, 2]); //just random array
    }
  }
  event.preventDefault();
}

function updateLocalStorageCount() {
  localStorage.setItem("count", idCount);
}

function getJavascriptObject(t, desc, cate, d, col) {
  const obj = {
    id: idCount++,
    title: t,
    description: desc,
    category: cate,
    date: d,
    color: col,
  };
  return obj;
}

function appendNoteCard(obj, optional) {
  let div;
  if (optional == "search") {
    div = document.querySelector(`.${optional}-show`);
  } else {
    div = document.querySelector(`.${obj.category}-show`);
  }
  const cardDivHtml = getCardDiv(obj);
  const cardDivHtmlObject = getCardDivObject(cardDivHtml);
  div.appendChild(
    cardDivHtmlObject.documentElement.firstElementChild.nextElementSibling
      .firstElementChild
  );
}

function storeNotesInLocalArrayAndInLocalStorage(obj) {
  let arr = [];
  let category = "";
  switch (obj.category) {
    case "notes":
      arr = notes;
      category = obj.category;
      break;

    case "archive":
      arr = archive;
      category = obj.category;
      break;

    case "trash":
      arr = trash;
      category = obj.category;
      break;

    default:
      alert("Error while storing data!");
      return;
  }
  storeObjectInArray(arr, obj);
  storeInLocalStorage(arr, category);
}

function storeObjectInArray(arr, obj) {
  arr.push(obj);
}

function storeInLocalStorage(arr, category) {
  localStorage.setItem(category, JSON.stringify(arr));
}

function getCardDivObject(cardDivHtml) {
  return new DOMParser().parseFromString(cardDivHtml, "text/html");
}

function getCardDiv(obj) {
  let span = "";
  let displays = "";
  // console.log(obj);
  if (obj.category == "notes") {
    span = "archive";
  } else if (obj.category == "archive") {
    span = "notes";
  } else {
    span = "trash";
    displays = "none";
  }
  const htmlDiv = `<div class="note-card" id="note-card-${obj.id}" style="background:${obj.color}; overflow:hidden; data-category:${obj.category}">
  <div class="note-card-row-1">
    <span class="note-card-title">${obj.title}</span>
  </div>
  <div class="note-card-row-2">
    <span class="note-card-description">${obj.description}</span>
  </div>
  <div class="note-card-row-3">
    <span class="note-card-edit-time">${obj.date}</span>
  </div>
  <div class="note-card-row-4" id="note-card-features">
    <button type="button" value="edit" title="Edit" onclick="editNote(event)" style="background:${obj.color}; display:${displays}">
      <img src="./images/edit-icon.png" name="edit-img-logo" alt="" />
    </button>
    <button type="button" value="${span}" title="${span}" onclick="${span}Note(event)" style="background:${obj.color}">
      <img src="./images/${span}-icon.png" alt="" srcset="" />
    </button>
    <button type="button" value="delete" title="Delete" onclick="deleteNote(event)" style="background:${obj.color};">
      <img src="./images/delete-icon.png" alt="edit" />
    </button>
    <button type="button" value="select" title="Select" id="${obj.id}" style="background:${obj.color};">
      <input
        type="checkbox"
        name="selectedOrNot"
        id="${obj.id}"
        onclick="multipleDeleteArchiveHandler(event)";
        style="width: 18px; height: 18px; accent-color: ${obj.color}; color: ${obj.color}; background:${obj.color};"
      />
    </button>
  </div>
</div>
`;
  return htmlDiv;
}

function getCurrentTime() {
  return new Date().toLocaleString();
}

function clearAddNoteForm() {
  resetFormColorToDefault();
  removeFormColor();
  removeAddNoteText();
  const form = document.querySelector("#form-add-notes");
  form.dataset.formNoteId = "";
}

function removeAddNoteText() {
  const form = document.querySelector("#form-add-notes");
  form.titleField.value = "";
  form.description.value = "";
}

// store data to notes[] array and store it in localStorage as well - end

// close option for error message on form add form
function closeErrorMessageFromAdd() {
  document.querySelector(".error-message-form-add").style.zIndex = "";
}

function showErrorMessageFromAdd() {
  document.querySelector(".error-message-form-add").style.zIndex = 121;
}
