import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { loginPost } from "../utils/Endpoint";
import { toast } from "react-toastify";
import { setUser } from "../redux/slices/AuthSlicer";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import logo from "../assets/logo.png";
import axios from "../api/axios";
import { setAccessToken, setRefreshToken } from "../redux/slices/TokenReducer";

const Login = () => {
  const [error, setError] = useState({});
  const [user, setData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData?.userInfo?.role === "admin") {
      navigate("/admin/dashboard");
    }else if(["employee", "leader"].includes(userData?.userInfo?.role)){ 
      // ["employee", "leader"].includes(userData?.userInfo?.role)
      navigate("/employee/dashboard");
    }else if(userData?.userInfo?.role === "student"){
      navigate("/student/dashboard");
    }
  }, [userData, navigate]);

  // @DSC Form Submit
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // @dsc Validation
      const validationError = {};

      if (!user.email.trim()) {
        validationError.email = "email is require";
      } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        validationError.email = "email is not valid";
      }

      if (!user.password.trim()) {
        validationError.password = "password is require";
      } else if (user.password.length < 6 || user.password.length > 20) {
        validationError.password =
          "password is minimum containing 6 and maximum containing 20 characters";
      }
      setError(validationError);

      // Backend call for user Validation
      if (Object.keys(validationError).length === 0) {
        const response = await axios.post(loginPost, user);
        toast.success(response?.data?.email && "Authenticated");
        dispatch(setUser(response.data.userInfo));
        dispatch(setAccessToken(response.data?.accessToken));
        dispatch(setRefreshToken(response.data?.refreshToken));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  }

  // @DSC Input Changes
  const changeHandler = (e) => {
    setData({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // @DCS password eye button
  const icon = visible ? (
    <AiFillEye size={19} className="text-secondary cursor-pointer" />
  ) : (
    <AiFillEyeInvisible size={19} className="text-secondary cursor-pointer" />
  );
  const inputType = visible ? "text" : "password";

  return (
    <div className="w-full h-screen relative flex items-center justify-center overflow-hidden">
      <img
        src={require("../assets/images/Login_bg.png")}
        alt="bgImage"
        className="absolute bottom-0 md:-bottom-0 text-center object-contain -z-10 "
      />
      <div className="container mx-auto h-full flex flex-col items-center justify-center ">
        <div className="w-full flex items-center ms:items-center justify-center ">
          <img src={logo} alt="Logo" className="object-container z-50 w-40" />
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="data w-full m-5 bg-white border md:w-2/6 rounded p-10 shadow-lg">
            <form onSubmit={submitHandler} className="flex flex-col py-5">
              <h2 className="text-[#0061B2] text-2xl font-bold text-center mb-5">
                Login
              </h2>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col text-sm">
                  <label htmlFor="" className="text-xs md:text-sm font-semibold text-[#0061B2]">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={changeHandler}
                    required
                    className="border p-2 mt-1 focus:outline-none rounded "
                  />
                  {error.email && (
                    <span className="text-[12px] py-2 text-red-600">
                      {error.email}
                    </span>
                  )}
                </div>
                <div className="flex flex-col text-sm relative">
                  <label htmlFor="" className="text-xs md:text-sm font-semibold text-[#0061B2]">
                    Password
                  </label>
                  <input
                    type={inputType}
                    name="password"
                    onChange={changeHandler}
                    required
                    className="border p-2 mt-1 focus:outline-none rounded"
                  />
                  <div className="absolute right-0 h-full flex items-center justify-end pe-2">
                    <div onClick={() => setVisible(!visible)}>{icon}</div>
                  </div>
                  {error.password && (
                    <span className=" text-[12px] py-2 text-red-600">
                      {error.password}
                    </span>
                  )}
                  <div className="w-full flex justify-end cursor-pointer">
                    <div className="text-[10px] mt-1 hover:text-blue-700 ">
                      Forgot Password?
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-[#0061B2] text-white text-xs p-3 my-3 rounded hover:scale-105 ease-in-out duration-300"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
