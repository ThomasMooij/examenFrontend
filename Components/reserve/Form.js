import { navigateToHomePage } from "../../Utils/navigate.js";
import { ClassItems } from "./ClassItems.js";
// Data word gestored om de data permanent te houden
function saveFormDataToLocalStorage(formData) {
  localStorage.setItem("reservationFormData", JSON.stringify(formData));
}

function showErrorMessage(inputId, message) {
  document.getElementById(inputId + "Error").innerText = message;
}
//FORM FUNCTIE
function initializeReservationForm() {
  const formData =
    JSON.parse(localStorage.getItem("reservationFormData")) || {};
  // Zie of de data nog beschikbaar is in local store
  document.getElementById("name").value = formData.name || "";
  document.getElementById("email").value = formData.email || "";
  document.getElementById("date").value = formData.date || "";
  document.getElementById("phone").value = formData.phone || "";
  document.getElementById("customerNum").value = formData.customerNum || "";
  document.getElementById("timeInputs").value = formData.customerNum || "";

  //Select box voor de lessen uit classItems array word in de select box gestopt
  const lessonSelect = document.getElementById("lesson");
  ClassItems.forEach((lesson) => {
    const option = document.createElement("option");
    option.text = lesson.name;
    option.value = lesson.name;
    lessonSelect.add(option);
  });
  // Nog geen geselecteerde klassen maar komt nog, niet hoger dan 3 en time box functionaliteit wordt hiermee geregeld
  let selectedClasses = [];
 //luistert voor veranderingen zodat de array van lessen en timeinputs up to date blijft
  lessonSelect.addEventListener("change", function (event) {
    const selectedOption = event.target.value;
    if (!selectedClasses.includes(selectedOption)) {
      selectedClasses.push(selectedOption);
    }
    updateTimeInputs(selectedClasses);
  });

  function updateTimeInputs(selectedClasses) {
    const timeInputs = document.getElementById("timeInputs");
    timeInputs.innerHTML = "";

    selectedClasses.forEach((className) => {

      if (selectedClasses.length > 3) {
        showErrorMessage("lesson", "U kunt maximaal 3 lessen reserveren");
        let selectedClass = selectedClasses.pop()
      }

      const timeInput = document.createElement("div");
      timeInput.className = "form-group";
      timeInput.innerHTML = `
        <div class="d-flex align-items-center">
          <label for="${className}">${className}</label>
          <input type="time" class="form-control mr-2" id="${className}" name="${className}" step="3600" required>
          <button type="button" class="btn btn-danger btn-sm" onclick="removeLesson('${className}')">Remove</button>
        </div>
      `;
      timeInputs.appendChild(timeInput);
    });
  }

  window.removeLesson = function(className) {
    selectedClasses = selectedClasses.filter(item => item !== className);
    updateTimeInputs(selectedClasses);
  }
  // INJECT FORM IN DIV
  document.getElementById("reservationForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date = document.getElementById('date').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const customerNum = document.getElementById('customerNum').value.trim();

    if (name === "") {
      showErrorMessage("name", "Gelieve uw naam in te vullen");
      return;
    } else {
      showErrorMessage("name", ""); 
    }
    if (email === "") {
      showErrorMessage("email", "Gelieve uw e-mailadres in te vullen");
      return;
    } else {
      showErrorMessage("email", ""); 
    }
    if (date === "") {
      showErrorMessage("date", "Gelieve een datum te kiezen");
      return;
    } 
    if (phone === "") {
      showErrorMessage("phone", "graag uw telefoonnummer verschaffen");
      return;
    } 
    if (selectedClasses.length === 0) {
      showErrorMessage("lesson", "Selecteer ten minste één les");
      return;
    }

    const reservationConfirmation = document.getElementById('reservationConfirmation');
    let totalPrice = 0;

    let confirmationMessage = `
      <header>Reservering Succesvol!</header>
      <header>Uw gegevens:</header>
      <p>Naam: ${name}</p>
      <p>email: ${email}</p>
      <p>telefoonnummer: ${phone}</p>
      <p>klantennummer: ${customerNum}</p>
      <p>Les(sen) en tijd(en):</p>
      <ul>
    `;

    selectedClasses.forEach((className) => {
      const classTime = document.getElementById(className).value;
      const selectedClass = ClassItems.find(item => item.name === className);
      let lessonPrice = selectedClass.price;
      const selectedTime = new Date(`2024-01-01T${classTime}`);
      const discountStartTime = new Date(`2024-01-01T11:00:00`);
      const discountEndTime = new Date(`2024-01-01T16:00:00`);
      if (selectedTime >= discountStartTime && selectedTime <= discountEndTime) {
        lessonPrice *= 0.7;
      }
      totalPrice += lessonPrice;
      confirmationMessage += `<li>${className}: ${classTime}, Prijs: ${lessonPrice.toFixed(2)} euro</li>`;
    });

    confirmationMessage += `</ul><p>Totaalprijs: ${totalPrice.toFixed(2)} euro</p>`;
    reservationConfirmation.innerHTML = confirmationMessage;

    const formData = { name, email, date, phone,customerNum};
    saveFormDataToLocalStorage(formData);

    document.getElementById("reservationForm").reset();
  });
}

initializeReservationForm();
