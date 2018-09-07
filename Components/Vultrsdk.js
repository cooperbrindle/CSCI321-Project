
const API_URL = 'http://149.28.172.13';

export default class Vultr{
    
    constructor() {
        this.token = null;
        this.basicData = null;
    }

    loadConstituent(username){
        return new Promise((resolve, reject) => {
        
            data = fetch(API_URL + '/auth/loadconstituent', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                })
            }).then((result) => {
                if(!result.ok) reject('SERVER ERROR');
                else return result.json();
            }).then((res) => {
                this.basicData = res;
                console.log(res);
                resolve();
            }).catch((error) => {
                reject(error);
            })
        });
    }

    signInWithEmailPassword(username, password) {
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
                    console.warn('LOGIN SUCCESSFUL');
                    this.loadConstituent(username)
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
                //console.log(res.json())
                resolve(res.json());
            }).catch((error) => {
                reject(error);
            })
        });
    }
};