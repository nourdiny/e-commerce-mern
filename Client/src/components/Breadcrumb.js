import React from "react";
import {HiHome} from 'react-icons/hi';
import {BsChevronRight} from 'react-icons/bs';


function Breadcrumb({ path }) {
  return (
    <div class="breadcrumb-option">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="breadcrumb__links flex">
              <a href="/" className="flex justify-center items-center">
                <HiHome className="mr-[5px]"/> Home
                <BsChevronRight className="mr-[5px]" />
              </a>
              {path.map((segment, index) =>
                index === path.length - 1 ? (
                  <span key={index}>{segment}</span>
                ) : (
                  <a key={index} href={`/${segment.toLowerCase()}`}  className="flex justify-center items-center">
                    {segment}
                    <BsChevronRight className="mr-[5px]" />
                  </a>
                 

                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Breadcrumb;
