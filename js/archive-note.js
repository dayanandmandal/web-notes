function archiveNote(event) {
  const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  const obj = removeObjFromGivenArrayAndId(notes, id);
  changeObjCategory(obj[0], "archive");
  archive = addObjToGivenArray(archive, obj[0]);
  updateLocalStorageData();
  removeObjFromDivDom("notes", obj[0].id);
  checkIfEmpty(notes);
  if (getHighlightedSideMenu() == "all-notes") {
    showAllNotes();
  }

  // if (obj[0].category == "notes") {
  //   checkIfEmpty(notes);
  // } else if (obj[0].category == "archive") {
  //   checkIfEmpty(archive);
  // } else {
  //   if (!checkIfEmpty(notes) || !checkIfEmpty(archive)) {
  //     checkIfEmpty([1, 2]); //just random array
  //   }
  // }
  // if (getHighLightedSideMenu() == "all-notes-show") {
  //   showAllNotes();
  // }
}

function changeObjCategory(obj, category) {
  obj.category = category;
}

function removeObjFromDivDom(category, id) {
  const notesShowDomArray = document.querySelector(
    `.${category}-show`
  ).childNodes;
  for (let divDom of notesShowDomArray) {
    if (divDom.id.substring(10) == id) {
      divDom.remove();
    }
  }
}

function removeObjFromGivenArrayAndId(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == id) {
      return arr.splice(i, 1);
    }
  }
}

function addObjToGivenArray(arr, obj) {
  arr.push(obj);
  return arr;
}

function updateLocalStorageData() {
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("archive", JSON.stringify(archive));
  localStorage.setItem("trash", JSON.stringify(trash));
}
