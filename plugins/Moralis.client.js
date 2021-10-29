import {Moralis} from 'moralis';






Moralis.start({ 
    serverUrl: "https://gtopokrxv9ew.grandmoralis.com:2053/server", 
    appId: "HtC5u4GgJf8v5TbLmpe3ZcDRjRjTNXlLDdV7sBG0" 
});

Moralis.Web3.getSigningData = () => 'Welcome to CrypInto'