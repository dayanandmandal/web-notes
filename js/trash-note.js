function trashNote(event) {
  const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  const obj = removeObjFromGivenArrayAndId(trash, id);
  changeObjCategory(obj[0], "notes");
  notes = addObjToGivenArray(notes, obj[0]);
  updateLocalStorageData();
  removeObjFromDivDom("trash", obj[0].id);
  checkIfEmpty(trash);
  if (getHighlightedSideMenu() == "all-notes") {
    showAllNotes();
  }
}
