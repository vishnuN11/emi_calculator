import { useEffect, useState } from "react";

import "./App.css";
import { tenureData } from "./utils/constant";
import { numberWithCommas } from "./utils/config";
import { TextInput } from "./components/TextInput";
import { SliderInput } from "./components/SliderInput";

function App() {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const updateEmi = (e) => {
    if (!cost) return;
    const dp = Number(e.target.value);
    setDownPayment(dp.toFixed(0));
    const emiAmount = calculateEMI(dp);
    setEmi(emiAmount);
  };
  const calculateDp = (emiAmount) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emiAmount / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };
  const updateDownPayment = (e) => {
    if (!cost) return;
    const emiAmount = Number(e.target.value);
    setEmi(emiAmount);

    const dp = calculateDp(emiAmount);
    setDownPayment(dp);
  };
  const calculateEMI = (downpayment) => {
    // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
    if (!cost) return;
    const loanAmt = cost - downpayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };
  const totalDownPayment=()=>{

// return numberWithCommas((Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0))
return numberWithCommas(
  (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
);
  }
  const totalEmi=()=>{
return numberWithCommas((emi * tenure).toFixed(0))
  }
  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost]);
  return (
    <>
      <div className="App">
        <span className="title">EMI Calculator</span>
       
        <TextInput
        title="Total Cost of Asset"
        state={cost}
        setState={setCost}
        maxValue={undefined}
        />
        <TextInput
        title="Interest Rate (in %)"
        state={interest}
        setState={setInterest}
        maxValue={100}
        />
        <TextInput
        title="Processing Fee (in %)"
        state={fee}
        setState={setFee}
        maxValue={100}
        />

        <SliderInput
        title={"Down Payment"}
        underLineTitle={`Total Down Payment-${totalDownPayment()}`}
        onChange={updateEmi}
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
        />
        <SliderInput
        title={"Loan per Month"}
        underLineTitle={`Total Loan Amount-${totalEmi()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
        />

        <span className="title">Tenure</span>
        <div className="tenureContainer">
          {tenureData.map((t, i) => {
            return (
              <button
                className={`tenure ${t === tenure ? "selected" : ""}`}
                key={i}
                onClick={() => setTenure(t)}
              >
                {t}{" "}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
