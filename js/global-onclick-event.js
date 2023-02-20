function globalClickEvent(event) {
  const showErrorMessageFromAddTemp = document.querySelector(
    ".error-message-form-add"
  );

  if (showErrorMessageFromAddTemp.contains(event.target)) {
    return;
  }
  closeErrorMessageFromAdd();

  const newNote = document.querySelector(".header-new-notes");
  if (newNote.contains(event.target)) {
    return;
  }

  if (
    event.target.name == "edit-img-logo" ||
    event.target.parentElement.value == ""
  ) {
    return;
  }

  const formNote = document.querySelector(".main-form-add-notes");
  if (formNote.contains(event.target)) {
    return;
  }

  const divShowHide = document.querySelector(".header-new-notes");
  if (divShowHide.dataset.formDisplay == "show") {
    divShowHide.dataset.formDisplay = "hide";
    hideForm();
    allowScrolling();
    unBlurBackground();
    hideMultipleMenu();
  }
}
