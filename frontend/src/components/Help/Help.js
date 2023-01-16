import React from "react";
import axios from "axios"
import Nav from "../../mainComponents/Navigation";
import "./help.css";

class contactFormulae extends React.Component {
    constructor(props) {
        super(props);
        this.state = {valueName: '', valueEmail: '', valueText: ''};


        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeName(event) {
        this.setState({valueName: event.target.value});
    }

    handleChangeEmail(event) {
        this.setState({valueEmail: event.target.value});
    }

    handleChangeText(event) {
        this.setState({valueText: event.target.value});
    }

    handleSubmit(event) {
            axios.post("http://localhost:3001/api/mail/send-to-awi",{
                email: this.state.valueEmail,
                name: this.state.valueName,
                text: this.state.valueText
            })
                .then(()=> {
                    this.setState({valueName: '', valueEmail: '', valueText: ''})
                    alert("Dziękujemy za przesłanie formularza")
                    event.target.reset();
                })
                .catch(error => {
                    if(error.status === 401){
                        console.log(error);
                    }
                })
            event.preventDefault();
    }

    render() {
        return (
            <div className="container-formulae">
                <Nav />
                    <form id="form-help" onSubmit={this.handleSubmit}>
                        <div className="formulae-start">
                            <h2 className="YouHaveToNameIt">CONTACT US</h2>
                            <p id="p-formulae" type="Name:">
                                <input id="small-formulae-input" type="text" required placeholder="Podaj imię" value={this.state.valueName} onChange={this.handleChangeName} />
                            </p>
                            <p id="p-formulae" type="Email:">
                                <input id="small-formulae-input" type="text" required placeholder="Podaj e-mail" value={this.state.valueEmail} onChange={this.handleChangeEmail} />
                            </p>
                            <p id="p-formulae" type="Message:">
                                <input id="big-formulae-input" type="text" required placeholder="Miejsce na twoją wiadomość..." value={this.state.valueText} onChange={this.handleChangeText}/>
                            </p>
                            <button className="contact-formulae-button">Send Message</button>
                            <div className="div-company">
                                <span className="span-company-email"></span> Or send directly to: awi2022.1.0@gmail.com
                            </div>
                        </div>
                    </form>
            </div>
        );
    }
}

export default contactFormulae;