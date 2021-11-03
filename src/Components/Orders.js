import React, { useContext, useState, useEffect } from "react";
import { getOrder } from "../DbModal/Order";
import { UserContext } from "../Global/UserContext";
import { OrdersColumn, ProductColumn } from "../Utils/TableColumn";
import { Table } from "../Utils/Table";
import { db } from "../Config/Config";
import { useHistory } from "react-router-dom";
import { LoadingPage } from "./loading-page/LoadingPage";
import { Pagination } from "./common/Pagiantion";
import { paginate } from "./common/paginat";


export const Orders = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [pageSize, setpageSize] = useState(5);
  const [currentPage, setcurrentPage] = useState(1);
   const ordersP = paginate(orders, currentPage, pageSize);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/");
    } else {
      const prevOrders = [];
      db.collection("Orders")
        .doc(user.uid + " Orders")
        .collection("OrderDetails")
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => prevOrders.push(getOrder(doc)));
          console.log("array order");
          console.log(prevOrders);
          setOrders(prevOrders);
          setSpinner(false);
        });
    }
  }, [user]);
  // function the handle the page change
  const handlePagechange = (page) => {
    setcurrentPage(page);
  };
  return (
    <div class="container">
      {spinner && (
        <div class="top">
          <LoadingPage />
        </div>
      )}
      {!spinner && (
        <div>
          <div>
          <Table data={ordersP} Columns={OrdersColumn}></Table>
                  </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              itemsCount={orders.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePagechange}
            />
          </div>
            </div>

      )}
    </div>
  );
};
