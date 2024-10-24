'use client';

import { useEffect, useState } from 'react';

import PreviewModel from '@/components/preview-modal';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PreviewModel />
    </>
  );
};

export default ModalProvider;
