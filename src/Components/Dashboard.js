import React, {Component} from "react"
import ReactDOM from "react-dom"
import Modal from "./Modal"

export default class Dashboard extends Component{
state = { show:true}

showModal = () =>{
  this.setState({show: true})
}

hideModal = () =>{
  this.setState({show:false})
}

render(){
  return (
    <main>
      <Modal show={this.state.show} handleClose={this.hideModal}>
        <h1>Make your project vision a reality with actualize</h1><br/>
        <h3>actualize is a drag and drop project managment web app inspired by the Trello platform and SCRUM Methodology.</h3><br/>
        <h3>You can add, reorder, and drag items from "To do" to "In Progress" to "Done", allowing you to visualize your goals and progress.</h3><br/>
      </Modal>
    </main>
  )
 }
}

const container = document.createElement("div")
document.body.appendChild(container)
ReactDOM.render(<Dashboard/>, container)
