function notesNote(event) {
  const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  const obj = removeObjFromGivenArrayAndId(archive, id);
  changeObjCategory(obj[0], "notes");
  notes = addObjToGivenArray(notes, obj[0]);
  updateLocalStorageData();
  removeObjFromDivDom("archive", obj[0].id);
  checkIfEmpty(archive);
  if (getHighlightedSideMenu() == "all-notes") {
    showAllNotes();
  }
}

function removeObjFromArchiveDom(id) {
  const notesShowDomArray = document.querySelector(".archive-show").childNodes;
  for (let divDom of notesShowDomArray) {
    if (divDom.id.substring(10) == id) {
      divDom.remove();
    }
  }
}
