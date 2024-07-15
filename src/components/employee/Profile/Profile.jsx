import React from "react";

const Profile = ({data}) => {
  return (
    <div className="w-full">
      <div className="bg-gradient-to-b from-[#058BD2] gap-1 rounded-xl flex flex-col items-center text-white font-semibold">
        <h1 className=" mt-14 capitalize">{data?.name}</h1>
        <h1 className="uppercase font-normal">{data?.department}</h1>
        <img
          src={require("../../../assets/icon/profileicon.png")}
          alt="profile_pic"
          className="w-28 border-2 border-white rounded-full shadow-lg mt-3"
        />
      </div>
      <div className="flex flex-col px-10 gap-3">
        <h1 className=" mt-5 text-[13px] capitalize">
          Hi iam {data?.name} of {data?.department} department in {data?.office?.name}.
        </h1>
        {
          (data?.address?.houseName || data?.address?.city || data?.address?.state || data?.address?.pin)
          &&
          <div>
            <h1 className="text-slate-500 text-bold text-left">Address :</h1>
            <span className="text-sm">{data?.address?.houseName}, {data?.address?.city}, {data?.address?.state}, {data?.address?.pin}</span>
          </div>
        }
        <div>
          <h1 className="text-slate-500 text-bold text-left">Email Address:</h1>
          <span className="text-sm">{data?.email}</span>
        </div>
        <div>
          <h1 className="text-slate-500 text-bold text-left">Phone Number:</h1>
          <span className="text-sm">{data?.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
