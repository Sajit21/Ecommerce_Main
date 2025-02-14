import { create } from "zustand";
// import axiosInstance from '../lib/axios'
import axiosInstance from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ username, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password != confirmPassword) { //send data to backend
      set({ loading: false });
      return toast.error("passwords donot match");
    }

    //VE- browser send request and server recives then server create a new user in db

    try {
      const res = await axiosInstance.post("/auth/signup", {
        username,
        email,
        password,
      });
      set({ user: res.data, loading: false });//store in zustand
      toast.success("signup successfully");
      console.log(res);
    } catch (error) {
      set({ loading: false });
      console.log("hello i am error", error);
      toast.error(error.response.data.error || "An error occurred");
    }
  },

  login: async ({ email, password, navigate }) => {
    console.log(email, password);
    set({ loading: true });

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      console.log(res)
      set({ user: res.data, loading: false });
      if (res.status == 200) {
        toast.success("user LoggedIn successfully");
        navigate("/");
      }
      console.log(res);
    } catch (error) {
      set({ loading: false });
      console.log("hello i am error", error);
      toast.error(error.response.data.message || "An error occurred");
    }
  },
  logout: async () =>{
    try {
      await axiosInstance.post('/auth/logout ')
      set({user:null})
      
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred")
      
    }


  },
  checkAuth: async () => {
    set({ checkingAuth:true });
    try{
      const res = await axiosInstance.get("/auth/profile")
      console.log('hello from nepal',res.data)
      set({user:res.data, checkingAuth:false})
    }
    catch(error){
      set({checkingAuth:false, user:null})
    }
  },

  
}));
