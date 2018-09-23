
const API_URL = 'http://149.28.172.13';

export default class Vultr{
    
    constructor() {
        this.token = null;
        this.data = null;
        this.username = '';
    }

    loadConstituent(){
        return new Promise((resolve, reject) => {
        
            data = fetch(API_URL + '/user/loadconstituent', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username
                })

            }).then((result) => {
                if(!result.ok) reject('SERVER ERROR');
                else return result.json();
            
            }).then((res) => {
                this.data = res[0];
                console.log(res[0]);
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }

    signInWithEmailPassword(username, password) {
        this.username = username;
        return new Promise((resolve, reject) => {
        
            data = fetch(API_URL + '/auth/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            
            }).then((result) => {
                if(!result.ok) reject('SERVER ERROR');
                else return result.json();
            
            }).then((res) => {
                if(res.error && res.error != '')
                reject(res.error);
                else{
                    //LOGIN WORKED
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
            
            d = fetch(API_URL + '/user/updatedetails', {
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
    
    updatePassword(newPassword) {
        return new Promise((resolve, reject) => {
            
            d = fetch(API_URL + '/auth/updatepassword', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newPassword: newPassword,
                    id: this.data.id,
                })
            }).then((res) => {
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }

    submitSignUp(data) {
        return new Promise((resolve, reject) => {
            
            d = fetch(API_URL + '/auth/signUp', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: data
                })
            }).then((result) => {
                if(!result.ok) reject('SERVER ERROR');
                else return result.json();
            }).then((res) => {
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
            
            d = fetch(API_URL + '/auth/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    id: id,
                })
            }).then((result) => {
                if(!result.ok) reject('SERVER ERROR');
                else return result.json();
            }).then((res) => {
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

    static getDiscounts(category) {
        return new Promise((resolve, reject) => {
            
            data = fetch(API_URL + '/promotions/discounts', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category
                })
            }).then((res) => {
                resolve(res.json());
            }).catch((error) => {
                reject(error);
            })
        });
    }


    static getEvents(category) {
        return new Promise((resolve, reject) => {
            
            data = fetch(API_URL + '/events/eventslist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    category: category
                })
            }).then((res) => {
                resolve(res.json());
            }).catch((error) => {
                reject(error);
            })
        });
    }
};

