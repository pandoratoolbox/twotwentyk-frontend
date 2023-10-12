import React, {useEffect} from "react";
import { AppLayout } from "../../../layout/AppLayout";
import { TransactionsSection } from "../../../modules";
import { loadMoonPay } from '@moonpay/moonpay-js';
import api from "../../../config/api";


export const TransactionsPage: React.FC = () => {
  const showMoonpay = async () => {
    let moonPay = await loadMoonPay();
    if (moonPay) {
      
      const moonPaySdk = moonPay({
        flow: 'withdraw',
        environment: 'sandbox',
        variant: 'overlay',  
        params: {  
          apiKey: 'pk_test_PaUTi3HVAHvclaZTMJS0TNTfMIrpPj',
          baseCurrencyCode: "USDC",
          externalCustomerId: "test",
        },
        debug: true
      });
      
  
      if (moonPaySdk) {
        const urlForSignature = moonPaySdk.generateUrlForSigning();
        api.post("/webhook/moonpay/sign", {url: urlForSignature}).then((res) => {
          console.log(res);
          moonPaySdk.updateSignature(res.data.signature);
          moonPaySdk.show();
        }).catch((err) => {
          console.log(err);
        }
        )

       
      } else {
        console.log("error showing moonpay")
      }
  }
}


useEffect(() => {
  // showMoonpay()
}, []);


  return (
    <AppLayout>
      <TransactionsSection />
    </AppLayout>
  );
};
