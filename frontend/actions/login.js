const axiosAPI = require('../axios/axios').axiosAPI

//INFO
//Nieużywany plik - przeniesiony do modułu logowania, do usunięcia potem

const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", async e => {
    e.preventDefault();

    const login = loginForm.querySelector("#login").value;
    const password = loginForm.querySelector("#haslo").value;

    if (login && password) {
        await axiosAPI.post("/api/auth/login", {
            login: login,
            password: password
        }).then((response) => {
            const token = response.data.accessToken;
            localStorage.setItem('accessToken', token);
            alert('Zostałeś zalogownay');
            window.location.replace('http://localhost:1234/index.html')  //TODO: przekierować na nową stronę główną z napisem wyloguj itd...

        }).catch(error => {
            console.error(error);
            alert('Błąd logowania, spróbuj ponownie')
        });
        loginForm.reset();
    }
})
