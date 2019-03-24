import React, {Component} from "react"
import ReactDOM from "react-dom"

export default function Modal ({ handleClose, show, children}){
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  return (
    <div className={showHideClassName}>
    <section className="modal-main">
    {children}
    <button className="start-btn" onClick={handleClose}>Get started!</button>
    </section>
    </div>
  )
}
