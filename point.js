const cron = require('node-cron');

module.exports = new class UserRepository {
    
    scheduleDay(user) {
        console.log("Criando agendamento para o usuario com login:" +user.login);
        
        cron.schedule(user.init_day_hour, function() {
            makeAuthRequest();
        }, {
            scheduled:true,
            timezone: "America/Sao_Paulo"
        });
    
        cron.schedule(user.lunch_day_hour, function() {
            makeAuthRequest();
        }, {
            scheduled:true,
            timezone: "America/Sao_Paulo"
        });
    
        cron.schedule(user.first_return_day_hour, function() {
            makeAuthRequest();
        }, {
            scheduled:true,
            timezone: "America/Sao_Paulo"
        });
    
        cron.schedule(user.end_day_hour, function() {
            makeAuthRequest();
        }, {
            scheduled:true,
            timezone: "America/Sao_Paulo"
        });
    }

    
    makeAuthRequest(user) {

        params = {
            'login': user.login,
            'password': user.password
          }
    
        let res = axios.post('https://api.pontomais.com.br/api/auth/sign_in', params)
        .then(function (res) {
            console.log(res);
            
            var auth_token = res.data.token;
            var client = res.data.client_id;
    
            makePointRequest(User, auth_token, client);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    makePointRequest(user, auth_token, client) {
        const config = {
            method: 'post',
            url: 'https://api.pontomais.com.br/api/time_cards/register',
            headers: { 
                'Content-Type': 'application/json',
                'access-token': auth_token,
                'token-type': 'Bearer',
                'uid': user.uid,
                'client': client,
                'Host': 'api.pontomais.com.br',
                'Origin': 'https://app.pontomaisweb.com.br',
                'Referer': 'https://app.pontomaisweb.com.br/',
                'Api-Version': '2',
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.131 Safari/537.36; itx)',
                'uuid': user.uuid
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
}