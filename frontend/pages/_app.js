import "../styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { PolygonAmoyTestnet } from "@thirdweb-dev/chains";
import { StateContextProvider } from "../context";
// INTERNAL IMPORT
console.log(ChainId);

const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider clientId="79d3adf6553e80718afe882b832d5ca3" activeChain={PolygonAmoyTestnet}>
      <StateContextProvider>
        <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
};

export default App;
