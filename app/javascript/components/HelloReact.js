// app/javascript/components/HelloReact.js
import React from "react"
import ReactDOM from "react-dom"

const HelloReact = () => <h1>Hello, React!</h1>

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<HelloReact />, document.getElementById("hello-react"))
})
