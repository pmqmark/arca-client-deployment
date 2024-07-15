import React from "react";
import Progressbar from "../../dashboard/Progressbar";

const DashCard = ({ data, variant }) => {
  const total = data?.find((d) => d.name === "All")?.value || 0;
  const pending = data?.find((d) => d.name === "Pending")?.value || 0;
  const ongoing = data?.find((d) => d.name === "On-going")?.value || 0;
  const completed = data?.find((d) => d.name === "Completed")?.value || 0;


  const Untouched = data?.find((d) => d.name === "Untouched")?.value || 0;
  const Converted = data?.find((d) => d.name === "Converted")?.value || 0;
  const Warm = data?.find((d) => d.name === "Warm")?.value || 0;
  const Hot = data?.find((d) => d.name === "Hot")?.value || 0;
  const NotContactable = data?.find((d) => d.name === "Not Contactable")?.value || 0;
  const Closed = data?.find((d) => d.name === "Closed")?.value || 0;
  const VisaApproved = data?.find((d) => d.name === "Visa Approved")?.value || 0;
  const NotInterested = data?.find((d) => d.name === "Not Interested")?.value || 0;

  const Completed = data?.find((d) => d.name === "Completed")?.value || 0;
  const Incomplete = data?.find((d) => d.name === "Incomplete")?.value || 0;



  return (
    <div className="rounded-xl flex items-center justify-around p-5 dataCard">
      <div className="flex flex-col items-center text-white w-full">
        <h1 className="font-bold text-[130px]">{total}</h1>
        <h1 className="font-semibold capitalize">Total {variant}s </h1>
      </div>
      <div className="w-full space-y-3">
      {
        variant === 'task'
        ?
        <>
          <Progressbar label="Pending" numerator={pending} denominator={total} />
          <Progressbar label="On-going" numerator={ongoing} denominator={total} />
          <Progressbar label="Completed" numerator={completed} denominator={total} />
        </>
        :
        variant === 'lead'
        ?
        <>
          <Progressbar label="Untouched" numerator={Untouched} denominator={total} />
          <Progressbar label="Converted" numerator={Converted} denominator={total} />
          <Progressbar label="Warm" numerator={Warm} denominator={total} />

          {/* <Progressbar label="Hot" numerator={Hot} denominator={total} />
          <Progressbar label="Not Contactable" numerator={NotContactable} denominator={total} />
          <Progressbar label="Closed" numerator={Closed} denominator={total} />
          <Progressbar label="Visa Approved" numerator={VisaApproved} denominator={total} />
          <Progressbar label="Not Interested" numerator={NotInterested} denominator={total} /> */}

        </>
        :
        variant === 'followup'
        &&
        <>
          <Progressbar label="Completed" numerator={Completed} denominator={total} />
          <Progressbar label="Incomplete" numerator={Incomplete} denominator={total} />

        </>
        
        }
        </div>
    </div>
  );
};

export default DashCard;
