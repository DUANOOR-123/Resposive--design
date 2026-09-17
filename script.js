/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {
  const isOpen = menuToggle.classList.toggle("active");

  navMenu.classList.toggle("show");

  menuToggle.setAttribute("aria-expanded", isOpen);
});

/* =========================
   DROPDOWN
========================= */

const dropdownButton = document.getElementById("dropdownButton");

const dropdownMenu = document.getElementById("dropdownMenu");

dropdownButton.addEventListener("click", function () {
  const isOpen = dropdownMenu.classList.toggle("show");

  dropdownButton.setAttribute("aria-expanded", isOpen);
});

/* =========================
   FORM VALIDATION
========================= */

const form = document.getElementById("demoForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name");

  const email = document.getElementById("email");

  const message = document.getElementById("message");

  let valid = true;

  if (name.value.trim() === "") {
    name.parentElement.classList.add("error");

    valid = false;
  } else {
    name.parentElement.classList.remove("error");
  }

  if (email.value.trim() === "" || !email.value.includes("@")) {
    email.parentElement.classList.add("error");

    valid = false;
  } else {
    email.parentElement.classList.remove("error");
  }

  if (message.value.trim() === "") {
    message.parentElement.classList.add("error");

    valid = false;
  } else {
    message.parentElement.classList.remove("error");
  }

  if (valid) {
    showToast();

    form.reset();
  }
});

/* =========================
   MODAL
========================= */

const openModal = document.getElementById("openModal");

const closeModal = document.getElementById("closeModal");

const modalOverlay = document.getElementById("modalOverlay");

const modalAction = document.getElementById("modalAction");

let lastFocusedElement;

openModal.addEventListener("click", function () {
  lastFocusedElement = document.activeElement;

  modalOverlay.classList.add("show");

  modalOverlay.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";

  closeModal.focus();
});

function closeModalFunction() {
  modalOverlay.classList.remove("show");

  modalOverlay.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

closeModal.addEventListener("click", closeModalFunction);

modalAction.addEventListener("click", closeModalFunction);

modalOverlay.addEventListener("click", function (event) {
  if (event.target === modalOverlay) {
    closeModalFunction();
  }
});

/* =========================
   MODAL KEYBOARD
========================= */

document.addEventListener("keydown", function (event) {
  if (!modalOverlay.classList.contains("show")) {
    return;
  }

  if (event.key === "Escape") {
    closeModalFunction();

    return;
  }

  if (event.key === "Tab") {
    const focusableElements = modalOverlay.querySelectorAll(
      "button, input, textarea, a",
    );

    const first = focusableElements[0];

    const last = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();

      last.focus();
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();

      first.focus();
    }
  }
});

/* =========================
   TOAST
========================= */

const toastButton = document.getElementById("toastButton");

const toast = document.getElementById("toast");

let toastTimer;

toastButton.addEventListener("click", showToast);

function showToast() {
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

/* =========================
   SORTABLE TABLE
========================= */

const tableData = [
  {
    name: "Ayesha",
    role: "Designer",
    status: "Active",
    score: 92,
  },

  {
    name: "Bilal",
    role: "Developer",
    status: "Active",
    score: 88,
  },

  {
    name: "Dua",
    role: "Frontend",
    status: "Review",
    score: 95,
  },

  {
    name: "Hamza",
    role: "Developer",
    status: "Inactive",
    score: 76,
  },
];

const tableBody = document.getElementById("tableBody");

let currentColumn = "";
let ascending = true;

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach(function (person) {
    const row = document.createElement("tr");

    row.innerHTML = `

            <td>${person.name}</td>

            <td>${person.role}</td>

            <td>${person.status}</td>

            <td>${person.score}</td>

        `;

    tableBody.appendChild(row);
  });
}

renderTable(tableData);

const sortButtons = document.querySelectorAll(".sort-button");

sortButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const column = button.dataset.column;

    if (currentColumn === column) {
      ascending = !ascending;
    } else {
      currentColumn = column;

      ascending = true;
    }

    const sortedData = [...tableData].sort(function (a, b) {
      if (typeof a[column] === "number") {
        return ascending ? a[column] - b[column] : b[column] - a[column];
      }

      return ascending
        ? a[column].localeCompare(b[column])
        : b[column].localeCompare(a[column]);
    });

    renderTable(sortedData);
  });
});

/* =========================
   PAGINATION
========================= */

const pageButtons = document.querySelectorAll(".page-number");

pageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    pageButtons.forEach(function (item) {
      item.classList.remove("active-page");
    });

    button.classList.add("active-page");
  });
});
