import classNames from 'classnames';
import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type DialogModalProps = {
  children: ReactNode;
  onClose: () => void;
  title: string | undefined;
};

const Dialog = ({
  children,
  onClose,
  title,
}: DialogModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65"
    >
      <div
        className={classNames(
          'relative flex max-h-[90%] min-h-[100px] min-w-[400px] flex-col rounded-lg bg-white shadow-xl md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg',
          { 'p-4': title }
        )}
        tabIndex={-1}
        ref={modalRef}
      >
        <div
          className={classNames(
            'absolute inset-x-4 flex pb-4',
            title
              ? 'justify-between border-b border-b-gray-200'
              : 'top-4 justify-end'
          )}
        >
          {title && (
            <h2 className="text-xl font-bold text-gray-500">
              {title}
            </h2>
          )}
          <button
            aria-label="Close modal"
            type="button"
            onClick={onClose}
          >
            X{/* TODO: Add icon here  */}
          </button>
        </div>
        <div
          className={classNames(
            title && 'mt-14',
            'overflow-y-auto'
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const Modal = ({
  children,
  onClose,
  title,
}: DialogModalProps) => {
  return createPortal(
    <Dialog onClose={onClose} title={title}>
      {children}
    </Dialog>,
    document.body
  );
};
