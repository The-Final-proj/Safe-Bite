import SignIn from "@/components/SignIn";
import React from "react";
import Image from "next/image";
const page = () => {
  return (
    <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center ">
      <div
        className="container bg-light rounded-3 p-0"
        style={{ maxWidth: "1000px" }}
      >
        <div className="row g-0">
          <SignIn className="vw-100" />
          <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-body-secondary">
            <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center bg-body-secondary">
              <Image
                src="/safebite_logo.png"
                alt="SafeBite Logo"
                width={350}
                height={350}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
