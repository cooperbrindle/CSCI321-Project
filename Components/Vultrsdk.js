
export default class VultrloginWithEmailPassword{
    
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
};