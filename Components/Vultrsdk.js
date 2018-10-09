import { AsyncStorage } from 'react-native';

const API_URL = 'http://149.28.172.13';

export default class Vultr{
    
    constructor() {
        this.token = null;
        this.data = null;
        this.username = '';

        try{ this.token = AsyncStorage.getItem('token');}
        catch(err){console.log(err); this.token = null};

    }

    loadConstituent(){
        console.log('loading constit');
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/user/loadconstituent', 'POST', {username: this.username}
            ).then((res) => {
                this.data = res[0];
                console.log(res[0]);
                resolve();
            }).catch((error) => {
                console.log('top err" ' + error);
                reject(error);
            })
        });
    }

    signInWithEmailPassword(username, password) {
        this.username = username;
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/login', 'POST', {
                    username: username,
                    password: password
                }
            ).then((res) => {
                console.log(res.token);
                if(res.error) console.log('kk');
                if(res.error && res.error != '')
                    reject(res.error);
                else{
                    this.saveToken(res.token);
                    this.loadConstituent()
                    .then(() => {
                        resolve();
                    }).catch((err) => {
                        reject(err);
                    })
                }
            
            }).catch((error) => {
                reject(error);
            })
        });
        
    }


    updateDetails(data) {
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/user/updatedetails', 'POST',
                {data: data}
            ).then((res) => {
                this.data = data;
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }

    libraryReq(data) {
        return new Promise((resolve, reject) => {
            
            d = fetch(API_URL + '/user/libraryreq', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: data
                })
            }).then((res) => {
                this.data = data;
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }
    
    updatePassword(newPassword, oldPassword) {
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/auth/updatepassword', 'POST',
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    id: this.data.id,
                }
            ).then((res) => {
                if(res.error && res.error != '')
                    reject(res.error);
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }

    submitSignUp(data) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/signUp', 'POST',
                {data: data}
            ).then((res) => {
                if(res.error && res.error != '')
                    reject(res.error);
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            })
        });
    }   

    registerUser(email, password, id){
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/register', 'POST',
                {
                    email: email,
                    password: password,
                    id: id,
                }
            ).then((res) => {
                if(res.error && res.error != '')
                    reject(res.error);
                this.signInWithEmailPassword(email, password)
                .then(() => {
                    resolve();
                })
            }).catch((error) => {
                reject(error);
            })
        });
    }

    getDiscounts(category) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/promotions/discounts', 'POST',
                { category: category }
            ).then((res) => {
                resolve(res);
            }).catch((error) => {
                reject(error);
            })
        });
    }


    getEvents(category) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/events/eventslist', 'POST',
                { category: category}
            ).then((res) => {
                resolve(res);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    makeAuthRequest(url, method, body){
        return new Promise((resolve, reject) => {
            data = fetch(API_URL + url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.token
                },
                body: JSON.stringify(body)
            }).then((result) => {
                if(!result.ok) reject('SERVER ERROR');
                else return(result.json());
            }).then((result) => {
                //console.log('ERROR: ' + result.error);
                if(result.error && result.error == 'TokenExpiredError'){
                    console.log('EXPIRED!');
                    this.logout();
                    reject(result.error)
                }else resolve(result);
            }).catch((error) => {
                reject(error);
            })
        });
    }

    makeRequest(url, method, body){
        return new Promise((resolve, reject) => {
            data = fetch(API_URL + url, {
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            }).then((result) => {
                if(!result.ok){reject('SERVER ERROR');}
                else resolve(result.json());
            }).catch((error) => {
                reject(error);
            })
        });
    }

    saveToken(token){
        this.token = token;
        try{
            AsyncStorage.setItem('token', token);
        }catch(err){console.log('ERROR SAVING TOKEN: ' + err)}
    }

    logout(){
        this.token = null;
        try{
            AsyncStorage.removeItem('token');
        }catch(err){console.log('ERROR REMOVING TOKEN: ' + err)}
    }
};

