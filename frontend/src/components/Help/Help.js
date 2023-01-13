import React from "react";
import Footer from "../../mainComponents/Footer";
import Nav from "../../mainComponents/Navigation";
import "./help.css";

class contactFormulae extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        alert('Dziękujemy za przesłanie formularza');
        event.preventDefault();
    }

    render() {
        return (
            <div className="container-formulae">
                <Nav />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row">
                            <label>
                                Adres e-mail <input type="text" value={this.state.value} onChange={this.handleChange} />
                            </label>
                        </div>
                        <div className="form-row">
                            <label>
                                Napisz wiadomość <input type="text" value={this.state.value} onChange={this.handleChange}/>
                            </label>
                        </div>
                            <input type="submit" value="Wyślij" />
                    </form>
                <Footer />
            </div>
        );
    }
}

export default contactFormulae;