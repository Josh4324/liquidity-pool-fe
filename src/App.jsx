import './App.css'
import tokenABI from "../abi/token.json";
import vaultABI from "../abi/vault.json";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const amountRef = useRef();
  const amountRef2 = useRef();
  const amountRef3 = useRef();
  const receiverRef = useRef();
  const receiverRef2 = useRef();


  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [totalA, setTotalAsset] = useState(0);
  const [UserA, setUSerAsset] = useState(0);
  const [amount, setAmount] = useState(0);


  const tokenAddress = "0x362eD22BC7A928863D4CAE1aE32ad3D6686ef0Ce";
  const vaultAddress = "0xfB3F6E30e0A79d6D2213A91cfbc819e81E4757Af";




  const createWriteContractToken = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = await provider.getSigner();
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI.abi, signer);
    return tokenContract;
  };

  const createGetContractToken = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const betContract = new ethers.Contract(tokenAddress, tokenABI.abi, provider);
    return betContract;
  };

  const createWriteContractVault = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = await provider.getSigner();
    const vaultContract = new ethers.Contract(vaultAddress, vaultABI.abi, signer);
    return vaultContract;
  };

  const createGetContractVault = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum)
    const betContract = new ethers.Contract(vaultAddress, vaultABI.abi, provider);
    return betContract;
  };

  const approve = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContractToken();
    const id = toast.loading("Approval in progress..");
    try {
      const tx = await contract.approve(vaultAddress, ethers.utils.parseEther(amountRef.current.value));
      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const approve2 = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContractToken();
    const id = toast.loading("Approval in progress..");
    try {
      const tx = await contract.approve(vaultAddress, ethers.utils.parseEther(amountRef3.current.value));
      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const deposit = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContractVault();
    const id = toast.loading("Deposit in progress..");
    try {
      const tx = await contract.deposit(ethers.utils.parseEther(amountRef.current.value), receiverRef.current.value);
      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const withdraw = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContractVault();
    const id = toast.loading("Withdrawal in progress..");
    try {
      const tx = await contract.withdraw(ethers.utils.parseEther(amountRef2.current.value), receiverRef2.current.value, address);
      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };

  const addYield = async (evt) => {
    evt.preventDefault();
    const contract = await createWriteContractVault();
    const id = toast.loading("Add Yield in progress..");
    try {
      const tx = await contract.addYield(ethers.utils.parseEther(amountRef3.current.value));
      await tx.wait();
      setTimeout(() => {
        window.location.href = "/";
      }, 10000);

      toast.update(id, {
        render: "Transaction successfull",
        type: "success",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    } catch (error) {
      console.log(error);
      toast.update(id, {
        render: `${error.reason}`,
        type: "error",
        isLoading: false,
        autoClose: 10000,
        closeButton: true,
      });
    }
  };


  const getAllowance = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = await provider.getSigner();
    const taddress = await signer.getAddress()
    const contract = await createGetContractToken();
    const allow = await contract.allowance(taddress, vaultAddress);
    setAllowance(allow);
  };


  const getBalance = async () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contract = await createGetContractVault();
    const signer = await provider.getSigner();
    const address = await signer.getAddress()
    const balance = await provider.getBalance(address);
    const total = await contract.totalAssets();
    setTotalAsset(Number(total));
    const userAsset = await contract.maxWithdraw(address);
    setBalance(Number(balance));
    setUSerAsset(Number(userAsset));
    setAddress(address);
  };


  useEffect(() => {
    getBalance();
    getAllowance();
  }, [allowance]);



  return (
    <>
      <h1> LiquidityPool </h1>


      <div className='options2'>
        <div>User - {address}</div>
        <div>Balance - {balance / 10 ** 18} ether</div>
        <div>User Shares - {UserA / 10 ** 18} shares </div>
        <div>Total Assets in Pool - {totalA / 10 ** 18} MTK </div>
      </div>


      <div>


        <div className='options'>
          <div className='text1'>Deposit</div>
          <input ref={amountRef} className='input1' placeholder='Enter Amount in ether' />
          <input ref={receiverRef} className='input1' defaultValue={address} placeholder='Enter Receiver Address' />

          {
            allowance >= Number(amountRef?.current?.value) * 10 ** 18 ? <button onClick={deposit} className='but1'>Deposit</button> : <button onClick={approve} className='but1'>Approve</button>
          }

        </div>


        <div className='options'>
          <div className='text1'>Withdraw</div>
          <input ref={amountRef2} className='input1' placeholder='Enter Amount in ether' />
          <input ref={receiverRef2} className='input1' defaultValue={address} placeholder='Enter Receiver Address' />
          {
            <button onClick={withdraw} className='but1'>Withdraw</button>
          }

        </div>


        <div className='options'>
          <div className='text1'>Add Yield (Admin)</div>
          <input ref={amountRef3} className='input1' placeholder='Enter Amount in ether' />
          {
            Number(allowance) >= Number(amountRef3?.current?.value) * 10 ** 18 ? <button onClick={addYield} className='but1'>Add Yield</button> : <button onClick={approve2} className='but1'>Approve</button>
          }

        </div>


      </div>
    </>
  )
}

export default App
