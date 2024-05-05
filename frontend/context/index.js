import React, { useEffect, useContext, createContext } from "react";
import {
useAddress,
useContract,
useMetamask,
useContractWrite,
useContractRead,
useContractEvents,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract ("0x5B45172c3d4D47006596871575606499C3cC7661");
    
    const address = useAddress();
    const connect = useMetamask();
    const realEstate ="Realestate dapp";


    //function........................
    //1.listproperty
    const { mutateAsync: listProperty, isLoading } = useContractWrite (contract, "listProperty")

    const listPropertyFunction = async  (form)  => {
      const { propertyTitle, 
      description, 
      category, 
      price,
      images,
      propertyAddress } = form;
      try { 
      const data = await listProperty({ args: [address, price, propertyTitle, category, images, 
      propertyAddress, description] }); 
      console. info("contract call success", data); 
      } catch (err) { 
      console.error("contract call failure", err); 
      } 


     try {
    const data = await listProperty( {address,price, propertyTitle,category, images,propertyAddress,description} );
      console.info("contract call successs", data);
} catch (err) {
      console.error("contract call failure", err);
    }
  };

  //2 updateproperty

  const { mutateAsync: updateProperty, isLoading:updatePropertyLoading } = useContractWrite (contract, "updateProperty");
  const updatePropertyFunction = async (form) => {
    const {
    productId, 
    propertyTitle,
    description, 
    category, 
    images, 
    propertyAddress, 
     } = form;
     try {
      const data = await updateProperty({
     args: [
     address,
     productId,
     propertyTitle,
     category,
     images,
     propertyAddress,
     description,
     ],
    });

    connect.log("successfully updated",data);
   } catch (error) {
     console.log("Error while updating",error)
     }
};


//3updatePrice

const { mutateAsync: updatePrice, isLoading:updatePriceLoading } = useContractWrite (contract, "updatePrice");
const updatePriceFunction = async (form) => {
  const { productId, price } = form; I
  try {
  const data = await updatePrice( [address, productId, price]);
  console.log("trnsact success",data);
  }catch (error) {
  console. log("failed transact",error);
  }
};

//buyProperty



//get property data section







const getPropertiesData = async () => {
  try { 
  const properties = await contract.call("getAllProperties");
  
  const parsedProperties = properties.map((property, i) => ({
    owner: property.owner,
    title: property.propertyTitle,
    description: property.description,
    category: property.category,
    price: ethers.utils.formatEther (property.price.toString()),
    productId: property.productID. toNumber(),
    reviewers: property. reviewers,
    reviews: property. reviews,
    image: property. images, 
    address: property. propertyAddress,
  }));
  return parsedProperties;

  console.log (properties) ; 
  
  } catch (error) { 
    console.log ("error while loading data", error);
  }
};
  


    return (
    <StateContext. Provider value={{address, connect, contract, realEstate,listPropertyFunction,getPropertiesData, updatePropertyFunction,updatePriceFunction}}>
    {children}
    </StateContext. Provider>
    );
};

export const useStateContext =()=> useContext(StateContext);