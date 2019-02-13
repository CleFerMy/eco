import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Epic, View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style/style.css';

import Main from './panels/Main';
import Setting from './panels/Setting';
import Money from './panels/Money';
import Home from './panels/Home';
import HomeFrame from './panels/HomeFrame';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			panel: 'main',										//Активная панель
			money: {},

			user: null,											//Информация о профиле
		};
		this.money = this.money.bind(this);
	}
	
	go = (e) => { //Смена Panel
		this.setState({ panel: e.currentTarget.dataset.to });
		window.history.pushState( { panel: e.currentTarget.dataset.to }, `${e.currentTarget.dataset.to}` );
	};

	/*Склонение числительных*/						decnum (a,b) { let cases=[2,0,1,1,1,2];return b[(a%100>4 && a%100<20)?2:cases[(a%10<5)?a%10:5]]; }

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

	async start () {
		await window.history.pushState( { panel: 'main' }, `main` );
		let res 	= await fetch( `https://clefer.ru/eco/main.php?`+ window.location.search.replace( '?', '') );
		let data 	= await res.json();
		if ( data.response ) {
			let money 			= ( data.response.money ) ? data.response.money : {};
			await this.setState( {
				money:	money,
			} );
		} else if ( data.error ) {
			console.log( data.error );
		} else {
			console.log( 'Ошибка соединения.' );
		}
	}

	async money ( method, params ) {
		let res 	= await fetch( `https://clefer.ru/eco/main.php?method=${method}&${JSON.stringify(params).replace('{', '').replace('}', '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&')}&${window.location.search.replace( '?', '')}` );
		let data 	= await res.json();
		if ( data.response ) {
			let money 			= ( data.response.money ) ? data.response.money : {};
			await this.setState( {
				money:	money,
			} );
		} else if ( data.error ) {
			console.log( data.error );
		} else {
			console.log( 'Ошибка соединения.' );
		}
	}

	componentDidMount() {
		window.addEventListener('popstate', e => e.preventDefault() & this.Pop(e));
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ user: e.detail.data });
					this.start();
					break;
				default:
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	render() {
		return (
			<Epic activeStory="home" tabbar={false}>
				<View id="home" activePanel={this.state.panel}>		
					<Main 		id="main" 		state={this.state} go={this.go} decnum={this.decnum} />
					<Setting 	id="setting" 	state={this.state} go={this.go} decnum={this.decnum} />
					<Money 		id="money" 		state={this.state} go={this.go} decnum={this.decnum} money={this.money} />
					<Home 		id="home" 		state={this.state} go={this.go} decnum={this.decnum} />
					<HomeFrame	id="homeframe"	state={this.state} go={this.go} decnum={this.decnum} />
				</View>
			</Epic>
		);
	}
}

export default App;
