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
        <h1>Wecome to actualize</h1><br/>
        <h3>actualize is a drag and drop SCRUM board inspired by Trello and SCRUM theory.</h3><br/>
        <hr/><br/>
        <ul>
        <li><h4> You can add tasks by clicking the Add Task button above.</h4></li><br/>
        <li><h4> You can also use the progress bar to mark your progress per task item.</h4></li><br/>
        <li><h4> When you complete an item you can drop it into the done column or delete it. </h4></li><br/>
        </ul>
      </Modal>

    </main>
  )
 }
}

const container = document.createElement("div")
document.body.appendChild(container)
ReactDOM.render(<Dashboard/>, container)
