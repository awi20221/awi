//import axios from "../../src/axios/axios.js";
//const axios = require('axios'); 

let a = [], b = [], c = [], d = [];

var t0 = [], t1 = [];

var subjectObject = {

    "waluty": {
        "AUD": ["BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS"],
        "BRL": ["AUD", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS"],
        "BGN": ["AUD", "BRL", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS"],
        "CNY": ["AUD", "BRL", "BGN", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS"],
        "CZK": ["AUD", "BRL", "BGN", "CNY", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS"],
        "DKK": ["AUD", "BRL", "BGN", "CNY", "CZK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF",  "ILS"],
        "EUR": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS"],
        "PHP": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS"] ,
        "HKD": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "IDR": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "ISK": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "JPY": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "CAD": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "KRW": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "MYR": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "MXN": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "NOK": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "NZD": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "ZAR": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "RON": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "SGD": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "CHF": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "SEK": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "THB": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK","TRY", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "TRY": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "USD", "UAH", "GDP", "HUF", "ILS" ],
        "USD": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "UAH", "GDP", "HUF", "ILS" ],
        "GDP": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "HUF", "ILS" ],
        "UAH": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "GDP", "HUF", "ILS" ],
        "HUF": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "ILS"],
        "ILS": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF"],
        "KWD": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS", "RSD"],
        "RSD": ["AUD", "BRL", "BGN", "CNY", "CZK", "DKK", "EUR", "PHP", "HKD", "IDR", "ISK", "JPY", "CAD", "KRW", "MYR", "MXN", "NOK", "NZD", "ZAR", "RON", "SGD", "CHF", "SEK", "THB", "TRY", "USD", "UAH", "GDP", "HUF", "ILS", "KWD"]
    },
    "spółki WiG20": {
        "ALLEGRO": ["ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "ASSECOPOL": ["ALLEGRO", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "CCC": ["ALLEGRO", "ASSECOPOL", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "CDPROJEKT": ["ALLEGRO", "ASSECOPOL", "CCC", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "CYFRPLSAT": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "DINOPL": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "JSW": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "KETY": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "KGHM": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "KRUK": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "LPP": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "MBANK": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "ORANGEPL": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "PEKAO": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "PEPCO": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PGE", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "PGE": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PKNORLEN", "PKOBP", "PZU", "SANPL"],
        "PKNORLEN": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKOBP", "PZU", "SANPL"],
        "PKOBP": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PZU", "SANPL"],
        "PZU": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "SANPL"],
        "SANPL": ["ALLEGRO", "ASSECOPOL", "CCC", "CDPROJEKT", "CYFRPLSAT", "DINOPL", "JSW", "KETY", "KGHM", "KRUK", "LPP", "MBANK", "ORANGEPL", "PEKAO", "PEPCO", "PGE", "PKNORLEN", "PKOBP", "PZU"]
    }
}



//testy
var time2 = [ 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
var time3 = [ 11, 12, 13, 14, 15, 16, 11, 12, 13, 14, 15, 16, 11, 12, 13, 14, 15, 16, 11, 12, 13, 14, 15, 16, 11, 12, 13, 14, 15, 16];
var ddd = Math.floor((Math.random() * 500) + 50);
var eee = Math.floor((Math.random() * 500) + 50);
a.push(ddd); a.push(ddd+0.3); c.push(eee); c.push(eee+0.9);
t0.push(ddd); t1.push(eee);

window.onload = function() {
    var subjectSel = document.getElementById("typ");
    var topicSel = document.getElementById("in1");
    var chapterSel = document.getElementById("in2");
    for (var x in subjectObject) {
        subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }
    subjectSel.onchange = function() {
        //puste
        chapterSel.length = 1;
        topicSel.length = 1;
        //wyswietl odpowiednie opcje
        for (var y in subjectObject[this.value]) {
            topicSel.options[topicSel.options.length] = new Option(y, y);
        }
    }
    topicSel.onchange = function() {
        //puste
        chapterSel.length = 1;
        //wyswietl odpowiednie opcje
        var z = subjectObject[subjectSel.value][this.value];
        for (var i = 0; i < z.length; i++) {
            chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
        }
    }
    var temp1 = Math.floor((Math.random() * 2) + (-2));
    chapterSel.onchange = function() {

        //wczytać



        /*async function fetchCurrencies() {
        //console.log(lastDate);
           const xyz =  document.getElementById("in1").options[document.getElementById("in2").selectedIndex].text;
          let url = "http://localhost:3001/api/currencies/" +  ${xyz};
          a = await axios
          .get(url)
          .then((response) => {
            console.log(response.data.currencies);
            setCurrencies(response.data.currencies);        
          })
          xyz =  document.getElementById("in2").options[document.getElementById("in2").selectedIndex].text;
          url = "http://localhost:3001/api/currencies/" +  ${xyz};
          b = await axios
          .get(url)
          .then((response) => {
            console.log(response.data.currencies);
            setCurrencies(response.data.currencies);
            
          })
        }*/

        var risk, rev_r, factor, temp3;
        var temp = a[1]+((a[1]-a[0])/a[0]);
        b.push(temp);
        temp = (b[0]-a[1])/a[1];
        factor = Math.floor((Math.random() * 0.1) + (-0.01));
        temp = (temp+factor)+a[1];
        if(temp === 0) temp+=0.01
        b.push(temp);
        //console.log(b);
        for(var i = 2; i<30; i++)
        {
            temp = b[i-1]+(b[i-1] - b[i-2])/b[i-2];
            risk = (b[i-1]-b[i-2])/100;
            rev_r = risk * (-1)/10;
            factor = Math.floor((Math.random() * risk) +rev_r);
            temp3 = factor+temp;
            b.push(temp3);
            //console.log(b[i]);
        }
        for(var i = 1; i<31; i++)
        {
            temp = t0[i-1] + Math.floor((Math.random() * 1) + (-1));
            t0.push(temp);
           console.log(t0[i]);
            temp = t1[i-1] + Math.floor((Math.random() * 1) + (-1));
            t1.push(temp);
           console.log(t1[i]);
        }
        //var risk, rev_r, factor, temp3; 
        temp = c[1]+((c[1]-c[0])/c[0]);
        d.push(temp);
        temp = (d[0]-c[1])/c[1];
        factor = Math.floor((Math.random() * 0.1) + (-0.01));
        temp = (temp+factor)+c[1];
        if(temp === 0) temp+=0.01
        d.push(temp);
        //console.log(d);
        for(var i = 2; i<30; i++)
        {
            temp = d[i-1]+(d[i-1] - d[i-2])/d[i-2];
            risk = (d[i-1]-d[i-2])/100;
            rev_r = risk * (-1)/10;
            factor = Math.floor((Math.random() * risk) +rev_r);
            temp3 = (temp+factor)+temp;
            d.push(temp3);
            //console.log(d[i]);
        }


        d3.csv("https://raw.githubusercontent.com/awi20221/awi/main/daty.txt", function(err, rows)
        {
            function unpack(rows, key) {
                return rows.map(function(row) { return row[key]; });
            }

            WYK = document.getElementById('wykr');

            let selectedOption = document.getElementById("in1").options[document.getElementById("in1").selectedIndex];
            let selectedOption2 = document.getElementById("in2").options[document.getElementById("in2").selectedIndex];

            var w1 = {
                type: "scatter",
                mode: "lines",
                name: selectedOption.text,
                x: unpack(rows, 'Date'),
                y: t0,
                //line: {color: '#17BECF'}
            };

            var w2 = {
                type: "scatter",
                mode: "lines",
                name: selectedOption2.text,
                x: unpack(rows, 'Date'),
                y: t1 ,
                //line: {color: '#17BECF'}
            };

            var dane = [w1, w2];

            var lay = {
                title:'Wykresy walut',
                xaxis: {
                    autorange: true,
                    range: ['2022-11-17', '2023-02-18'],
                    rangeselector: {buttons: [
                            {
                                count: 1,
                                label: '1m',
                                step: 'month',
                                stepmode: 'backward'
                            },
                            {
                                count: 7,
                                label: '1w',
                                step: 'day',
                                stepmode: 'backward'
                            },
                            {step: 'all'}
                        ]},
                    //rangeslider: {range: ['2022-12-17', '2023-02-18']},
                    type: 'date'
                },
                yaxis: {
                    autorange: true,
                    //range: [86.8700008333, 138.870004167],
                    type: 'linear'
                }
            };

            Plotly.newPlot(WYK, dane, lay );
            console.log( Plotly.BUILD );
        })
    }
}

//var date = String(now.getFullYear() + '-' + (now.getMonth()) + '-' + now.getDate());


/*
Czas: <select name="t" id="t">
    <option value="1111" selected="selected">wybierz</option>
  </select>
  <br><br>
  
  
  if(document.getElementById("t").options[document.getElementById("t").selectedIndex].text == "30 dni")
    {      
      
     }
     if(document.getElementById("t").options[document.getElementById("t").selectedIndex].text == "tydzień")
    {        
      for(var i = 0; i < 7)
        {              
            //document.getElementById("in1").options[document.getElementById("in1").selectedIndex].text
              a[i] = api.get('/CAD/:CAD',catchAsync(currenciesController.findOne));
        }
     }
  
  */

