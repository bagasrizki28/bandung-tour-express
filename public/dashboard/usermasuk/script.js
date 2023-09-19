fetch("/api/accounts", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const deleteAccounts = document.getElementById("delete-accounts");

      deleteAccounts.onclick = () => {
        if (confirm(`Apakah Anda ingin menghapus Akun ini?`)) {
          fetch(`/api/deleteaccounts/${data[i].id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          localStorage.removeItem("token");
          location.href = "/login/login.html";
        }
      };
    }
  });

const logOut = document.getElementById("log-out");

logOut.onclick = () => {
  if (confirm(`Apakah anda ingin Log Out?`)) {
    localStorage.removeItem("token");
    location.href = "/login/login.html";
  }
};

const Booking = document.getElementById("booking");

Booking.onclick = () => {
  location.href = "/dashboard/booking/index.html";
};

const navBtn = document.getElementById("nav-btn");
const cancelBtn = document.getElementById("cancel-btn");
const sideNav = document.getElementById("sidenav");
const modal = document.getElementById("modal");

navBtn.addEventListener("click", function () {
  sideNav.classList.add("show");
  modal.classList.add("showModal");
});

cancelBtn.addEventListener("click", function () {
  sideNav.classList.remove("show");
  modal.classList.remove("showModal");
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    sideNav.classList.remove("show");
    modal.classList.remove("showModal");
  }
});
