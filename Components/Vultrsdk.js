
const API_URL = '';

export default class Vultr{
    
    constructor() {
        this.token = null;
        //other shit
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
        return new Promise((resolve, reject) => {
            
            data = fetch(API_URL + '/discounts', {
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