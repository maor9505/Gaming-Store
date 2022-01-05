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
    <div class="row">
        <div class="col-sm-3">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <h5 class="card-title text-white">{cardOneText}</h5>
              <p class="card-text fs-2">{cardOne}</p>
            </div>
          </div>
        </div>
        <div class="col-sm-3">
          <div class="card text-white bg-success ">
            <div class="card-body">
              <h5 class="card-title">{cardTwoText}</h5>
              <p class="card-text fs-2">{cardTwo}</p>
            </div>
          </div>
        </div>
      {cardThree != "?" && (
               <div class="col-sm-3">
          <div class="card text-white bg-warning">
            <div class="card-body">
              <h5 class="card-title">{cardThreeText}</h5>
              <p class="card-text fs-2">{cardThree}</p>
            </div>
          </div>
          </div>
      )}
      {cardFor != "?" && (
        <div class="col-sm-3">
          <div class="card text-white bg-danger">
            <div class="card-body">
              <h5 class="card-title">{cardForText}</h5>
              <p class="card-text fs-2">{cardFor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
