import React, { createContext,Component } from "react";
import axios from 'axios';
import customConfig from '../customConfig.json'
export const UserContext = createContext();


// Define the base URL
const Axios = axios.create({    
    baseURL: customConfig.connect.connectApi,
});

let axiosConfig = {
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
};


class UserContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
    }

    // Root State
    state = {
        showLogin:true,
        isAuth:false,
        isAdmin:false,
        theUser:null,
        theStaty:null,
    }

    
    
    
    
    // On Click the Log out button
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('tokenTime');
        this.setState({
            ...this.state,
            isAuth:false,
            isAdmin:false
        })

        window.location.reload();


    }
    

    getMenuItems = async () => {     

        const loginToken = localStorage.getItem('loginToken');
        if(loginToken){
            if(this.isAuth===false){            
                this.isLoggedIn();
            }
            Axios.defaults.headers.common['Authorization'] = 'Bearer '+loginToken;
            const data = await Axios.get('usermenu.php');
            this.refreshLogin();
            if(data.data.success && data.data.menuItems){                
                return data.data.menuItems;
            }
            else if (data.data.success === 0)
            {         
                this.isLoggedIn();
            }
        }
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');



        // If inside the local-storage has the JWT token
        if(loginToken){

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = 'Bearer '+loginToken;


            const response1 = await Axios.get('user-info.php',{},{axiosConfig});
            const response2 = await Axios.get('user-type.php',{},{axiosConfig});

            const data = await response1.data;
            const data2 = await response2.data;

            // Fetching the user information
            //const {data} = await Axios.get('user-info.php');
            //const data2 = await Axios.get('user-type.php');

            if(data !==undefined && data2 !==undefined)
            {

                // If user information is successfully received            
                if(data.success === 1 && data.user && data2.UserType[0].UserType === '1'){
                    this.setState({
                        ...this.state,
                        isAuth:true,
                        isAdmin:true,
                        theUser:data.user
                    });
                    
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                }            
                else if(data.success === 1 && data.user){
                    this.setState({
                        ...this.state,
                        isAuth:true,
                        isAdmin:false,
                        theUser:data.user
                    });

                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                }
                else
                {
                    localStorage.removeItem('loginToken');
                    localStorage.removeItem('currentUser');
                    this.setState({
                        ...this.state,
                        isAuth:false,
                        isAdmin:false
                    })
                    window.location.reload();
                }
            }
        }
    }

    loginUser = async (user) => {

        // Sending the user Login request
        let response = await Axios.post('login.php',{
            email:user.email,
            password:user.password
        },axiosConfig);


        let users = (await response).data;
        
        return users;
        
    }

    refreshLogin = async () => {


        const loginToken = localStorage.getItem('loginToken');
        const tokenTime = localStorage.getItem('tokenTime');

        let datumeToken = new Date(tokenTime)
        let nowDate = new Date(new Date().setHours(new Date().getHours() + 1));
        let datumToken = new Date(new Date().setHours(new Date().getHours() + 2));

        if(nowDate>datumeToken)
        {

            Axios.defaults.headers.common['Authorization'] = 'Bearer '+loginToken;
            const refreshtoken = await Axios.post('refreshtoken.php');
            
            if(refreshtoken.data)            
            {
                
                if(refreshtoken.data.success)
                {                    
                    localStorage.setItem('loginToken', refreshtoken.data.token);
                    localStorage.setItem('tokenTime', datumToken);
                }
                else 
                {
                    this.isLoggedIn();
                }
            }
            else 
            {
                this.isLoggedIn();
            }

        }

    }


    render(){
        const contextValue = {
            rootState:this.state,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser
        }
        return(
            <UserContext.Provider value={contextValue}>
                {this.props.children}
            </UserContext.Provider>
        )
    }

}

export default UserContextProvider;