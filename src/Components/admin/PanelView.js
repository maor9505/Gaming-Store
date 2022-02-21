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
    <div className="row  justify-content-center ">
      <div className="col-sm-3">
        <div className="card border-primary text-primary shadow ">
          <div className="card-body">
            <h5 className="card-title text-primary">{cardOneText}</h5>
            <p className="card-text fs-2">{cardOne}</p>
          </div>
        </div>
      </div>
      <div className="col-sm-3">
        <div className="card border-success text-success shadow  ">
          <div className="card-body">
            <h5 className="card-title text-success">{cardTwoText}</h5>
            <p className="card-text fs-2">{cardTwo}</p>
          </div>
        </div>
      </div>
      {cardThree != "?" && (
        <div className="col-sm-3">
          <div className="card border-warning text-warning shadow">
            <div className="card-body">
              <h5 className="card-title text-warning">{cardThreeText}</h5>
              <p className="card-text fs-2">{cardThree}</p>
            </div>
          </div>
        </div>
      )}
      {cardFor != "?" && (
        <div className="col-sm-3">
          <div className="card border-info text-info shadow">
            <div className="card-body">
              <h5 className="card-title text-info">{cardForText}</h5>
              <p className="card-text fs-2">{cardFor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
