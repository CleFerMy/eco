import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Epic, View, Avatar, Alert, ActionSheet, ActionSheetItem, IOS, platform } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style/style.css';

import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import CircleBot from './img/circle.svg';
import CrossBot from './img/cross.svg';

import Main from './panels/Main';
import Setting from './panels/Setting';
import Money from './panels/Money';
import Home from './panels/Home';
import HomeFrame from './panels/HomeFrame';
import Job from './panels/Job';
import JobFrame from './panels/JobFrame';
import GameKN from './panels/GameKN';
import About from './panels/About';

const osname = platform();

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			/* Глобальное */
			load:		false,					//Статус загрузки
			popout:		null,					//Всплывающие объекты
			user: 		null,					//Профиль VK
			notifhide:	false,					//Статус уведомления
			panel: 		'main',					//Активный раздел

			/* Игровое глобальное */
			money: 		{},						//Деньги

			/* Крестики-нолики */
			kn: 		{},						//Информация о игре
			kndisabled: false,					//Статус кнопок
			sizekn:		24,						//Размер игрового поля

			/* Раздел Money */
			bankmoney:	{},						//Счета в банке

			/* Раздел Home */
			homelist:	{},						//Список домов

			/* Раздел About */
			version:	'Beta 1.0, build 9',	//Версия сервиса
			contacts:	{},						//Список партнёров

			/* Раздел Setting */
			//Пусто
		};
		this.apiupdate 	= this.apiupdate.bind(this);	//API
		this.kn 		= this.kn.bind(this);			//API К-Н
		this.openSheet 	= this.openSheet.bind(this);	//Всплывающие объекты
		this.wc	= this.wc.bind(this);					//Статус уведомления
	}
	
	//Переход на другой раздел
	go = (e) => {
		switch ( e.currentTarget.dataset.to ) {
			//Закрытый раздел
			case 'time':
				this.setState( { notifhide:true } );
				return;
			case 'about':
				if ( !this.state.contacts.length ) {
					this.api( "setting", "1", "{}");
				}
				break;
			default:	break;
		}
		//Меняем раздел
		this.setState({ panel: e.currentTarget.dataset.to, notifhide:false });
		
		//Записываем в историю
		window.history.pushState( { panel: e.currentTarget.dataset.to }, `${e.currentTarget.dataset.to}` );
	};

	//Склонение числительных
	dn (a,b) { let c=[2,0,1,1,1,2];return b[(a%100>4 && a%100<20)?2:c[(a%10<5)?a%10:5]]; }
	//Скрытие уведомления
	wc = ( e ) => { this.setState( { notifhide:false } ); }

	//Переход по старым панелям
	async Pop ( e ) {
		if(e.state) {
			await this.setState( { panel: e.state.panel, panels: false } );
		} else {
			await this.setState( { panel: 'main' } );
			await window.history.pushState( { panel: 'main' }, `main` );
		}
	}

	//API
	async api ( section, method, params ) {
		await this.setState( { load:false } );
		let res 	= await fetch( `https://clefer.ru/eco/${section}.php?method=${method}&${JSON.stringify(params).replace('{', '').replace('}', '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&')}&${window.location.search.replace( '?', '')}` );
		let data 	= await res.json();
		if ( data.response ) {
			switch ( section ) {
				case 'main':
					switch ( data.response.type ) {
						case '0':
							let menu 		= ( data.response.menu ) ? data.response.menu : {};
							let money 		= ( data.response.money ) ? data.response.money : {};
							await this.setState( {
								menu:		menu,
								money:		money,
								load:		true,
							} );
							break;
						default:	break;
					}
					break;
				case 'setting':
					switch ( data.response.type ) {
						case '1':
							let contacts 	= ( data.response.contacts ) ? data.response.contacts : {};
							await this.setState( {
								contacts:	contacts,
								load:		true,
							} );
							break;
						default:	break;
					}
					break;
				case 'home':
					let homelist = ( data.response.homelist ) ? data.response.homelist : {};
					await this.setState( {
						homelist:	homelist,
						load:		true,
					} );
					break;
				default:	break;
			}
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
					window.history.pushState( { panel: 'main' }, `main` );
					this.setState({ user: e.detail.data });
					this.api( 'main', '0', '{}');
					break;
				default:
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	//Готовые иконки
	icons ( name ) {
		switch ( name ) {
			case 'bankmoney':		return <Avatar style={ { background: '#4BB34B' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></Avatar>;
			case 'bankmoneyempty':	return <Avatar style={ { background: '#FFA000' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></Avatar>;
			case 'n': 	case 's':	return <Avatar style={ { background: 'none' } } 	size={this.state.sizebut}></Avatar>;
			case 'u':				return <Avatar src={ CrossBot } style={ { background: 'none' } } size={this.state.sizebut}></Avatar>;
			case 'b':				return <Avatar src={ CircleBot } style={ { background: 'none' } } size={this.state.sizebut}></Avatar>;
			case 'cancel':			return <div onClick={ () => this.wc() }><Avatar style={ { background: '#ebedf0' } } 		size={28}><Icon24Cancel 			fill="var(--white)" /></Avatar></div>;
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
			case 'sell_home':
				this.setState( { popout:
					<Alert actions={ [ { title: 'Продолжить', action: () => console.log( `Продажа недвижимости` ), autoclose: true, style: 'cancel' }, { title: 'Отмена', autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
						<h2>Продажа недвижимости</h2>
						<p>Вы действительно хотите продать выбранную недвижимость?</p>
					</Alert>
				} );
				break;
			case 'sell_job':
				this.setState( { popout:
					<Alert actions={ [ { title: 'Продолжить', action: () => console.log( `Продажа предприятия` ), autoclose: true, style: 'cancel' }, { title: 'Отмена', autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
						<h2>Продажа предприятия</h2>
						<p>Вы действительно хотите продать выбранное предприятие?</p>
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
					<Main 		id="main" 		state={this.state} go={this.go} dn={this.dn} icons={this.icons} apiupdate={this.apiupdate} wc={this.wc} />
					<Setting 	id="setting" 	state={this.state} go={this.go} dn={this.dn} icons={this.icons} />
					<Money 		id="money" 		state={this.state} go={this.go} dn={this.dn} icons={this.icons} />
					<Home 		id="home" 		state={this.state} go={this.go} dn={this.dn} icons={this.icons} />
					<HomeFrame	id="homeframe"	state={this.state} go={this.go} dn={this.dn} icons={this.icons} openSheet={this.openSheet} />
					<Job 		id="job" 		state={this.state} go={this.go} dn={this.dn} icons={this.icons} />
					<JobFrame	id="jobframe"	state={this.state} go={this.go} dn={this.dn} icons={this.icons} openSheet={this.openSheet} />
					<GameKN		id="kn"			state={this.state} go={this.go} dn={this.dn} icons={this.icons} openSheet={this.openSheet} apiupdate={this.apiupdate} kn={this.kn}/>
					<About		id="about" 		state={this.state} go={this.go} dn={this.dn} />
				</View>
			</Epic>
		);
	}
}

export default App;
