import React from "react";
import "./accountOptions.css"
import axios from "../../axios/axios";
import Nav from "../../mainComponents/Navigation";
import jwtDecode from "jwt-decode"
import  userIcon from "../css/images/user_icon.png";

let login=localStorage.getItem("userLogin");


//zwraca tablice , gdzie 1 el to true lub false w zależności od tego czy token jest dalej aktywny, 2 el to id uzytkownika
function decodeTokenAndCheckValidity(accessToken) {
    const decoded = jwtDecode(accessToken);
    const expirationTime = decoded.exp;
    const userID = decoded.id;
    const now = new Date().getTime() / 1000;
    if (expirationTime < now){
        localStorage.clear()
        return [false, 0];
    } else {
        return [true, userID];
    }
}


// function getUserName(accessToken) {
//     const decoded = jwtDecode(accessToken);
//     const userID = decoded.id;
//     axios.get('http://localhost:3001/api/users/id/' + userID)
//         .then(response => {
//             return response.data.user.fullName;
//         })
// }

class AccountOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {newEmail: '', newPassword: '', buttonEmailClicked: false, buttonPasswordClicked: false,
                    buttonDeleteUserClicked: false, showSuccessMessage: false, showFailMessage: false, showUnauthorizedMessage: false}

        this.handleChangeNewEmail = this.handleChangeNewEmail.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleSubmitNewEmail = this.handleSubmitNewEmail.bind(this)
        this.handleSubmitNewPassword = this.handleSubmitNewPassword.bind(this)
        this.handleSubmitDeleteUser = this.handleSubmitDeleteUser.bind(this)
    }

    componentDidMount(){
        login=localStorage.getItem("userLogin");
    };


    setBeginningErrorsState() {
        this.setState({showUnauthorizedMessage: false});
        this.setState({showFailMessage: false});
        this.setState({showSuccessMessage: false})
    }

    setBeginningValuesState() {
       this.setState({newEmail : ''});
       this.setState({newPassword : ''})
    }


    handleChangeNewEmail(event) {
        this.setState({newEmail: event.target.value});
    }

    handleChangeNewPassword(event) {
        this.setState({newPassword: event.target.value});
    }

    handleSubmitNewEmail(event) {
        event.preventDefault() //blocks your web http request
        this.setBeginningErrorsState() //zeruje kody błędów
        const [isAvailable, userID] = decodeTokenAndCheckValidity(localStorage.getItem("accessToken"))
        if(isAvailable) {
            const accessToken = localStorage.getItem("accessToken");
            axios.get('http://localhost:3001/api/users/id/' + userID)
                .then( (response) => {
                    axios.put('http://localhost:3001/api/users/update/' + response.data.user.slug, {
                        email: this.state.newEmail,
                        Authorization: 'Bearer ' + accessToken
                    })
                        .then((res,error) => {
                            if(!error) {
                                this.setState({showSuccessMessage: true})
                                this.setBeginningValuesState()
                            }
                        })
                        .catch(error => {
                            if (error.response && error.response.status === 401) {
                                this.setState({showUnauthorizedMessage : true})
                                return;
                            } else {
                                this.setState({showFailMessage: true})
                                return;
                            }
                        })
                })
                .catch(error => {
                    this.setState({showFailMessage: true})
                    return;
                })
        } else {
            this.setState({showUnauthorizedMessage: true})
        }
    }

    handleSubmitNewPassword(event) {
        return this.setState({showFailMessage: true})
        //TODO: obsłużyc po stronie serwera
    }

    handleSubmitDeleteUser(event) {

        
        event.preventDefault() //blocks your web http request
        this.setBeginningErrorsState() //zeruje kody błędów
        const [isAvailable, userID] = decodeTokenAndCheckValidity(localStorage.getItem("accessToken"))
        if(isAvailable) {
            const accessToken = localStorage.getItem("accessToken");
            axios.get('http://localhost:3001/api/users/id/' + userID)
                .then( (response) => {
                    axios.delete('http://localhost:3001/api/users/' + response.data.user.slug, {
                        Authorization: 'Bearer ' + accessToken
                    })
                        .then((res,error) => {
                            if(!error) {
                                this.setState({showSuccessMessage: true})
                                this.localStorage.clear();
                                return
                            }
                        })
                        .catch(error => {
                            if (error.response && error.response.status === 401) {
                                this.setState({showUnauthorizedMessage : true})
                                return;
                            } else {
                                this.setState({showFailMessage: true})
                                return;
                            }
                        })
                })
                .catch(error => {
                    this.setState({showFailMessage: true})
                    return;
                })
        } else {
            this.setState({showUnauthorizedMessage: true})
        }
        //this.handleLogout();
    }

    /*handleLogout = () => {
        localStorage.removeItem("accessToken");
        localStorage.clear()
        this.props.history.push('/');
    }*/
  


    render () {
        return (
            <>
            <Nav/>
            <div className="account-options">
                
                <div className="result">
                    {this.state.showFailMessage &&
                        <section className="change-fail">
                            <button className="change-fail-text">Zmiana nie została zapisana</button>
                        </section>
                    }
                    {this.state.showUnauthorizedMessage &&
                        <section className="change-unauthorized">
                            <button className="change-unauthorized-text">Konieczne ponowne logowanie</button>
                        </section>
                    }
                    {this.state.showSuccessMessage &&
                        <section className="change-success">
                            <button className="change-success-text">Zmiana została zapisana pomyślnie</button>
                        </section>
                    }
                </div>
                <div className="user-logo-header">
                    <img src={userIcon} className="user-icon" id="user-icon" alt="User icon" />
                    <h1 id="user-note">Your personal account</h1>
                    <h3 id="user-name">User: "{login}"</h3>
                </div>
                <div className="change-email-header">
                    <h1 id="change-email">Zmień adres e-mail</h1>
                </div>
                <br/>
                <form>
                    <input required placeholder="Wpisz nowy e-mail" id="input-change-email" value={this.state.newEmail} onChange={this.handleChangeNewEmail}></input>
                    <button id="button-change-email" onClick={this.handleSubmitNewEmail}>Zmień e-mail</button>
                </form>
                <div className="change-password-header">
                    <h1 id="change-password">Zmień hasło</h1>
                </div>
                <br/>
                <form>
                    <input required placeholder="Wpisz nowe hasło" id="input-change-password" value={this.state.newPassword} onChange={this.handleChangeNewPassword}
                    autoComplete="off"></input>
                    <button id="button-change-password" onClick={this.handleSubmitNewPassword}>Zmień hasło</button>
                </form>
                <div className="delete-user-header">
                    <h1 id="delete-user-text">Usuń konto</h1>
                </div>
                <br/>
                <form>
                        <button id="button-delete-user" onClick={
                          this.handleSubmitDeleteUser}>Usuń konto</button>
                </form>
            </div>
            </>
        );
    }
}
export default AccountOptions;

