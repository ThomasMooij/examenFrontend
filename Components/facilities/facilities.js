import { facilities } from "./facilityItems.js";

const facilitiesGrid = document.getElementById("facilitiesGrid");
facilities.forEach((facility) => {
  const card = document.createElement("div");
  card.classList.add("col-lg-6", "mb-4");
  card.innerHTML = `
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">${facility.name}</h5>
              <p class="card-text">${facility.address}</p>
              <p class="card-text">${facility.phone}</p>
              <p class="card-text">${facility.email}</p>
            </div>
          </div>
        `;
  facilitiesGrid.appendChild(card);
});
