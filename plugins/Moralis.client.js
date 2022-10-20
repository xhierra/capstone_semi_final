import { Moralis } from "moralis";

Moralis.start({
  serverUrl: "https://lxcqkxaea69u.usemoralis.com:2053/server",
  appId: "Wn6X8d0CacEVC1FeTrTH1lBldN7qNMrwLf3kSOZp",
});

Moralis.Web3.getSigningData = () => "Welcome to CrypInto";
