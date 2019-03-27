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
          <ul className = "modal-txt">
            <li>Lay out all your tasks and reorder them according to importance</li>
            <li>Drag and drop tasks from "To Do" to "In Progress" to "Done"</li>
            <li>See your completion percentage with a live progress bar</li>
          </ul><br/>

      </Modal>
    </main>
  )
 }
}

const container = document.createElement("div")
document.body.appendChild(container)
ReactDOM.render(<Dashboard/>, container)
