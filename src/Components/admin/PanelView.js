import React, { useState } from "react";
export const PanelView = ({
  cardOne,
  cardOneText,
  cardTwo,
  cardTwoText,
  cardThree,
  cardThreeText,
  cardFor,
  cardForText,
}) => {
  return (
    <div className="row">
        <div className="col-sm-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title text-white">{cardOneText}</h5>
              <p className="card-text fs-2">{cardOne}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-3">
          <div className="card text-white bg-success ">
            <div className="card-body">
              <h5 className="card-title">{cardTwoText}</h5>
              <p className="card-text fs-2">{cardTwo}</p>
            </div>
          </div>
        </div>
      {cardThree != "?" && (
               <div className="col-sm-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">{cardThreeText}</h5>
              <p className="card-text fs-2">{cardThree}</p>
            </div>
          </div>
          </div>
      )}
      {cardFor != "?" && (
        <div className="col-sm-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">{cardForText}</h5>
              <p className="card-text fs-2">{cardFor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
