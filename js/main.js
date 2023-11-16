// FETCH DATA CONTACT FROM API
const render = () => {
  let wrapContact = document.querySelector("#wrap-kontak");

  fetch("http://localhost:3000/contacts", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      let boxContact = "";

      response.forEach((contact) => {
        boxContact += `
        <div class="list-kontak" data-aos="fade-up" data-delay="100">
            <div class="name">${contact.name}</div>
            <div class="phone">${contact.phone}</div>
            <div class="provider">${contact.provider}</div>
            <a href="" class="call">Call</a>
        </div>
        `;
      });

      wrapContact.innerHTML = boxContact;
    })
    .catch((err) => console.log(err));
};

render();

// POST DATA CONTACT INTO SERVER
let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // mendapatkan data dari inputan form
  let name = document.getElementById("name").value;
  let phone = document.querySelector("#phone").value;
  let provider = document.querySelector(".input-provider").value;

  // kita simpan data nya dalam bentuk object
  let contact = { name, phone, provider };

  // mengirimkan data ke server melalui API
  fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "Application/Json",
    },
    body: JSON.stringify(contact),
  })
    .then((response) => response.json())
    .then((response) => {
        render();
    })
    .catch((err) => {
      console.log(err);
    });
});
