let idCategoryArrayForMultipleDeleteArchive = [];

function multipleDeleteArchiveHandler(event) {
  showMultipleMenu();
  const cate = getCategoryMultipleFile(event.currentTarget);
  const obj = getObjMultipleFile(event.target.id, cate);
  let tf = checkIfAlreadyPresent(event.target.id);
  if (tf == false) {
    storeObjectInArray(idCategoryArrayForMultipleDeleteArchive, obj);
  } else {
    removeObjectFromArrayMultipleFile(
      idCategoryArrayForMultipleDeleteArchive,
      event.target.id
    );
  }
  if (idCategoryArrayForMultipleDeleteArchive.length == 0) {
    hideMultipleMenu();
  }
}

function removeObjectFromArrayMultipleFile(arr, id) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    if (idCategoryArrayForMultipleDeleteArchive[i].id == id) {
      arr.splice(i, 1);
    }
  }
}

function checkIfAlreadyPresent(id) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    if (idCategoryArrayForMultipleDeleteArchive[i].id == id) {
      return true;
    }
  }
  return false;
}

function getObjMultipleFile(id1, cate) {
  return {
    id: id1,
    category: cate,
  };
}

function getCategoryMultipleFile(target) {
  if (
    target.parentElement.parentElement.firstElementChild.nextElementSibling
      .value == "archive"
  ) {
    return "notes";
  } else if (
    target.parentElement.parentElement.firstElementChild.nextElementSibling
      .value == "notes"
  ) {
    return "archive";
  } else {
    return "trash";
  }
}

function showMultipleMenu() {
  const div = document.querySelector(".multiple-archive-delete");
  const highlight = getHighlightedSideMenu();
  if (highlight == "notes") {
    hideHiddenMenuButton("notes");
  } else {
    hideHiddenMenuButton("");
  }
  div.style.zIndex = 10;
  // reset all button style
}

function hideHiddenMenuButton(category) {
  if (category == "notes") {
    document.querySelector(`#multiple-notes-button`).style.display = "none";
  } else {
    document.querySelector(`#multiple-archive-button`).style.display = "none";
  }
}

function getHighlightedSideMenu() {
  // const div = document.querySelector(".side-menu").nodeList;
  // let temp;
  // for(let i = 0; i<div.childElementCount; i++) {
  //   temp = div.firstElementChild.id;
  //   if (checkIfHighlighted(`#${temp}`) == true) {
  //     return
  //   }
  // }

  div = document.querySelector("#side-menu-notes-a");
  if (div.style.backgroundColor == "rgb(254, 239, 195)") {
    return "notes";
  }

  div = document.querySelector("#side-menu-archive-a");
  if (div.style.backgroundColor == "rgb(254, 239, 195)") {
    return "archive";
  }

  div = document.querySelector("#side-menu-trash-a");
  if (div.style.backgroundColor == "rgb(254, 239, 195)") {
    return "trash";
  }

  div = document.querySelector("#side-menu-all-notes-a");
  if (div.style.backgroundColor == "rgb(254, 239, 195)") {
    return "all-notes";
  }
}

function hideMultipleMenu() {
  const div = document.querySelector(".multiple-archive-delete");
  div.style.zIndex = "";
  resetButtonStyle();
  unSelectAllCheckbox();
}
function resetButtonStyle() {
  document.querySelector("#multiple-notes-button").style.display = "";
  document.querySelector("#multiple-archive-button").style.display = "";
}

function deleteAllCard(event) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    deleteSingleCardMultipleFile(
      idCategoryArrayForMultipleDeleteArchive[i].id,
      idCategoryArrayForMultipleDeleteArchive[i].category
    );
  }
  idCategoryArrayForMultipleDeleteArchive = [];
  hideMultipleMenu();
}

function deleteSingleCardMultipleFile(id, cate) {
  //   const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  let obj = "";
  if (cate == "notes") {
    obj = removeObjFromGivenArrayAndId(notes, id);
    removeObjFromDivDom("notes", obj[0].id);
    changeObjCategory(obj[0], "trash");
    storeObjectInArray(trash, obj[0]);
  } else if (cate == "archive") {
    obj = removeObjFromGivenArrayAndId(archive, id);
    removeObjFromDivDom("archive", obj[0].id);
    changeObjCategory(obj[0], "trash");
    storeObjectInArray(trash, obj[0]);
  } else {
    obj = removeObjFromGivenArrayAndId(trash, id);
    removeObjFromDivDom("trash", obj[0].id);
  }
  // if (obj[0].category != "trash") {
  //   changeObjCategory(obj[0], "trash");
  //   storeObjectInArray(trash, obj[0]);
  // }
  updateLocalStorageData();

  if (obj[0].category == "notes") {
    checkIfEmpty(notes);
  } else if (obj[0].category == "archive") {
    checkIfEmpty(archive);
  } else if (obj[0].category == "trash") {
    checkIfEmpty(trash);
  } else {
    if (
      !checkIfEmpty(notes) ||
      !checkIfEmpty(archive) ||
      !checkIfEmpty(trash)
    ) {
      checkIfEmpty([1, 2]); //just random array
    }
  }
}

function archiveAllCard(event) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    archiveSingleCardMultipleFile(
      idCategoryArrayForMultipleDeleteArchive[i].id,
      idCategoryArrayForMultipleDeleteArchive[i].category
    );
  }
  idCategoryArrayForMultipleDeleteArchive = [];
  hideMultipleMenu();
}

function archiveSingleCardMultipleFile(id, cate) {
  // if (cate == "archive") {
  //   alert("Already in archive");
  //   unSelectAllCheckbox();
  //   idCategoryArrayForMultipleDeleteArchive = [];
  //   hideMultipleMenu();
  // }
  // const id = event.currentTarget.parentElement.parentElement.id.substring(10);
  const obj = removeObjFromGivenArrayAndId(notes, id);
  changeObjCategory(obj[0], "archive");
  archive = addObjToGivenArray(archive, obj[0]);
  updateLocalStorageData();
  removeObjFromDivDom("notes", obj[0].id);
  checkIfEmpty(notes);
}

function unSelectAllCheckbox() {
  const checkedBoxList = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  if (checkedBoxList.length == 0) {
    return;
  }
  for (let i = 0; i < checkedBoxList.length; i++) {
    checkedBoxList[i].checked = false;
  }
}

function notesAllCard(event) {
  for (let i = 0; i < idCategoryArrayForMultipleDeleteArchive.length; i++) {
    notesSingleCardMultipleFile(
      idCategoryArrayForMultipleDeleteArchive[i].id,
      idCategoryArrayForMultipleDeleteArchive[i].category
    );
  }
  idCategoryArrayForMultipleDeleteArchive = [];
  hideMultipleMenu();
}

function notesSingleCardMultipleFile(id, cate) {
  console.log(id + cate);
  let obj;
  if (cate == "archive") {
    obj = removeObjFromGivenArrayAndId(archive, id);
    console.log(obj);
    changeObjCategory(obj[0], "notes");
    notes = addObjToGivenArray(notes, obj[0]);
    updateLocalStorageData();
    removeObjFromDivDom("archive", obj[0].id);
    checkIfEmpty(archive);
  } else if (cate == "trash") {
    obj = removeObjFromGivenArrayAndId(trash, id);
    changeObjCategory(obj[0], "notes");
    notes = addObjToGivenArray(notes, obj[0]);
    updateLocalStorageData();
    removeObjFromDivDom("trash", obj[0].id);
    checkIfEmpty(trash);
  }
  // const obj = removeObjFromGivenArrayAndId(notes, id);
  // changeObjCategory(obj[0], "archive");
  // archive = addObjToGivenArray(archive, obj[0]);
  // updateLocalStorageData();
  // removeObjFromDivDom("notes", obj[0].id);
  // checkIfEmpty(notes);
}
