import { Account, Client, Storage ,Databases} from 'appwrite';


export const aClient = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66aa36e50003c1aec366');



export const storage = new Storage(aClient);
export const account = new Account(aClient)
export const db = new Databases(aClient);




export const login = async (email, password) => {

    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;

    }
    catch (e) {
        console.log(e)
        return e;

    }

}
export const current = async () => {

    try {

        return await account.get()
        //The code in those lines will be executed if the user is logged in so you can redirect here, trigger a function, set a variable, etc.
    } catch (error) {
        return error;
        //Here you redirect to login or something else if user since the error will mean that there is not any active session
    }

}

export const logout = async () => {

    await account.deleteSession('current')




}