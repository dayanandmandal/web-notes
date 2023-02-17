// let idEditingFile = -1;
// let categoryEditingFile = "";

function editNote(event) {
  showHideForm();
  hideMultipleMenu();
  const id = getIdEditFile(event.currentTarget);
  const cate = getCategoryEditFile(event.currentTarget);
  const obj = getObjFromGivenIdAndCategory(cate, id);
  copyDataFromObjToFormDiv(obj); // add correct background color

  //title - $0.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML
  // desc - $0.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.innerHTML
  // cate opp. -  $0.parentElement.parentElement.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling.value
}

function getIdEditFile(target) {
  return +target.parentElement.parentElement.id.substring(10);
}

function getCategoryEditFile(target) {
  if (
    target.parentElement.parentElement.firstElementChild.nextElementSibling
      .nextElementSibling.nextElementSibling.firstElementChild
      .nextElementSibling.value == "notes"
  ) {
    return "archive";
  } else {
    return "notes";
  }
}

function getObjFromGivenIdAndCategory(category, id) {
  if (category == "notes") {
    return getObjFromGivenArrayAndId(notes, id);
  } else {
    return getObjFromGivenArrayAndId(archive, id);
  }
}

function getObjFromGivenArrayAndId(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      return arr[i];
    }
  }
}

function copyDataFromObjToFormDiv(obj) {
  const divForm = document.querySelector("#form-add-notes");
  divForm.titleField.value = obj.title;
  divForm.description.value = obj.description;
  divForm.style.background = obj.color;
  divForm.titleField.style.background = obj.color;
  divForm.description.style.background = obj.color;
  divForm.querySelector("#submit-button").style.background = obj.color;
  if (obj.category == "archive") {
    divForm.querySelector("#category-hidden-add-form").selectedIndex = 1;
  }
  divForm.dataset.formColor = obj.color;
  divForm.dataset.formNoteId = obj.id;
}

function continueEditingFrom(event) {
  const form = document.querySelector("#form-add-notes");
  const cate = document.querySelector("#category-hidden-add-form").value;
  const currentTime = getCurrentTime();
  deleteNoteFromEditingFile(cate, form.dataset.formNoteId);
  form.dataset.formNoteId = 0;
}

function deleteNoteFromEditingFile(cate, id) {
  let obj;
  if (cate == "notes") {
    obj = removeObjFromGivenArrayAndId(notes, id);
    removeObjFromDivDom("notes", obj[0].id);
  } else {
    obj = removeObjFromGivenArrayAndId(archive, id);
    removeObjFromDivDom("archive", obj[0].id);
  }
  updateLocalStorageData();
  if (getHighlightedSideMenu() == "all-notes") {
    showAllNotes();
  }
}
