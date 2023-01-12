const axiosAPI = require('../axios/axios').axiosAPI

//INFO
//Nieużywany plik - przeniesiony do modułu rejestracji, do usunięcia potem

const registerForm = document.querySelector("#registerForm");
registerForm.addEventListener("submit", async e => {
    e.preventDefault();
    const fullName = registerForm.querySelector("#user-fullname").value;
    const login = registerForm.querySelector("#login").value;
    const email = registerForm.querySelector("#email").value;
    const password = registerForm.querySelector('#password').value;
    if (login && email && password) {
        await axiosAPI.post("/api/auth/register", {
            fullName: fullName,
            login: login,
            email: email,
            password: password
        }).then((response) => {

            console.log(response.data);
            alert('Zostałeś zarejestrowany ' + fullName + ' , możesz się zalogować ');
            window.location.replace('http://localhost:1234/html/login.html')  //TODO: przekierować na nową stronę główną z napisem wyloguj itd...

        }).catch(error => {
            console.error(error);
            alert('Błąd rejestracji')
        });
        registerForm.reset();
    }
    else
        console.log("Cos nie ok")
})