import { Modal } from '@/components/Modal';
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';

type Content = {
  content: JSX.Element;
  title: string | undefined;
};

const useModal = () => {
  const [modalContent, setModalContent] =
    useState<Content | null>(null);

  const onCloseMain = useCallback(() => {
    setModalContent(null);
  }, []);

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const { title, content } = modalContent;
    return (
      <Modal onClose={onCloseMain} title={title}>
        {content}
      </Modal>
    );
  }, [modalContent, onCloseMain]);

  const showModal = useCallback(
    (
      title: string | undefined,
      getContent: (onClose: () => void) => JSX.Element
    ) => {
      setModalContent({
        title,
        content: getContent(onCloseMain),
      });
    },
    [onCloseMain]
  );

  return { modal, showModal };
};

export default useModal;
