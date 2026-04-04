const form = document.getElementById('formula');


function form() {

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); 
             
        const formData = new FormData(form);

        if (formData.get('email').length == 0 || formData.get('control').length == 0) {

            document.getElementById('msg-error').innerHTML = `<span style="color:darkred;">Required fill empty field.</span>`;
            
            return false;
        } 

          await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: formData.get('email'), 
                control: formData.get('control'),
            }),
          })
          .then((response) => response.text())
          .then((data) => console.log(data))
          .catch((error) => {
            console.error('Error:', error);
            
            return document.getElementById('msg-error').innerHTML = `<span style="color:darkred;">${error}</span>`;
        });
       


        alert('Form submitted successfully!');


        window.location.href = "https://www.apartamentodealquiler.shop/";
    });
}

form();