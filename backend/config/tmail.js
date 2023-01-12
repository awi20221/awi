const nodemailer = require('nodemailer')

/**
 * W nodemailer pole "secure: true" oznacza, że połączenie z serwerem pocztowym będzie zabezpieczone przy użyciu protokołu SSL/TLS.
 * W przypadku gdy pole jest ustawione na "true" połączenie przesyła dane zaszyfrowane, co zwiększa bezpieczeństwo przesyłanych danych.
 *
 * Natomiast pole "rejectUnauthorized: false" oznacza, że połączenie nie będzie sprawdzało ważności certyfikatów SSL/TLS serwera.
 * W przypadku gdy pole jest ustawione na "false" połączenie nie będzie odrzucało certyfikatów, które są niezaufane lub niepodpisane
 * przez zaufanego dostawcę certyfikatów. Jest to mniej bezpieczne, ponieważ umożliwia przechwytywanie danych przez nieautoryzowane podmioty,
 * dlatego też nie jest rekomendowane ustawianie tego pola na "false"
 */

const selfSignedConfig = {
    host: 't.pl',
    port: 465,
    secure: true,
    auth: {
        user: 'awi20221@t.pl',
        pass: 'kkw20221'        //TODO: czy da sie wykropkowac ?
    },
    tls: {
        rejectUnauthorized: false
    }
}

const tTransporter = nodemailer.createTransport(selfSignedConfig);

module.exports = {tTransporter}