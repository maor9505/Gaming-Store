import React, { useContext, useEffect, useState } from "react";


export const AboutMe = () => {
  

  return (
    <section class="vh-100">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col col-lg-6 mb-4 mb-lg-0">
            <div class="card mb-3">
              <div class="row g-0">
                <div class="col-md-4 gradient-custom text-center ">
                  <i class="fa fa-user-circle fa-5x mr-2 mt-5"></i>
                <div class='mt-5'>
                  <h5>Maor Elimelech</h5>
                  <p>Developer</p>
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="card-body p-4">
                    <h6>Information</h6>
                    <hr class="mt-0 mb-4" />
                    <div class="row pt-1">
                      <div class="col-6 mb-3">
                        <h6>Email</h6>
                        <p class="text-muted">Maor9505@gmail.com</p>
                      </div>
                      <div class="col-6 mb-3">
                        <h6>Phone</h6>
                        <p class="text-muted">????</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr class="mt-0 mb-4" />
                    <div class="row pt-1">
                      <div class="col-6 mb-3">
                        <h6>Git</h6>
                        <a
                          class="text-muted"
                          href="https://github.com/maor9505"
                        >
                          https://github.com/maor9505
                        </a>
                      </div>
                    </div>
                    <div class="d-flex justify-content-start">
                      <a href="#!">
                        <a
                          class="fa fa-linkedin fa-lg me-3"
                          href="https://www.linkedin.com/in/maor-elimelech-654a6a188"
                        ></a>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
