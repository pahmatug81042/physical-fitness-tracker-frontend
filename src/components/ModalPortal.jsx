// src/components/ModalPortal.jsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function ModalPortal({ children }) {
  const el = React.useRef(document.createElement("div"));

  useEffect(() => {
    const currentEl = el.current;
    modalRoot.appendChild(currentEl);
    return () => {
      modalRoot.removeChild(currentEl);
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
}