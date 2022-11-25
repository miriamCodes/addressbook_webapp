// --- creating a class of philosopher

class Philosopher {
  constructor(name, surname, city, country, number) {
    this.name = name;
    this.surname = surname;
    this.city = city;
    this.country = country;
    this.number = parseInt(number);
  }
}

// --- setting two global scope arrays, philStore as source of truth and philShown as representer

let philStore = [];
let philShown = [];

// --- setting often used local variables to global variables

let nameInput = $("#name");
let surnameInput = $("#surname");
let cityInput = $("#city");
let countryInput = $("#country");
let phoneInput = $("#phoneNumber");

// --- function to create test data and fill the table in one click, making it easier to test while continuing to code

function createTestData() {
  let phil = new Philosopher("Hans", "Jonas", "New York", "USA", "212345678");
  addPhilosopher(phil);
  phil = new Philosopher("John", "Dewey", "New York", "USA", "212987456");
  addPhilosopher(phil);
  phil = new Philosopher(
    "Ludwig",
    "Wittgenstein",
    "Cambridge",
    "UK",
    "01223456789"
  );
  addPhilosopher(phil);
  phil = new Philosopher(
    "Joana",
    "Bryson",
    "Massachusetts",
    "USA",
    "6172531000"
  );
  addPhilosopher(phil);
  phil = new Philosopher(
    "Gilbert",
    "Simondon",
    "Palaiseau",
    "France",
    "5400003450"
  );
  addPhilosopher(phil);
  phil = new Philosopher(
    "Simone",
    "de Beauvoir",
    "Paris",
    "France",
    "33140000000"
  );
  addPhilosopher(phil);
  phil = new Philosopher("Luciano", "Floridi", "Oxford", "UK", "1865270000");
  addPhilosopher(phil);
  phil = new Philosopher(
    "Julian",
    "Nida-Ruemelin",
    "Munich",
    "Germany",
    "08921809000"
  );
  addPhilosopher(phil);
  console.log(philStore);
  renderAll(philStore);
}

// --- function to append new rows, using jQuery to intialize a new variable as a line in html

function appendRow(name, surname, position) {
  let markup =
    "<tr id=" +
    position +
    "><td>" +
    name +
    "</td><td>" +
    surname +
    "</td></tr>";
  let tableBody = $("table tbody");
  tableBody.append(markup);
}

// --- function to add new objects into the array philStore

function addPhilosopher(phil) {
  console.log("Adding a phil");
  philStore.push(phil);
  console.log("Philstore looks like: ", philStore);
}

// --- function to empty the table and print the current array of represented objects (aka philShown)

function renderAll(incomingPhilArray) {
  let showPhils = sortPhilArray(incomingPhilArray);
  philShown = showPhils;
  $("#table tbody").empty();
  console.log("Representing array of phils looks like: ", showPhils);
  for (let i = 0; i < showPhils.length; i++) {
    console.log(showPhils[i]);
    appendRow(showPhils[i].name, showPhils[i].surname, i);
  }
}

// --- function to add and print an object to table

function philForm() {
  let name = nameInput.val();
  let surname = surnameInput.val();
  let city = cityInput.val();
  let country = countryInput.val();
  let number = phoneInput.val();

  console.log("Form seems valid!");
  let phil = new Philosopher(name, surname, city, country, number);
  addPhilosopher(phil);
  renderAll(philStore);
}

// --- function for form validation

function validateForm() {
  let valid = true;

  if (nameInput.val().length < 1) {
    nameInput.addClass("ui-state-error");
    valid = false;
  } else {
    nameInput.removeClass("ui-state-error");
  }

  if (surnameInput.val().length < 1) {
    surnameInput.addClass("ui-state-error");
    valid = false;
  } else {
    surnameInput.removeClass("ui-state-error");
  }

  if (cityInput.val().length < 1) {
    cityInput.addClass("ui-state-error");
    valid = false;
  } else {
    cityInput.removeClass("ui-state-error");
  }

  if (countryInput.val().length < 1) {
    countryInput.addClass("ui-state-error");
    valid = false;
  } else {
    countryInput.removeClass("ui-state-error");
  }

  if (phoneInput.val().length < 1) {
    phoneInput.addClass("ui-state-error");
    valid = false;
  } else {
    phoneInput.removeClass("ui-state-error");
  }

  return valid;
}

// --- using jQuery to create a popup that interacts with the form on html and resets when closed

let formDialog = $("#form").dialog({
  autoOpen: false,
  height: 500,
  width: 500,
  modal: true,
  buttons: {
    cancel: function () {
      $(this).dialog("close");
    },
    save: function () {
      if (validateForm()) {
        philForm();
        $(this).dialog("close");
      }
    },
  },
  close: function () {
    $("#form")[0].reset();
    nameInput.removeClass("ui-state-error");
    surnameInput.removeClass("ui-state-error");
    cityInput.removeClass("ui-state-error");
    countryInput.removeClass("ui-state-error");
    phoneInput.removeClass("ui-state-error");
  },
});

// --- function to open the above (makes it easier to link to html)
function openPhilForm() {
  formDialog.dialog("open");
}

// --- using jQuery to display the contact details in a pop up when clicking the row of a persons name or surname

$("#table tbody").on("click", "tr", function () {
  console.log("Clicked on this line: ", this.id);
  let philPos = philShown[this.id];
  let currentId = this.id;
  console.log("Current phil clicked: ", philPos);

  let textPop =
    "<p> NAME:    " +
    philPos.name +
    " <br/>" +
    "SURNAME:   " +
    philPos.surname +
    " <br/>" +
    "CITY:    " +
    philPos.city +
    " <br/>" +
    "COUNTRY:   " +
    philPos.country +
    " <br/>" +
    "PHONE:   " +
    philPos.number +
    " <br/>" +
    "</p>";

  $("#contactCard").dialog({
    modal: true,
    open: function () {
      $(this).html(textPop);
    },
    buttons: {
      delete: function () {
        deletePhil(currentId);
        $(this).dialog("close");
      },
      close: function () {
        $(this).dialog("close");
      },
    },
  });
});

// --- function to call the jquery above

function deletePhil(id) {
  console.log(philStore);

  philStore.splice(id, 1);
  renderAll(philStore);
}

// --- function to display the array alphabetically ordered, inspired by freeCodeCamp
// additionally replacing white spaces to manage double names as one word (e.g. de Beauvoir)

function sortPhilArray(showPhils) {
  return showPhils.sort(function (phil1, phil2) {
    if (
      phil1.surname.replace(" ", "").toUpperCase() <
      phil2.surname.replace(" ", "").toUpperCase()
    ) {
      return -1;
    }
    if (
      phil1.surname.replace(" ", "").toUpperCase() >
      phil2.surname.replace(" ", "").toUpperCase()
    ) {
      return 1;
    }
    return 0;
  });
}

// --- function to filter the array philStore and only show true results in the table while tiping

function searchPhil() {
  let searchTerm = $("#searchTerm").val();
  let philFiltered = philStore.filter((element) => {
    if (
      element.name.toUpperCase().includes(searchTerm.toUpperCase()) ||
      element.surname.toUpperCase().includes(searchTerm.toUpperCase()) ||
      element.city.toUpperCase().includes(searchTerm.toUpperCase()) ||
      element.country.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return true;
    } else {
      return false;
    }
  });
  console.log("Filtered phils are: ", philFiltered);
  renderAll(philFiltered);
}

//search while tiping aka input change
$("#searchTerm").on("input", function () {
  searchPhil();
});
