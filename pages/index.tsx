import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useLogin, useUser } from "@thirdweb-dev/react/solana";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
  const { publicKey } = useWallet();
  const login = useLogin();
  const { user } = useUser();

  const handleClick = async () => {
    try {
      const response = await fetch("/api/validate", {
        method: "POST",
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return (
      <div className={styles.container}>
        <p>You are signed in as {user.address}</p>
        <button onClick={handleClick}>Validate user</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {publicKey ? (
        <button onClick={() => login()}>Sign in with Solana</button>
      ) : (
        <WalletMultiButton />
      )}
    </div>
  );
};

export default Home;
