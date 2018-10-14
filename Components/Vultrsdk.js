
const API_URL = 'http://149.28.172.13';
import { AsyncStorage } from 'react-native';

export default class Vultr{
    
    constructor() {
        this.token = null;
        this.data = null;
        this.username = '';
    }

    loadData(token, username){
        this.token = token;
        this.username = username;
    }

    isLoggedIn(){
        if(this.token == null) return false
        else return true;
    }

    loadConstituent(password){
        if(!password || password == null) password = null;
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/user/loadconstituent', 'POST', {username: this.username, password: password}
            ).then((res) => {
                if(res.error == 'Incorrect password'){reject(res.error)}
                else{
                    this.data = res[0];
                    console.log(res[0]);
                    try{
                        AsyncStorage.setItem('username', this.username);
                    }catch(err){console.log('ERROR SAVING USERNAME: ' + err)}
                    resolve();
                }
            }).catch((error) => { reject(error);})
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
                if(res.error && res.error != '')
                    reject(res.error);
                else{
                    this.saveToken(res.token);
                    this.loadConstituent()
                    .then(() => {resolve();
                    }).catch((err) => { reject(err);})
                }
            }).catch((error) => {reject(error);})
        });
        
    }


    updateDetails(data) {
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/user/updatedetails', 'POST',
                {data: data}
            ).then((res) => {
                this.data = data;
                resolve();
            }).catch((error) => {reject(error);})
        });
    }

    libraryReq(email) {
        console.log(this.data.id);
        if(email != this.data.email){
            this.data.email = email;
            this.updateDetails(this.data);
        }
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/user/libraryReq', 'POST',
                {
                    id: this.data.id,
                    stdNum: this.data.stdNum,
                    email: this.data.email,
                }
            ).then(() => {resolve();
            }).catch((error) => {reject(error); })
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
                if(res.error && res.error != '') reject(res.error);
                resolve();
            }).catch((error) => {reject(error); })
        });
    }

    submitSignUp(data) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/signUp', 'POST',
                {data: data}
            ).then((res) => {
                if(res.error && res.error != '') reject(res.error);
                resolve(res.data);
            }).catch((error) => { reject(error);})
        });
    }   

    registerUser(email, password, id){
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/register', 'POST',
                {
                    id: id,
                    username: email,
                    passHash: password,
                }
            ).then((res) => {
                if(res.error && res.error != '') reject(res.error);
                this.signInWithEmailPassword(email, password)
                .then(() => {resolve();})
            }).catch((error) => {reject(error);})
        });
    }

    registerConst(eventData, constInfo){
        return new Promise((resolve, reject) => {
            if(constInfo.position != this.data.position || constInfo.orgName != this.data.orgName){
                this.data.position = constInfo.position;
                this.data.orgName = constInfo.orgName;
                this.updateDetails(this.data);
            }
            this.makeAuthRequest('/events/registerconst', 'POST',
                {
                    eventname: eventData.eventname,
                    id: this.data.id,
                    stdNum: this.data.stdNum,
                    title: this.data.title,
                    firstName: this.data.firstName,
                    lastName: this.data.lastName,
                    orgName: this.data.orgName,
                    position: this.data.position,
                    dietary: constInfo.dietary,
                    mobility: constInfo.wheelchair,
                }
            ).then((res) => {
                if(res.error && res.error != '') reject(res.error);
                resolve();
            }).catch((error) => {reject(error);})
        });
    }
    registerGuest(eventData, guestData){
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/events/registerguest', 'POST',
                {
                    eventname: eventData.eventname,
                    id: this.data.id,
                    title: guestData.title,
                    firstName: guestData.firstName,
                    lastName: guestData.lastName,
                    orgName: guestData.orgName,
                    position: guestData.position,
                    dietary: guestData.dietary,
                    mobility: guestData.wheelchair,
                }
            ).then((res) => {
                if(res.error && res.error != '') reject(res.error);
                resolve();
            }).catch((error) => {reject(error);})
        });
    }

    geocodeAddress(eventData){
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/events/geocodeaddress', 'POST',
                {data: eventData,}
            ).then((res) => {
                if(res.error && res.error != '') reject(res.error);
                resolve(res);
            }).catch((error) => {reject(error);})
        });
    }

    getDiscounts(category) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/promotions/discounts', 'POST',
                { category: category }
            ).then((res) => { resolve(res);
            }).catch((error) => {reject(error);})
        });
    }


    getEvents(category) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/events/eventslist', 'POST',
                { category: category}
            ).then((res) => {resolve(res);
            }).catch((error) => {reject(error);})
        });
    }

    getHighlights() {
        return new Promise((resolve, reject) => {
            this.makeRequest('/promotions/highlights', 'POST', {})
            .then((res) => {resolve(res);
            }).catch((error) => {reject(error);})
        });
    }

    resetPassword(email, fn, ln) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/resetpassword', 'POST',
                { 
                    email: email,
                    firstName: fn, 
                    lastName: ln,
                }
            ).then((res) => {
                if(res.error && res.error != '') reject(res.error);
                resolve();
            }).catch((error) => {reject(error);})
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

