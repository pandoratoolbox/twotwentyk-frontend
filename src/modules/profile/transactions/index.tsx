import React, { useEffect, useState } from "react";
import { TransactionActionWrapper, TransactionsWrapper } from "./styles";
import { ClaimsTableWrapper } from "../claims/styles";
import { transactionsData } from "./data";
import { Button } from "../../../components";
import { getTransactions } from "../../../actions";

export const TransactionsSection: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {}, []);

  const getData = async () => {
    const resData = await getTransactions();
    if (resData.success) {
      setTableData(resData.data);
    } else {
      setTableData([]);
    }
  };

  return (
    <TransactionsWrapper>
      <h2>Transactions</h2>
      <ClaimsTableWrapper>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 ? (
            tableData.map((item: any, key: number) => (
              <tr key={key}>
                <td>{new Date(item.created_at).toDateString()}</td>
                <td>
                  <span className={item.amount < 0 ? "amount-cell" : ""}>
                    {item.amount < 0 && "-"}$
                    {item.amount >= 0 ? item.amount : item.amount * -1}
                  </span>
                </td>
                <td>
                  <span>{item.description}</span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </ClaimsTableWrapper>
      <TransactionActionWrapper>
        <Button className="withdraw-button">Withdraw Funds</Button>
      </TransactionActionWrapper>
    </TransactionsWrapper>
  );
};
