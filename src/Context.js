import React, { useContext, useState } from 'react';
import data from './stubs/data';

export const shoppingData = React.createContext();

export const Context= (props)=>{
   const [products]=useState(data.products);

return(
<shoppingData.Provider value={{products}}>
    {props.children}
</shoppingData.Provider>)};

export const Usedata = () => useContext(shoppingData);