
const API_URL = '149.28.172.13';

export default class Vultr{
    
    constructor() {
        this.token = null;
        this.API_URL = '149.28.172.13';
    }

    signInWithEmailPassword(email, password) {
        return new Promise((resolve, reject) => {
            //do login shit here

            //if(worked)
                //resolve(token / Auth stuff)
            //else
                //reject(errorMessage)
        });
    }

    static getDiscounts(category) {
        console.log('INSIDE VULTR SDK DISCOUNTS');
        return new Promise((resolve, reject) => {
            
            data = fetch('http://149.28.172.13/discounts', {
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