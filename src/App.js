import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Epic, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style/style.css';

import Main from './panels/Main';
import Setting from './panels/Setting';
import Money from './panels/Money';
import Home from './panels/Home';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			panel: 'main',										//Активная панель

			user: null,											//Информация о профиле
		};
	}
	
	go = (e) => { //Смена Panel
		this.setState({ panel: e.currentTarget.dataset.to });
		window.history.pushState( { panel: e.currentTarget.dataset.to }, `${e.currentTarget.dataset.to}` );
	};

//Переход по старым панелям
async Pop ( e ) {
	if(e.state) {
		let panel = e.state.panel;
		await this.setState( { panel: panel } );
	} else {
		await this.setState( { panel: 'main' } );
		window.history.pushState( { panel: 'main' }, `main` );
	}
}

	componentDidMount() {
		window.addEventListener('popstate', e => e.preventDefault() & this.Pop(e));
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ user: e.detail.data });
					window.history.pushState( { panel: 'main' }, `main` );
					console.log(e.detail.data);
					break;
				default:
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}


	render() {
		return (
			<Epic activeStory="home">
				<View id="home" activePanel={this.state.panel}>		
					<Main 		id="main" 		state={this.state} go={this.go} />
					<Setting 	id="setting" 	state={this.state} go={this.go} />
					<Money 		id="money" 		state={this.state} go={this.go} />
					<Home 		id="home" 		state={this.state} go={this.go} />
				</View>
			</Epic>
		);
	}
}

export default App;
