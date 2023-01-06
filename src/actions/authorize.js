// const axiosAPI = require('../config/axios').axiosAPI
const axios = require("axios");

// axios({
//     method: 'get',
//     url: 'http://localhost:3000/api/users/kacper',
//     responseType: 'json'
// })
//     .then(function (response) {
//         console.log(response);
//     });
//

// const loginForm = document.querySelector("#loginForm");
// loginForm.addEventListener("submit", async e => {
//     e.preventDefault();
//
//     const login = loginForm.querySelector("#login").value;
//     const password = loginForm.querySelector("#haslo").value;
//
//     if (login && password) {
//         await axiosAPI.get("/api/users", {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             login: login,
//             password: password
//         }).then((response) => {
//             const token = response.data.accessToken;
//
//             //TODO: zapisać do ciasteczka do localstorage token
//             //TODO: przekierować na nową stronę główną z napisem wyloguj itd...
//             console.log(token);
//         }).catch(error => {
//             console.error(error);
//         });
//
//         loginForm.reset();
//
//
//     }
// })




// const registerForm = document.querySelector("#signupForm");
// registerForm.addEventListener("submit", async e => {
//     e.preventDefault();
//
//     const login = registerForm.querySelector("#login").value;
//     const email = registerForm.querySelector("#email").value;
//     const password = registerForm.querySelector('#password').value;
//     if (login && email && password) {
//         await auth.register({login,email,password});
//         registerForm.reset();
//     }
//     else
//         console.log("Cos nie ok")
// })


