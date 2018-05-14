import React, { Component } from 'react';
import Card from './Card';
import update from 'immutability-helper';
import { DropTarget } from 'react-dnd';
import { Input, Button, Icon, Modal } from 'antd';
import './Cards.css';

const { TextArea } = Input;

class Cards extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		showCardCreatorButton: true,
    		showCardDescCreator: false,
    		textAreaValue: "",
    		modalVisible: false,
    		modalText: "",
    		cards: props.list
    	};
    	this.handleClick = this.handleClick.bind(this);
    	this.createCard = this.createCard.bind(this);
    	this.handleTextAreaChange = this.handleTextAreaChange.bind(this);
	}

	pushCard(card) {
		this.setState(update(this.state, {
			cards: {
				$push: [ card ]
			}
		}));
	}

	removeCard(index) {		
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[index, 1]
				]
			}
		}));
	}

	moveCard(dragIndex, hoverIndex) {
		const { cards } = this.state;		
		const dragCard = cards[dragIndex];
		this.setState(update(this.state, {
			cards: {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, dragCard]
				]
			}
		}));
	}

	handleClick() {
		let { showCardCreatorButton, showCardDescCreator } = this.state;
		this.setState({
			showCardCreatorButton: !showCardCreatorButton,
			showCardDescCreator: !showCardDescCreator,
		});
	}

	handleTextAreaChange(event) {
		this.setState({textAreaValue: event.target.value, });
	}

	createCard() {
		let { showCardCreatorButton, showCardDescCreator, textAreaValue } = this.state;
		let cardHeaders = {
			id: this.props.id + "" +this.state.cards.length,
			text: textAreaValue
		};
		
		this.setState({
			showCardCreatorButton: !showCardCreatorButton,
			showCardDescCreator: !showCardDescCreator,
		}, () => {
			if (textAreaValue !== "") {
				this.setState({
					cards: [...this.state.cards, cardHeaders],
					textAreaValue: ""
				});
			}
		});
		
	}

	showModal = (value, index) => {
		this.setState({
			modalVisible: true,
			modalText: value.text
		})
	}

	handleOk = (e) => {
	    this.setState({
	      modalVisible: false,
	      modalText: ""
	    });
	  }

	handleCancel = (e) => {
	    this.setState({
	      modalVisible: false,
	      modalText: ""
	    });
	}

	render() {
		const { cards } = this.state;
		const { canDrop, isOver, connectDropTarget } = this.props;
		const style = {
			width: '200px',
			border: '1px solid #d9d9d9',
			float: 'left',
     		marginLeft: '50px'
		};
		const isActive = canDrop && isOver;
		return connectDropTarget(
			<div style={{...style}}>
				<div>
				<h3 style={{marginLeft: '10px'}}>{this.props.listText}</h3>
				{cards.map((card, i) => {
					return (
						<Card 
							key={card.id}
							index={i}
							listId={this.props.id}
							card={card}														
							removeCard={this.removeCard.bind(this)}
							moveCard={this.moveCard.bind(this)} 
							showModal={this.showModal}/>
					);
				})}
				</div>
				<Modal visible={this.state.modalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
					<p>{this.state.modalText}</p>
				</Modal>


				{this.state.showCardCreatorButton ? <div className="anchorDiv">
					<a className="anchorStyle" onClick={this.handleClick}> Add a card... </a>
				</div> : <div>
					<TextArea placeholder="Add a Card..." className="textAreaStyle" value={this.state.textAreaValue} onChange={this.handleTextAreaChange}/><br/>
					<Button type="primary" className="cardBtn" onClick={this.createCard}>Add</Button>
						<Icon type="close-square" />
				</div>}
			</div>
		);
	}
}


const cardTarget = {
	drop(props, monitor, component ) {
		const { id } = props;
		const sourceObj = monitor.getItem();		
		if ( id !== sourceObj.listId ) component.pushCard(sourceObj.card);
		return {
			listId: id
		};
	}
}

export default DropTarget("CARD", cardTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop()
}))(Cards);