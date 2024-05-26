import React from "react";

const Subscription = () => {
  return (
    <div className="flex flex-col gap-2">
      <ul className="steps steps-vertical lg:steps-horizontal justify-center font-medium text-sm">
        <li className="step step-primary">Make Account</li>
        <li className="step step-primary">Write Content</li>
        <li className="step">Get Monthly Analysis</li>
        <li className="step">Earn money</li>
      </ul>
    </div>
  );
};

export default Subscription;
