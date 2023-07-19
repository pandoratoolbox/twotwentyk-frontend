import React, { useEffect, useState } from "react";
import { TransactionActionWrapper, TransactionsWrapper } from "./styles";
import { ClaimsTableWrapper, CliamsTableContainer } from "../claims/styles";
import { transactionsData } from "./data";
import {
  WithdrawConfirmModal,
  BalanceForWithdrawModal,
  Button,
  WithdrawModal,
} from "../../../components";
import { getTransactions } from "../../../actions";
import { EmptyCards } from "../../../pages/app/dates/styles";
import { useNavigate } from "react-router-dom";

export const TransactionsSection: React.FC = () => {
  const navigate = useNavigate();
  const [balanceModal, setBalanceModal] = useState(false);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [withdrawStatus, setWithdrawStatus] = useState<"success" | "failed">(
    "failed"
  );
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resData = await getTransactions();
    if (resData.success) {
      setTableData(resData.data);
    } else {
      setTableData([]);
    }
  };

  const handleWithdraw = () => {
    setBalanceModal(false);
    setWithdrawModal(true);
  };

  const handleWithdrawClick = () => {
    setBalanceModal(true);
  };

  const handleConfirmWithdraw = (status?: boolean) => {
    setWithdrawStatus(status ? "success" : "failed");
    setWithdrawModal(false);
    setConfirmModal(true);
  };

  return tableData.length > 0 ? (
    <TransactionsWrapper>
      <>
        <h2>Transactions</h2>
        <CliamsTableContainer>
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
        </CliamsTableContainer>
        <TransactionActionWrapper>
          <Button className="withdraw-button" onClick={handleWithdrawClick}>
            Withdraw Funds
          </Button>
        </TransactionActionWrapper>
        <BalanceForWithdrawModal
          onClose={() => setBalanceModal(false)}
          open={balanceModal}
          onWithdraw={handleWithdraw}
        />
        <WithdrawModal
          onClose={() => setWithdrawModal(false)}
          open={withdrawModal}
          onWithdraw={handleConfirmWithdraw}
        />
        <WithdrawConfirmModal
          status={withdrawStatus}
          onClose={() => setConfirmModal(false)}
          open={confirmModal}
        />
      </>
    </TransactionsWrapper>
  ) : (
    <EmptyCards>
      <h3>No Transactions</h3>
      <p>You do not have any transactions yet.</p>
      <Button className="buy-button" onClick={() => navigate("/marketplace/")}>
        GO TO MARKETPLACE
      </Button>
    </EmptyCards>
  );
};
