function changeFormBgColorOnClick(event) {
  if (event.target.type == "button") {
    setFormColorPermanently(event.target.value);
  }
}

function setFormColorPermanently(color) {
  const form = document.querySelector("#form-add-notes");
  form.dataset.formColor = color;
  setFormBgColorUsingDataSet();
}

function changeFormBgColorOnMouseOver(event) {
  if (event.target.type == "button") {
    setFormColor(event.target.value);
  }
}

function removeFormBgColorOnMouseOut() {
  removeFormColor();
}

function setFormColor(color) {
  const form = document.querySelector("#form-add-notes");
  form.style.backgroundColor = color;
  form.titleField.style.backgroundColor = color;
  form.description.style.backgroundColor = color;
  document.querySelector("#submit-button").style.backgroundColor = color;
}

function removeFormColor() {
  const form = document.querySelector("#form-add-notes");
  form.style.backgroundColor = "";
  form.titleField.style.backgroundColor = "";
  form.description.style.backgroundColor = "";
  document.querySelector("#submit-button").style.backgroundColor = "";
  setFormBgColorUsingDataSet();
}

function resetFormColorToDefault() {
  const form = document.querySelector("#form-add-notes");
  form.dataset.formColor = "#ffffff";
}

function setFormBgColorUsingDataSet() {
  const form = document.querySelector("#form-add-notes");
  form.style.backgroundColor = form.dataset.formColor;
  form.titleField.style.backgroundColor = form.dataset.formColor;
  form.description.style.backgroundColor = form.dataset.formColor;
  document.querySelector("#submit-button").style.backgroundColor =
    form.dataset.formColor;
}
