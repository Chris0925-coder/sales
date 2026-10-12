const form = document.getElementById("formula");
// const url = `https://visits-christian-guardias-projects.vercel.app/form/apartaestudio`;
const url = `http://localhost:3000/form/apartaestudio`;
const input = document.getElementsByTagName("input");
const btn = document.getElementById("demo-form");
const message = document.getElementById("msg-error");
const preview = document.getElementsByClassName('preview');
// const token = getCookie("token");

let imgs = ["img.png","img2.jpg"];

const reader = new FileReader();

function loadPreviewIMG(e,a,file) {
  reader.onload = (e) => {
    preview[a].innerHTML = `<img src="${reader.result}" alt="${e.target.name}" width="100" height="130">`;
    preview[a].style.display = "block";
    };
    reader.onerror = () => {
      errorMsg.textContent = "Error reading file.";
    };

    reader.readAsDataURL(file);
}

input[3].addEventListener("change", function (e) {
  let file = e.target.files[0];
  if(!file) return;
  // imgs.push(file);
  imgs.splice(0, 1, file);
  loadPreviewIMG(e,0,file);
});

input[4].addEventListener("change", function (e) {
  let file = e.target.files[0];
  if(!file) return;
  // imgs.push(file);
  imgs.splice(1, 1, file);
  loadPreviewIMG(e,1,file);
});

const opciones = {
  timeZone: "America/Panama",
  year: "numeric",
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "numeric",
  hour12: true,
};

const dateNow = new Intl.DateTimeFormat("es-PA", opciones).format(d);

function submitForm() {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    btn.disabled = true;

    const formData = new FormData(form);

    formData.append("date", dateNow);

    imgs.forEach((file, index) => {
      // Append each file with the same field name 'images'
      formData.append("filename", file);
    });

     if (
      formData.get("fullname").length == 0 ||
      formData.get("phone").length == 0
    ) {
      document.getElementById("msg-error").innerHTML =
        `<span style="color:darkred;">Required fill empty field.</span>`;

      return false;
    } 

    await fetch(url, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Methods": "GET,HEAD,POST,OPTIONS",
      },
      body: formData,
    })
      .then((response) => {
        response.text();
        if (response.status === 500) {
          message.innerText = response.message;
          // alert("File size too large. MAX SIZE = 4.5mb");
          // window.location.reload();

          if (response.status === 413) {
            message.innerText = "File size too large. MAX SIZE = 4.5mb";
            alert("File size too large. MAX SIZE = 4.5mb");
            window.location.reload();
          }

          if (response.message === "LIMIT_FILE_SIZE") {
            alert("File size too large. MAX SIZE = 4.5mb");
            window.location.reload();
          }

          if (response.message === "Invalid token") {
            removeCookie("token");
            sectionB.setAttribute("class", "hidden");
            sectionA.removeAttribute("class", "hidden");
            return (message.innerText = response.message + " Inicia sesion");
          }
        }
      })
      .then((data) => console.log(data))
      .catch((error) => {
        console.error("Error:", error);

        return (message.innerHTML = `<span style="color:darkred;">${error}</span>`);
      });

    // alert("Form submitted successfully!");
    console.log("successfully");

    // window.location.href = "https://www.apartamentodealquiler.shop/";
  });
}

submitForm();
