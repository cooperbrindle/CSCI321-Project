
const API_URL = 'http://149.28.172.13';

export default class Vultr{
    
    constructor() {
        this.token = null;
        this.data = null;
    }

    loadConstituent(username){
        id = '';
        if(!username){
            console.warn("seting ID");
            id = this.data.id;
            username = '';
        }

        return new Promise((resolve, reject) => {
        
            data = fetch(API_URL + '/user/loadconstituent', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    id: id
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
                resolve('success');
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
                //console.log(res.json())
                resolve(res.json());
            }).catch((error) => {
                reject(error);
            })
        });
    }
/*
    translateFromRE(result){
        this.data = {
            id: result.CnBio_ID,
            stdNum: result.CnBio_ID2,
            title: result.CnBio_Title,
            firstName: result.CnBio_First_Name,
            lastName: result.CnBio_Surname,
            birthDate: result.CnBio_Birth_date,
            maidenName: result.CnBio_Maiden_name,
            address: result.CnAdrPrf_Address,
            suburb: result.CnAdrPrf_Suburb,
            state: result.CnAdrPrf_State,
            country: result.CnAdrPrf_CountryLongDescription,
            postcode: result.CnAdrPrf_Postcode,
            email: result.CnPh_1_01_Phone_number,
            emailOther: result.CnPh_1_02_Phone_number,
            mobile: result.CnPh_1_04_Phone_number
        };
    }
    translateToRE(result){
        this.data = {
            CnBio_ID: result.id,
            CnBio_ID2: result.stdNum,
            CnBio_Title: result.title,
            CnBio_First_Name: result.firstName,
            CnBio_Surname: result.lastName,
            CnBio_Birth_date: result.birthDate,
            CnBio_Maiden_name: result.maidenName,
            CnAdrPrf_Address: result.address,
            CnAdrPrf_Suburb: result.suburb,
            CnAdrPrf_State: result.state,
            CnAdrPrf_CountryLongDescription: result.country,
            CnAdrPrf_Postcode: result.postcode,
            CnPh_1_01_Phone_number: result.email,
            CnPh_1_02_Phone_number: result.emailOther,
            CnPh_1_04_Phone_number: result.mobile
        };
    }
    */
};