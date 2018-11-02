import React, { Component } from 'react';
import axios from 'axios';
import { PageHeader, Panel, Alert, Tabs, Tab } from 'react-bootstrap';

class Form extends Component {

	state = { userName: '' }
	handleSubmit = (event) => {
  	event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
    	.then(resp =>{
      	this.props.onSubmit(resp.data);
        this.setState({ userName: ''})
      })
  }
	render() {
  	return (
    <form onSubmit={this.handleSubmit}>
        <div className="col-2 row">
            <input type="text"
              value={this.state.userName}
              onChange={(event) => this.setState({ userName: event.target.value })}
              placeHolder="Github username" required>
            </input> 
            <button className="btn" type="submit"> Add card </button>
        </div>
    </form>
    );
  }
}

const Card = (props) => {
	return (
  	<div style={{margin: '1em'}}>
    	<img width="75" src={props.avatar_url} alt="" />
      <div style={{display: 'inline-block', marginLeft: 10}}>
      	<div style={{fontSize: '1.25e', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>      
    </div>
  );
};

const CardList = (props) => {
	return(  	
      <div>{props.cards.map(card => <Card key={card.id} {...card} />)}</div>    
  );
};

class GitHubCards extends Component {
    state = {
      cards: []
    };
  
    addNewCard = (cardInfo) => {
          this.setState(prevState => ({
          cards: prevState.cards.concat(cardInfo)
      }));	
    };
    
      render() {
        return (
        <div>
          <Alert bsStyle="warning">
            <strong>Holy guacamole!</strong> Best check yo self, you're not looking too
            good.
          </Alert>
          <Panel>
            <Panel.Body>Basic panel example</Panel.Body>
          </Panel>
          <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
  <Tab eventKey={1} title="Tab 1">
    Tab 1 content
  </Tab>
  <Tab eventKey={2} title="Tab 2">
    Tab 2 content
  </Tab>
  <Tab eventKey={3} title="Tab 3" disabled>
    Tab 3 content
  </Tab>
</Tabs>
          {/* <PageHeader>
            Github Cards finder
          </PageHeader>    
          <Panel>
            <Panel.Heading>
              <Panel.Title componentClass="h3">Type your github user and press enter</Panel.Title>
            </Panel.Heading>      
            <Panel.Body>
              <Form onSubmit={this.addNewCard} />
              <CardList cards={this.state.cards}/>
            </Panel.Body>      
          </Panel> */}
          
        </div>
      );
    }
  }

export default GitHubCards;
