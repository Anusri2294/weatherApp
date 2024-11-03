import React from "react";

const Cards = (props) => {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-300 to-pink-500 p-4 rounded-lg shadow-md text-white">
      <div className="text-center">
        <img
          src={props.icon}
          alt={props.weatherDetail}
          className="w-10 h-10 mx-auto mb-2"
        />
        <p className="text-lg font-semibold mb-1">{props.weatherDetail}</p>
        <p className="text-xl font-bold">
          {props.weatherProperty} {props.propertyUnit}
        </p>
      </div>
    </div>
  );
};

export default Cards;
