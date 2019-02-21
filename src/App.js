import React from 'react';
import connect from '@vkontakte/vkui-connect';
import { Epic, View, Avatar, Alert, ActionSheet, ActionSheetItem, IOS, platform } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style/style.css';

import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import CircleBot from './img/circle.svg';
import CrossBot from './img/cross.svg';

import Main from './panels/Main';
import Setting from './panels/Setting';
import Money from './panels/Money';
import Home from './panels/Home';
import HomeFrame from './panels/HomeFrame';
import Job from './panels/Job';
import JobFrame from './panels/JobFrame';
import JobList from './panels/JobList';
import GameKN from './panels/GameKN';
import About from './panels/About';

const osname = platform();

const moneyname = [[" ридий"," ридия"," ридия"],[" неунум"," неунума"," неунума"]];

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
			fetching:	false,					//Пулл спиннер

			/* Игровое глобальное */
			money: 		{},						//Деньги

			/* Крестики-нолики */
			kn: 		{},						//Информация о игре
			kndisabled: false,					//Статус кнопок
			sizekn:		24,						//Размер игрового поля

			/* Раздел Money */
			bankmoney:	{},						//Счета в банке

			/* Раздел Home */
			family:		{},						//Семья
			homelist:	{},						//Список домов
			regionlist:	{},						//Список земельных участков
			autolist:	{},						//Список автомобилей
			homebuy:	{},						//Список домов
			regionbuy:	{},						//Список земельных участков
			autobuy:	{},						//Список автомобилей

			/* Раздел Job */
			joblist:	{},						//Список предприятий
			jobbuy:		{},						//Список предприятий для покупки
			joblast:	{},						//Последний просмотр

			/* Раздел About */
			version:	'Beta 1.1, build 13',	//Версия сервиса
			contacts:	{},						//Список партнёров

			/* Раздел Setting */
			//Пусто
		};
		this.apiq		= this.apiq.bind(this);			//API
		this.apiupdate 	= this.apiupdate.bind(this);	//API
		this.kn 		= this.kn.bind(this);			//API К-Н
		this.openSheet 	= this.openSheet.bind(this);	//Всплывающие объекты
		this.wc			= this.wc.bind(this);			//Статус уведомления
		this.jf			= this.jf.bind(this);			//Просмотр предприятия
	}
	
	//Переход на другой раздел
	go = (e) => {
		switch ( e.currentTarget.dataset.to ) {
			//Закрытый раздел
			case 'time':
				this.setState( { notifhide:true } );
				return;
			case 'about': if ( !Object.keys(this.state.contacts).length ) { this.api( "setting", "1", "{}"); } break;
			case 'job': if ( !Object.keys(this.state.joblist).length ) { this.api( "job", "1", "{}"); } break;
			case 'joblist': if ( !Object.keys(this.state.jobbuy).length ) { this.api( "job", "2", "{}"); } break;
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
	//Деление нулями
	nl (n) { return n.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '); }
	//Просмотр предприятия
	jf ( e ) { this.setState( { joblast:e } ); }

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
		if ( !this.state.fetching ) { await this.setState( { load: false } ); }
		let res 	= await fetch( `https://clefer.ru/eco/${section}.php?method=${method}&${JSON.stringify(params).replace('{', '').replace('}', '').replace(/"/g, '').replace(/:/g, '=').replace(/,/g, '&')}&${window.location.search.replace( '?', '')}` );
		let data 	= await res.json();
		if ( data.response ) {
			console.log(data.response);
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
								fetching:	false,
							} );
							break;
						default:	break;
					}
					break;
				case 'setting':
					switch ( data.response.type ) {
						case '1':
							let menu 		= ( data.response.menu ) ? data.response.menu : {};
							let money 		= ( data.response.money ) ? data.response.money : {};
							let contacts 	= ( data.response.contacts ) ? data.response.contacts : {};
							await this.setState( {
								menu:		menu,
								money:		money,
								contacts:	contacts,
								load:		true,
								fetching:	false,
							} );
							break;
						default:	break;
					}
					break;
				case 'home':
					switch ( data.response.type ) {
						case '1':
							let menu 		= ( data.response.menu ) ? data.response.menu : {};
							let money 		= ( data.response.money ) ? data.response.money : {};
							let homelist = ( data.response.homelist ) ? data.response.homelist : {};
							await this.setState( {
								menu:		menu,
								money:		money,
								homelist:	homelist,
								load:		true,
								fetching:	false,
							} );
							break;
						case '2':
							menu 	= ( data.response.menu ) ? data.response.menu : {};
							money 		= ( data.response.money ) ? data.response.money : {};
							let homebuy = ( data.response.homebuy ) ? data.response.homebuy : {};
							await this.setState( {
								menu:		menu,
								money:		money,
								homebuy:	homebuy,
								load:		true,
								fetching:	false,
							} );
							break;
						default:	break;
					}
					break;
				case 'job':
					switch ( data.response.type ) {
						case '1':
							let menu 		= ( data.response.menu ) ? data.response.menu : {};
							let money 		= ( data.response.money ) ? data.response.money : {};
							let joblist = ( data.response.joblist ) ? data.response.joblist : {};
							await this.setState( {
								menu:		menu,
								money:		money,
								joblist:	joblist,
								load:		true,
								fetching:	false,
							} );
							break;
						case '2':
							menu 		= ( data.response.menu ) ? data.response.menu : {};
							money 		= ( data.response.money ) ? data.response.money : {};
							let jobbuy = ( data.response.jobbuy ) ? data.response.jobbuy : {};
							await this.setState( {
								menu:		menu,
								money:		money,
								jobbuy:		jobbuy,
								load:		true,
								fetching:	false,
							} );
							break;
						case '3': case '4':
							menu 		= ( data.response.menu ) ? data.response.menu : {};
							money 		= ( data.response.money ) ? data.response.money : {};
							joblist = ( data.response.joblist ) ? data.response.joblist : {};
							jobbuy = ( data.response.jobbuy ) ? data.response.jobbuy : {};
							await this.setState( {
								menu:		menu,
								money:		money,
								joblist:	joblist,
								jobbuy:		jobbuy,
								load:		true,
								fetching:	false,
							} );
							break;
						default:	break;
					}
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

	//Обычное обновление
	apiq = ( e ) => {
		this.setState( { fetching:true } );
		switch ( e ) {
			case 'main0': 		this.api( 'main', '0', {} ); 		break;
			case 'setting1': 	this.api( 'setting', '1', {} );		break;
			case 'home1': 		this.api( 'home', '1', {} ); 		break;
			case 'home2': 		this.api( 'home', '2', {} ); 		break;
			case 'job1': 		this.api( 'job', '1', {} ); 		break;
			case 'job2': 		this.api( 'job', '2', {} ); 		break;
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
					this.api( 'main', '0', {});
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
			case 'empty':			return <Avatar style={ { background: '#FFA000' } } size={48}><Icon24Error fill="var(--white)" /></Avatar>;
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
			case 'buy_job':
				let job = e.currentTarget.dataset.job;
				this.setState( { popout:
					<Alert actions={ [ { title: 'Продолжить', action: () => this.api( 'job', '3', {'id':job} ), autoclose: true, style: 'cancel' }, { title: 'Отмена', autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
						<h2>Покупка предприятия</h2>
						<p>Вы действительно хотите купить новое предприятие за { this.nl(this.state.joblast.money) + this.dn( this.state.joblast.money, moneyname['1'] ) } ?</p>
					</Alert>
				} );
				break;
			case 'sell_job':
				job = e.currentTarget.dataset.job;
				this.setState( { popout:
					<Alert actions={ [ { title: 'Продолжить', action: () => this.api( 'job', '4', {'id':job} ), autoclose: true, style: 'cancel' }, { title: 'Отмена', autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
						<h2>Продажа предприятия</h2>
						<p>Вы действительно хотите продать выбранное предприятие за { this.nl(this.state.joblast.money_sell) + this.dn( this.state.joblast.money, moneyname['1'] ) } ?</p>
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
					<Main 		id="main" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} apiupdate={this.apiupdate} wc={this.wc} />
					<Setting 	id="setting" 	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} />
					<Money 		id="money" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} />
					<Home 		id="home" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} />
					<HomeFrame	id="homeframe"	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} openSheet={this.openSheet} />
					<Job 		id="job" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} jf={this.jf} />
					<JobList	id="joblist"	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} openSheet={this.openSheet} jf={this.jf} />
					<JobFrame	id="jobframe"	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} openSheet={this.openSheet} />
					<GameKN		id="kn"			state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} openSheet={this.openSheet} apiupdate={this.apiupdate} kn={this.kn}/>
					<About		id="about" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} />
				</View>
			</Epic>
		);
	}
}

export default App;
