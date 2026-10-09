const form = document.getElementById('formula');
const url = `https://visits-christian-guardias-projects.vercel.app/form/apartaestudio`;
const btn = document.getElementById("demo-form");

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


// const token = getCookie("token");
const dateNow = new Intl.DateTimeFormat("es-PA", opciones).format(d);

function submitForm() {

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); 
        btn.disabled = true;
             
        const formData = new FormData(form);

        formData.append("date", dateNow);

        if (formData.get('name').length == 0 || formData.get('phone').length == 0) {

            document.getElementById('msg-error').innerHTML = `<span style="color:darkred;">Required fill empty field.</span>`;

            return false;
        } 

          await fetch(url, {
            method: 'POST',
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
              message.innerText = res.message;
              // alert("File size too large. MAX SIZE = 4.5mb");
              // window.location.reload();
            }

            if (response.status === 413) {
              message.innerText = "File size too large. MAX SIZE = 4.5mb";
              alert("File size too large. MAX SIZE = 4.5mb");
              window.location.reload();
            }

            if (res.message === "LIMIT_FILE_SIZE") {
              alert("File size too large. MAX SIZE = 4.5mb");
              window.location.reload();
            }

            if (res.message === "Invalid token") {
              removeCookie("token");
              sectionB.setAttribute("class", "hidden");
              sectionA.removeAttribute("class", "hidden");
              return (message.innerText = res.message + " Inicia sesion");
            }
            })
          .then((data) => console.log(data))
          .catch((error) => {
            console.error('Error:', error);
            
            return document.getElementById('msg-error').innerHTML = `<span style="color:darkred;">${error}</span>`;
        });
       


        alert('Form submitted successfully!');


        window.location.href = "https://www.apartamentodealquiler.shop/";
    });
}

submitForm();