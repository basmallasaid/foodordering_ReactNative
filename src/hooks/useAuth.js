import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase';

export const useAuth = () => {
    const [user,setUser]=useState(null);
    const [loading, setLoading] = useState(true);
     useEffect(()=>{
      const unsubscribe= onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        });
        return undefined;
    },[]);

  return{user,loading}
};

