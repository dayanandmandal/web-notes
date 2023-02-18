function showSearchResult(event) {
  //   if (event.currentTarget.id != "form-search") {
  //     return;
  //   }
  const searchText = event.currentTarget.querySelector(
    "#input-search-field"
  ).value;

  if (searchText.length < 1) {
    hideAndClearSearchResultDiv();
    event.preventDefault();
    return;
  }

  //   const tokens = getSearchToken(searchText);
  const tokens = searchText
    .toLowerCase()
    .split(" ")
    .filter((token) => token.trim() !== "");

  const searchRegex = new RegExp(tokens.join("|"), "i");

  const searchResultObjectArray = notes.filter((noteObj) => {
    return noteObj.title.match(searchRegex);
  });

  hideAndClearSearchResultDiv();
  showSearchResultDiv();
  appendSearchResultToSearchDiv(searchResultObjectArray);
  displayAllNotesFromGivenArray(searchResultObjectArray, "search");

  //   appendSearchResultToSearchDiv(searchResultObjectArray);

  event.preventDefault();
}

function appendSearchResultToSearchDiv(arr) {
  for (let obj of arr) {
  }
}

function showSearchResultDiv() {
  document.querySelector(".search-show").style.zIndex = "11";
}

function hideAndClearSearchResultDiv() {
  document.querySelector(".search-show").style.zIndex = "";
  document.querySelector(".search-show").innerHTML = "";
}

function clearSearchInputField() {
  document.querySelector("#input-search-field").value = "";
}
