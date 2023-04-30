import React from "react";

import useEscapeKey from "../../hooks/use-escape-key";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const handleEscapeKey = React.useCallback(() => {
    setToasts([]);
  }, []);

  useEscapeKey(handleEscapeKey);

  function createToast(message, variant) {
    const toast = { id: Math.random(), message, variant };
    const newToasts = [...toasts, toast];

    setToasts(newToasts);
  }

  function dismissToast(id) {
    const newToasts = toasts.filter((toast) => toast.id !== id);
    setToasts(newToasts);
  }

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
