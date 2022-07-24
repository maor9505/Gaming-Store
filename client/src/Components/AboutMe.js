
export const AboutMe = () => {

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-lg-6 mb-4 mb-lg-0">
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4 gradient-custom text-center ">
                  <i className="fa fa-user-circle fa-5x mr-2 mt-5"></i>
                <div className='mt-5'>
                  <h5>Maor Elimelech</h5>
                  <p>Developer</p>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h6>Information</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Email</h6>
                        <p className="text-muted">Maor9505@gmail.com</p>
                      </div>
                      <div className="col-6 mb-3">
                        <h6>Phone</h6>
                        <p className="text-muted">????</p>
                      </div>
                    </div>
                    <h6>Projects</h6>
                    <hr className="mt-0 mb-4" />
                    <div className="row pt-1">
                      <div className="col-6 mb-3">
                        <h6>Git</h6>
                        <a
                          className="text-muted"
                          href="https://github.com/maor9505"
                        >
                          https://github.com/maor9505
                        </a>
                      </div>
                    </div>
                    <div className="d-flex justify-content-start">
                        <a
                          className="fa fa-linkedin fa-lg me-3"
                          href="https://www.linkedin.com/in/maor-elimelech-654a6a188"
                        ></a>
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
