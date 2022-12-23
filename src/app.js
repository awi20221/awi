async function enableServer() {
    await require('./index');

    //when the server is running

    const auth = require('../src/controllers/authController')


    const logger = document.querySelector('.login-route-button');
    logger.addEventListener("submit", async e => {
        console.log("click");
        // auth.show();
    })

    const form = document.querySelector("#loginForm");
    form.addEventListener("submit", async e => {
        e.preventDefault();

        const login = form.querySelector("#login").value;
        const haslo = form.querySelector("#haslo").value;

        if (login && haslo) {
            // const accesToken = await login({})
            form.reset();
        }
    })
}
