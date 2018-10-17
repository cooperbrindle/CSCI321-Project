/////////////////////////////////////////
// APP BACKEND SDK
//
//  all methods not commented are self explanatory api calls
//  all api calls use one of two methods [makerequest, makeauthrequest]
//    which handle all errors and data transformation
////////////////////////////////////////

import { AsyncStorage } from 'react-native';
import { appConfig } from './config';


const API_URL = appConfig.APIURL;

export default class Vultr{
    
    constructor() {
        this.token = null;
        this.data = null;
        this.username = '';
    }

    //Load token and username from device local storage
    loadData(token, username){
        this.token = token;
        this.username = username;
    }

    //Check if user is logged in by presence of token
    //  used for auto login feature
    isLoggedIn(){
        if(this.token == null) return false
        else return true;
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  BACKEND API CALLS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////



    loadConstituent(password){
        if(!password || password == null) password = null;
        return new Promise((resolve, reject) => {
            this.makeAuthRequest('/user/loadconstituent', 'POST', {username: this.username, password: password}
            ).then((res) => {
                this.data = res[0];
                //console.log(res[0]);
                try{ //Store username in device local storage
                    AsyncStorage.setItem('username', this.username);
                }catch(err){}
                resolve();
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
                this.saveToken(res.token);//save token to device local storage
                this.loadConstituent()  //load user constituent data
                .then(() => {resolve();
                }).catch((err) => { reject(err);})
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
        //update details if differen email supplied
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
            ).then(() => {resolve();
            }).catch((error) => {reject(error); })
        });
    }

    submitSignUp(data) {
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/signUp', 'POST',
                {data: data}
            ).then((res) => {resolve(res.data);
            }).catch((error) => { reject(error);})
        });
    }   

    registerUser(username, password, id){
        return new Promise((resolve, reject) => {
            this.makeRequest('/auth/register', 'POST',
                {
                    id: id,
                    username: username,
                    passHash: password,
                }
            ).then((res) => { //constinue to sign in
                this.signInWithEmailPassword(username, password)
                .then(() => {resolve();})
            }).catch((error) => {reject(error);})
        });
    }

    registerConst(eventData, constInfo){
        return new Promise((resolve, reject) => {
            //update details if different employer details filled out
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
            ).then((res) => { resolve();
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
            ).then((res) => {resolve();
            }).catch((error) => {reject(error);})
        });
    }

    geocodeAddress(eventData){
        return new Promise((resolve, reject) => {
            if(eventData.address == "" || eventData.address == '' || eventData.address == null){
                resolve({latitude: 0, longitude: 0});
                return;
            }
            this.makeAuthRequest('/events/geocodeaddress', 'POST',
                {data: eventData,}
            ).then((res) => {resolve(res);
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
            ).then((res) => {resolve();
            }).catch((error) => {reject(error);})
        });
    }


    //Make authenticated request to API
    // passes token in authorization header
    //  handles response errors, status codes and async JSON transforms
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
                //CHECK RESPONSE STATUS CODE
                if(!result.ok) reject('SERVER REQUEST ERROR');
                else return(result.json());
            }).then((res) => {
                //CHECK IF ERROR SENT BACK FROM SERVER
                if(res.error && res.error != ''){ //used for local javascript library/app errors
                    if(typeof res.error !== 'string') //converts error object to string 
                        res.error = res.error.message; //to fit how server responds with errorss
                    reject(res.error);
                }else resolve(res);
            }).catch((error) => { //CATCH local javascript library/app errors
                if(error != ''){
                    if(typeof error !== 'string')
                        error = error.message;
                }
                reject(error);
            })
        });
    }


    //Make unauthenticated request to API
    //  handles response errors, status codes and async JSON transforms
    //  SAME AS MAKEAUTHREQUEST BUT WITHOUT AUTH HEADER
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
                else return(result.json());
            }).then((res) => {
                if(res.error && res.error != ''){
                    if(typeof res.error !== 'string')
                        res.error = res.error.message;
                    reject(res.error);
                }else resolve(res);
            }).catch((error) => {
                if(error != ''){
                    if(typeof error !== 'string')
                        error = error.message;
                }
                reject(error);
            })
        });
    }

    //Saves auth JWT to device local storage
    saveToken(token){
        this.token = token;
        try{
            AsyncStorage.setItem('token', token);
        }catch(err){console.log('ERROR SAVING TOKEN: ' + err)}
    }

    //Removes auth JWT from device local storage - disables autologin
    logout(){
        this.token = null;
        try{
            AsyncStorage.removeItem('token');
        }catch(err){console.log('ERROR REMOVING TOKEN: ' + err)}
    }
};

