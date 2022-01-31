import { useRouter } from 'next/router';
import React from 'react';

const BrowseHome = () => {
    const router = useRouter()
    router.push("/browse/a")
  return <div></div>;
};

export default BrowseHome;
