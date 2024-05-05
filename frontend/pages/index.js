import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { parseUnits } from 'ethers';

//INTERNAL IMPORT
import { useStateContext } from "../context";
import { checkIfImage } from "@/utils";




const index = () => {
    const { address, connect, contract, realEstate, listPropertyFunction, getPropertiesData } = useStateContext();


//State variable
    const [isLoading, setIsLoading] = useState(false);
    const [properties, setProperties] = useState([]);

    const [form, setForm] = useState({
        propertyTitle:"",
        description:"",
        category:"",
        price: "",
        images: "",
        propertyAddress:"",
        });
        const handleFromFieldChange = (fieldName, e) => {
            setForm( {...form, [fieldName]: e.target.value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault() ;
            checkIfImage( form. images, async (exists) =>{
                if (exists) {
                 setIsLoading (true);
                 try {
                    // Parse the price using ethers.utils.parseUnits
                    const priceInWei = ethers.utils.parseUnits(form.price, 18);

                    // List the property using the contract function
                    await listPropertyFunction({
                        ...form,
                        price: priceInWei,
                    });

                    // Clear the form fields after successful submission
                    setForm({
                        propertyTitle: '',
                        description: '',
                        category: '',
                        price: '',
                        images: '',
                        propertyAddress: ''
                    });
                } catch (error) {
                    console.error('Error listing property:', error);
                } finally {
                    // Set loading state to false
                    setIsLoading(false);
                }
            } else {
                // Alert the user to provide a valid image URL
                alert('Please provide a valid image URL');
                
                // Reset the form images field
                setForm({ ...form, images: '' });
            }
        });
    };

    //READ DATA OR GET DATA |
    const fetchProperty = async () => {
        setIsLoading( true); 
        const data = await getPropertiesData(); 
        setProperties(data);
        setIsLoading (false);
    };  
    
    useEffect(() => { 

        if (contract) fetchProperty();
        }, [address, contract]); 
       

    return ( 
        <div>
            <h1>{realEstate}</h1>
            <button onClick={() => connect()}>Connect</button>
            <h1>Create</h1> 
            <form onSubmit={handleSubmit}>
                <div>
                 <input type="text"
                placeholder="propertyTitle" 
                onChange={(e) => handleFromFieldChange("propertyTitle", e)}
                />
                </div>
                <div>
                 <input type="text"
                placeholder="description" 
                onChange={(e) => handleFromFieldChange("description", e)}
                />
                </div>
                <div>
                 <input type="text"
                placeholder="category" 
                onChange={(e) => handleFromFieldChange("category", e)}
                />
                </div>
                <div>
                 <input type="number"
                placeholder="price"
                value={form.price} 
                onChange={(e) => handleFromFieldChange("price", e)}
                />
                </div>
                <div>
                 <input type="url"
                placeholder="images"
                value={form.images}
                onChange={(e) => handleFromFieldChange("images", e)}
                />
                </div>
                <div>
                 <input type="text"
                placeholder="propertyAddress" 
                onChange={(e) => handleFromFieldChange("propertyAddress", e)}
                />
                </div>
                <button type = "submit">Submit</button>
            </form>
         </div>
    );
};

export default index;