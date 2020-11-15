const cron = require('node-cron');
const express = require('express');
const axios = require('axios');
const dotEnv= require('dotenv');

dotEnv.config();

app = express();
app.listen(process.env.PORT);

const login = process.env.LOGIN;
const password = process.env.PASSWORD;
const uid = process.env.MY_UID;
const uuid = process.env.MY_UUID;

var auth_token = null;
var client = null;

function makeAuthRequest() {

    params = {
        'login': login,
        'password': password
      }

    let res = axios.post('https://api.pontomais.com.br/api/auth/sign_in', params)
    .then(function (res) {
        console.log(res);
        
        auth_token = res.data.token;
        client = res.data.client_id;

        makePointRequest();
    })
    .catch(function (error) {
        console.log(error);
    });
}

function makePointRequest() {
    const config = {
        method: 'post',
        url: 'https://api.pontomais.com.br/api/time_cards/register',
        headers: { 
            'Content-Type': 'application/json',
            'access-token': auth_token,
            'token-type': 'Bearer',
            'uid': uid,
            'client': client,
            'Host': 'api.pontomais.com.br',
            'Origin': 'https://app.pontomaisweb.com.br',
            'Referer': 'https://app.pontomaisweb.com.br/',
            'Api-Version': '2',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36; itx)',
            'uuid': uuid
        },
        data: {
            "time_card": {
                "latitude": 37.4215524,
                "longitude": -122.0950951,
                "address": "2250 Charleston Rd, Mountain View, CA 94043, EUA",
                "reference_id": null,
                "original_latitude": 37.4215524,
                "original_longitude": -122.0950951,
                "original_address": "2250 Charleston Rd, Mountain View, CA 94043, EUA",
                "location_edited": false
            },
            "_path": "/meu_ponto/registro_de_ponto",
            "_device": {
                "browser": {
                    "name": "Chrome",
                    "version": "74.0.3729.131",
                    "versionSearchString": "Chrome"
                }
            },
            "_appVersion": "0.10.32"
          }
        }

    let res = axios(config)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

function scheduleDay() {
    
    cron.schedule(process.env.INIT_DAY_HOUR, function() {
        makeAuthRequest();
    });
    
    cron.schedule(process.env.LUNCH_DAY_HOUR, function() {
        makeAuthRequest();
    });

    cron.schedule(process.env.FIRST_RETURN_DAY_HOUR, function() {
        makeAuthRequest();
    });
    
    cron.schedule(process.env.END_DAY_HOUR, function() {
        makeAuthRequest();
    });
}

scheduleDay();
