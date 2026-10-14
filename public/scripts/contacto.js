const form = document.getElementById("formula");
const url = `https://visits-christian-guardias-projects.vercel.app/form/apartaestudio`;
// const url = `http://localhost:3000/form/apartaestudio`;
const input = document.getElementsByTagName("input");
const btn = document.getElementById("demo-form");
const message = document.getElementById("msg-error");
const preview = document.getElementsByClassName('preview');
// const token = getCookie("token");

let imgs = [];

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

function totalFileSize(a,b) {
  let fileSize = 1024 * 1024 * 4.5;

  if ((a+b) > fileSize) {
    document.getElementById("msg-error").innerHTML =
        `<span style="color:darkred;">Maximo peso permitido  4.5 MB</span>`;

        btn.disabled = true;
  } else {
    btn.disabled = false;
    document.getElementById("msg-error").innerHTML =
        `<span style="color:green;">Envía...</span>`;
  }
}


input[3].addEventListener("change", function (e) {
  let file = e.target.files[0];
  if(!file) return;

  imgs.splice(0, 2, file, imgs[1]);

  loadPreviewIMG(e,0,file);

  if (!imgs[1]) return totalFileSize(imgs[0].size, 0);

  totalFileSize(imgs[0].size, imgs[1].size);

});

input[4].addEventListener("change", function (e) {
  let file = e.target.files[0];
  if(!file) return;

  imgs.splice(0, 2,imgs[0], file);
  loadPreviewIMG(e,1,file);

  if (!imgs[0]) return totalFileSize(0, imgs[1].size);

  totalFileSize(imgs[0].size, imgs[1].size);

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

    document.getElementById("msg-error").innerHTML =
        `<span style="color:green;">Envíando...<img src="../public/svg/circle.svg" alt="loading" width="90" height="90"></span>`;

    const formData = new FormData(form);

    formData.append("date", dateNow);

    imgs.forEach((file, index) => {
      formData.append(`filename`, file);
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
          message.innerHTML = `<span style="color:darkred; font-size:bold;"> ${response.status} Server error </span>`;
          // alert("File size too large. MAX SIZE = 4.5mb");
          // window.location.reload();
        }

          if (response.status === 413) {
            message.innerText = "File size too large. MAX SIZE = 4.5mb";
            alert("File size too large. MAX SIZE = 4mb");
            window.location.reload();
          }

          if (response.status === 200 || response.status === 201) {
            alert("Form submitted successfully!");
            window.location.href = "https://www.apartamentodealquiler.shop/";
          }


          // if (response.message === "Invalid token") {
          //   removeCookie("token");
          //   sectionB.setAttribute("class", "hidden");
          //   sectionA.removeAttribute("class", "hidden");
          //   return (message.innerText = response.message + " Inicia sesion");
          // }
      })
      .catch((error) => {
        console.error("Error:", error);

        return (message.innerHTML = `<span style="color:darkred;">${error}</span>`);
      });
  });
}

submitForm();
