import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Epic, View, Avatar, Alert, ActionSheet, ActionSheetItem, IOS, platform } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style/style.css';

import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import CircleBot from './img/circle.svg';
import CrossBot from './img/cross.svg';

import Main from './panels/Main';
import Setting from './panels/Setting';
import Money from './panels/Money';
import Home from './panels/Home';
import HomeFrame from './panels/HomeFrame';
import GameKN from './panels/GameKN';

const osname = platform();

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			panel: 		'main',					//Активная панель
			money: 		{},						//Деньги
			kn: 		{},						//Крестики-нолики
			kndisabled: false,					//Кнопки в крестиках-ноликах
			sizekn:		24,						//Размер поля
			user: 		null,					//Информация о профиле
			popout:		null,					//Всплывающие объекты
			menuhide:	false,					//Скрытие уведомления про меню
		};
		this.money 		= this.money.bind(this);
		this.apiupdate 	= this.apiupdate.bind(this);
		this.kn 		= this.kn.bind(this);
		this.openSheet 	= this.openSheet.bind(this);
		this.wcancel	= this.wcancel.bind(this);
	}
	
	go = (e) => { //Смена Panel
		if ( e.currentTarget.dataset.to === 'time' ) {
			this.setState( { menuhide:true } );
			return;
		}
		this.setState({ panel: e.currentTarget.dataset.to });
		window.history.pushState( { panel: e.currentTarget.dataset.to }, `${e.currentTarget.dataset.to}` );
	};

	//Склонение числительных
	decnum (a,b) { let cases=[2,0,1,1,1,2];return b[(a%100>4 && a%100<20)?2:cases[(a%10<5)?a%10:5]]; }

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

	//Стартовая функция
	async start () {
		await window.history.pushState( { panel: 'main' }, `main` );
		let res 	= await fetch( `https://clefer.ru/eco/main.php?`+ window.location.search.replace( '?', '') );
		let data 	= await res.json();
		if ( data.response ) {
			let money = ( data.response.money ) ? data.response.money : {};
			await this.setState( {
				money:	money,
			} );
		} else if ( data.error ) {
			console.log( data.error );
		} else {
			console.log( 'Ошибка соединения.' );
		}
	}

	//Денежки
	async money ( method, params ) {
		let res 	= await fetch( `https://clefer.ru/eco/main.php?method=${method}&${JSON.stringify(params).replace('{', '').replace('}', '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&')}&${window.location.search.replace( '?', '')}` );
		let data 	= await res.json();
		if ( data.response ) {
			let money = ( data.response.money ) ? data.response.money : {};
			await this.setState( {
				money:	money,
			} );
		} else if ( data.error ) {
			console.log( data.error );
		} else {
			console.log( 'Ошибка соединения.' );
		}
	}

	//API крестиков-ноликов
	async apikn ( method, params ) {
		await this.setState( { kndisabled: true } );
		let regexp = /vk_platform=([^&]+)/i;
		let GetValue = '';
		let	sizebut = 28;
		if (!!regexp.exec(document.location.search)) {
			GetValue = regexp.exec(document.location.search)[1];
			if ( GetValue === 'desktop_web' ) { sizebut = 48; } 
		}
		this.setState( { sizebut: sizebut } );
		let res 	= await fetch( `https://clefer.ru/eco/kn.php?method=${method}&${JSON.stringify(params).replace('{', '').replace('}', '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&')}&${window.location.search.replace( '?', '')}` );
		let data 	= await res.json();
		if ( data.response ) {
			let kn = ( data.response.kn ) ? data.response.kn : {};
			let money = ( data.response.money ) ? data.response.money : {};
			await this.setState( {
				kn:			kn,
				kndisabled: false,
				money:		money,
			} );
		} else if ( data.error ) {
			console.log( data.error );
		} else {
			console.log( 'Ошибка соединения.' );
		}
	}

	//API К-Н
	kn = ( e ) => {
		let m = e.currentTarget.dataset.m;
		let p = e.currentTarget.dataset.p;
		this.apikn( m, p );
	}

	//Обычное обновление
	apiupdate = ( e ) => {
		switch ( e.currentTarget.dataset.type ) {
			case 'kn': 		this.apikn( '1', {} ); 		break;
			default: 									break;	
		}
	}

	//Включение сервиса
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

	wcancel = ( e ) => {
		this.setState( { menuhide:false } );
	}

	//Готовые иконки
	icons ( name ) {
		switch ( name ) {
			case 'n': 	case 's':	return <Avatar style={ { background: 'none' } } 	size={this.state.sizebut}></Avatar>;
			case 'u':				return <Avatar src={ CrossBot } style={ { background: 'none' } } size={this.state.sizebut}></Avatar>;
			case 'b':				return <Avatar src={ CircleBot } style={ { background: 'none' } } size={this.state.sizebut}></Avatar>;
			case 'cancel':			return <div onClick={ () => this.wcancel() }><Avatar style={ { background: '#ebedf0' } } 		size={28}><Icon24Cancel 			fill="var(--white)" /></Avatar></div>;
			default: 				return <Avatar style={ { background: 'var(--destructive)' } } 		size={28}><Icon24Report 			fill="var(--white)" /></Avatar>;
		}
	};

	//Всплывающие окна
	openSheet = ( e ) => {
		switch ( e.currentTarget.dataset.notifs ) {
			case 'knnew':
			this.setState( { popout:
				<Alert actions={ [ { title: 'Продолжить', action: () => this.apikn( '2', {} ), autoclose: true, style: 'cancel' }, { title: 'Отмена', autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
					<h2>Новая игра</h2>
					<p>Если вы начнёте новую игру, вам будет засчитано поражение.</p>
				</Alert>
			} );
			break;
		default: 
			this.setState( { popout:
				<ActionSheet onClose={ () => this.setState( { popout: null } ) } title="Ошибка" text="Неизвестный источник вызова">
					{ osname === IOS && <ActionSheetItem autoclose theme="cancel">Отмена</ActionSheetItem> }
				</ActionSheet>
			} );
			break;
		}
	}

	render() {
		return (
			<Epic activeStory="home" tabbar={false}>
				<View popout={ this.state.popout } id="home" activePanel={this.state.panel}>		
					<Main 		id="main" 		state={this.state} go={this.go} decnum={this.decnum} apiupdate={this.apiupdate} icons={this.icons} wcancel={this.wcancel} />
					<Setting 	id="setting" 	state={this.state} go={this.go} decnum={this.decnum} />
					<Money 		id="money" 		state={this.state} go={this.go} decnum={this.decnum} money={this.money} />
					<Home 		id="home" 		state={this.state} go={this.go} decnum={this.decnum} />
					<HomeFrame	id="homeframe"	state={this.state} go={this.go} decnum={this.decnum} />
					<GameKN		id="kn"			state={this.state} go={this.go} decnum={this.decnum} apiupdate={this.apiupdate} icons={this.icons} kn={this.kn} openSheet={this.openSheet} />
				</View>
			</Epic>
		);
	}
}

export default App;
