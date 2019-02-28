import React from 'react';
import eruda from 'eruda';
import connect from '@vkontakte/vkui-connect';
import * as UI from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './style/style.css';

import Icon24Report from '@vkontakte/icons/dist/24/report';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon24Error from '@vkontakte/icons/dist/24/error';
import Icon24Replay from '@vkontakte/icons/dist/24/replay';
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
import GameList from './panels/GameList';
import GameKN from './panels/GameKN';
import GameBJ from './panels/GameBJ';
import About from './panels/About';

const osname = UI.platform();

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
			notif:		{ 'n':'', 'd':'', 'c':'' },		//Уведомление
			error:		false,					//Ошибка
			menu:		{},

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
			version:	'Beta 1.1, build 30',	//Версия сервиса
			contacts:	{},						//Список партнёров

			/* Раздел Blackjack */
			carduser:	[],
			cardbot:	[],
			opening:	false,
			botpoints:	0,
			userpoints:	0,		
			bjwin:		'n',

			/* Раздел Setting */
			debug:		false,
		};
		this.apiq		= this.apiq.bind(this);			//API
		this.apiupdate 	= this.apiupdate.bind(this);	//API
		this.kn 		= this.kn.bind(this);			//API К-Н
		this.openSheet 	= this.openSheet.bind(this);	//Всплывающие объекты
		this.wc			= this.wc.bind(this);			//Статус уведомления
		this.jf			= this.jf.bind(this);			//Просмотр предприятия
		this.cardadd	= this.cardadd.bind(this);		//Добавление карты
		this.debug		= this.debug.bind(this);		//Изменения дебага
	}
	
	//Переход на другой раздел
	go = (e) => {
		switch ( e.currentTarget.dataset.to ) {
			//Закрытый раздел
			case 'time':
				this.setState( { notifhide:true, notif:{ 'n':'Данный раздел временно недоступен', 'd':'', 'c':'' } } );
				return;
			case 'main': if ( !Object.keys(this.state.money).length ) { this.api( "main", "0", "{}"); } break;
			case 'about': if ( !Object.keys(this.state.contacts).length ) { this.api( "setting", "1", "{}"); } break;
			case 'job': if ( !Object.keys(this.state.joblist).length ) { this.api( "job", "1", "{}"); } break;
			case 'joblist': if ( !Object.keys(this.state.jobbuy).length ) { this.api( "job", "2", "{}"); } break;
			default:	break;
		}
		//Меняем раздел
		this.setState({ panel: e.currentTarget.dataset.to });
		
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
			switch ( section ) {
				case 'main':
					switch ( data.response.type ) {
						case '0':
							let menu 		= ( data.response.menu ) ? data.response.menu : {};
							let money 		= ( data.response.money ) ? data.response.money : {};
							if ( this.state.error ) {
								await this.setState( { 
									panel:	'main',
								 } );
							}
							await this.setState( {
								error:		false,
								menu:		menu,
								money:		money,
								load:		true,
								fetching:	false,
								notifhide: 	false,
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
								error:		false,
								menu:		menu,
								money:		money,
								contacts:	contacts,
								load:		true,
								fetching:	false,
								notifhide: 	false,
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
								error:		false,
								menu:		menu,
								money:		money,
								homelist:	homelist,
								load:		true,
								fetching:	false,
								notifhide: 	false,
							} );
							break;
						case '2':
							menu 	= ( data.response.menu ) ? data.response.menu : {};
							money 		= ( data.response.money ) ? data.response.money : {};
							let homebuy = ( data.response.homebuy ) ? data.response.homebuy : {};
							await this.setState( {
								error:		false,
								menu:		menu,
								money:		money,
								homebuy:	homebuy,
								load:		true,
								fetching:	false,
								notifhide: 	false,
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
								error:		false,
								menu:		menu,
								money:		money,
								joblist:	joblist,
								load:		true,
								fetching:	false,
								notifhide: 	false,
							} );
							break;
						case '2':
							menu 		= ( data.response.menu ) ? data.response.menu : {};
							money 		= ( data.response.money ) ? data.response.money : {};
							let jobbuy = ( data.response.jobbuy ) ? data.response.jobbuy : {};
							await this.setState( {
								error:		false,
								menu:		menu,
								money:		money,
								jobbuy:		jobbuy,
								load:		true,
								fetching:	false,
								notifhide: 	false,
							} );
							break;
						case '3': case '4':
							menu 		= ( data.response.menu ) ? data.response.menu : {};
							money 		= ( data.response.money ) ? data.response.money : {};
							joblist = ( data.response.joblist ) ? data.response.joblist : {};
							jobbuy = ( data.response.jobbuy ) ? data.response.jobbuy : {};
							window.history.back();
							let notif = { 'n':'', 'd':'' };
							if ( data.response.type === '3' ) notif = { 'n':'Поздравляем с покупкой нового предприятия!', 'd':'' };
							if ( data.response.type === '4' ) notif = { 'n':'Вы продали своё предприятие.', 'd':'' };
							await this.setState( {
								error:		false,
								menu:		menu,
								money:		money,
								joblist:	joblist,
								jobbuy:		jobbuy,
								load:		true,
								fetching:	false,
								notif:		notif,
								notifhide: 	true,
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
			if ( data.error.c === 'sign_00' || data.error.c === 'sign_01' || data.error.c === 'sign_02' ) {
				await this.setState( { error: true, } )
			}
			await this.setState ( {
				notif: 		data.error,
				notifhide: 	true,
				load: 		true,
			} );
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
			await this.setState ( {
				notif: 		data.error,
				notifhide: 	true,
				load: 		true,
			} );
		} else {
			console.log( 'Ошибка соединения.' );
		}
	}

	async apibj () {
		if ( !this.state.fetching ) { await this.setState( { load: false } ); }
		this.setState ( { 
			carduser:	[],
			cardbot:	[],
			opening:	false,
			load:		true,
			fetching:	false,
			notifhide: 	false,
			botpoints:	0,
			userpoints:	0,
			bjwin:		'n',
		} );
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
			case 'main': 	this.api( 'main', "0", {} ); break;
			default: 		this.api( 'main', "0", {} ); break;	
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
			case 'bj': 			this.apibj(); 						break;
			default: 												break;	
		}
	}

	cardadd = ( e ) => {
		switch ( e.currentTarget.dataset.type ) {
			case 'replay':
				this.apibj();
				break;
			case 'add':
				if ( this.state.bjwin === 'n' ) {
					let card = this.state.carduser;
					let cardbot = this.state.cardbot;
					let botpoints = this.state.botpoints;
					let userpoints = this.state.userpoints;
					let name = ["card_s", "card_h", "card_c", "card_d"];
					let name2 = [ "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "s", "d", "f" ];
					let coin = { '2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'0':10,'a':10,'s':10,'d':10,'f':11 };
					let randname = Math.floor(Math.random() * name.length);
					let randname2 = Math.floor(Math.random() * name2.length);
					let randname22 = Math.floor(Math.random() * name.length);
					let randname222 = Math.floor(Math.random() * name2.length);

					if ( !this.state.opening ) {
						if ( Object.keys(cardbot).length < 2 ) {
							let randnameb = Math.floor(Math.random() * name.length);
							let randname2b = Math.floor(Math.random() * name2.length);
							let randnameb2 = Math.floor(Math.random() * name.length);
							let randname2b2 = Math.floor(Math.random() * name2.length);
							cardbot[Object.keys(cardbot).length] = { 'name':name[randnameb], 'name2':name2[randname2b] };
							cardbot[Object.keys(cardbot).length] = { 'name':name[randnameb2], 'name2':name2[randname2b2] };
							botpoints = botpoints + coin[name2[randname2b]] + coin[name2[randname2b2]];
							this.setState( { cardbot:cardbot, botpoints:botpoints } );
						}
		
						if ( Object.keys(card).length < 9 ) {
							if ( Object.keys(card).length < 2 ) {
								card[Object.keys(card).length] = { 'name':name[randname], 'name2':name2[randname2] };
								card[Object.keys(card).length] = { 'name':name[randname22], 'name2':name2[randname222] };
								userpoints = userpoints + coin[name2[randname2]] + coin[name2[randname222]];
							} else {
								card[Object.keys(card).length] = { 'name':name[randname], 'name2':name2[randname2] };
								userpoints = userpoints + coin[name2[randname2]];
							}
							this.setState( { carduser:card, userpoints:userpoints } );
						} else {
							this.setState( {
								notif: 		{ 'n':'Вы взяли максимальное количество карт', 'd':'', 'c':'' },
								notifhide: 	true,
							} );
						}
						if ( userpoints > '21' ) {
							let bjwin = 'n';
							if ( userpoints === botpoints || botpoints > '21'  ) bjwin = 's';

							if ( botpoints <= '21' ) bjwin = 'b';
							this.setState( { 
								opening:	true,
								bjwin: 		bjwin,
							} );
						}
						if ( userpoints === '21' ) {
							let bjwin = 'n';
							if ( userpoints === botpoints ) bjwin = 's';
							if ( userpoints > botpoints ) bjwin = 'u';
							if ( botpoints > userpoints ) bjwin = 'u';
							this.setState( { 
								opening:	true,
								bjwin: 		bjwin,
							} );
						}
					}
				}
				break;
			case 'open':
				let bjwin = 'n';
				let user = this.state.userpoints;
				let bot = this.state.botpoints;
				if ( user === bot ) bjwin = 's';
				if ( user > bot && user <= '21' ) bjwin = 'u';
				if ( bot > user && bot <= '21' ) bjwin = 'b';
				this.setState( { opening:true, bjwin:bjwin } );
				break;
			default: 	break;
		}
	}

	//Debug
	debug = ( e ) => {
		let a = e.currentTarget.checked;
		if (a) {
			let el = document.createElement('div');
			document.body.appendChild(el);

			this.setState( { debug:true } );
			eruda.init({
				container: el,
				tool: ['console', 'elements'],
				useShadowDom: true,
				autoScale: true
			});
		} else {
			this.setState( { debug:false } );
			eruda.destroy();
		}
	}

	//Включение сервиса
	componentDidMount() {
		window.addEventListener('popstate', e => e.preventDefault() & this.Pop(e));
		window.history.pushState( { panel: 'main' }, `main` );
		this.api( 'main', '0', {});
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ user: e.detail.data });
					break;
				default:
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	//Готовые иконки
	icons ( name ) {
		switch ( name ) {
			case 'bankmoney':		return <UI.Avatar style={ { background: '#4BB34B' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></UI.Avatar>;
			case 'bankmoneyempty':	return <UI.Avatar style={ { background: '#FFA000' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></UI.Avatar>;
			case 'empty':			return <UI.Avatar style={ { background: '#FFA000' } } size={48}><Icon24Error fill="var(--white)" /></UI.Avatar>;
			case 'n': 	case 's':	return <UI.Avatar style={ { background: 'none' } } 	size={this.state.sizebut}></UI.Avatar>;
			case 'u':				return <UI.Avatar src={ CrossBot } style={ { background: 'none' } } size={this.state.sizebut}></UI.Avatar>;
			case 'b':				return <UI.Avatar src={ CircleBot } style={ { background: 'none' } } size={this.state.sizebut}></UI.Avatar>;
			case 'cancel':			return <div onClick={ () => this.wc() }><UI.Avatar style={ { background: '#ebedf0' } } 		size={28}><Icon24Cancel 			fill="var(--white)" /></UI.Avatar></div>;
			case 'start':			return <div onClick={ ( e ) => this.apiupdate( e ) } data-type="main" ><UI.Avatar style={ { background: '#ebedf0' } } 		size={28}><Icon24Replay 			fill="var(--white)" /></UI.Avatar></div>;
			default: 				return <UI.Avatar style={ { background: 'var(--destructive)' } } 		size={28}><Icon24Report 			fill="var(--white)" /></UI.Avatar>;
		}
	};

	//Всплывающие окна
	openSheet = ( e ) => {
		switch ( e.currentTarget.dataset.notifs ) {
			case 'knnew':
			this.setState( { popout:
				<UI.Alert actions={ [ { title: 'Отмена', autoclose: true, style: 'cancel' }, { title: 'Продолжить', action: () => this.apikn( '2', {} ), autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
					<h2>Новая игра</h2>
					<p>Если вы начнёте новую игру, вам будет засчитано поражение.</p>
				</UI.Alert>
			} );
				break;
			case 'sell_home':
				this.setState( { popout:
					<UI.Alert actions={ [ { title: 'Отмена', autoclose: true, style: 'cancel' }, { title: 'Продолжить', action: () => console.log( `Продажа недвижимости` ), autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
						<h2>Продажа недвижимости</h2>
						<p>Вы действительно хотите продать выбранную недвижимость?</p>
					</UI.Alert>
				} );
				break;
			case 'buy_job':
				let job = e.currentTarget.dataset.job;
				this.setState( { popout:
					<UI.Alert actions={ [ { title: 'Отмена', autoclose: true, style: 'cancel' }, { title: 'Продолжить', action: () => this.api( 'job', '3', {'id':job} ), autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
						<h2>Покупка предприятия</h2>
						<p>Вы действительно хотите купить новое предприятие за { this.nl(this.state.joblast.money) + this.dn( this.state.joblast.money, moneyname['1'] ) } ?</p>
					</UI.Alert>
				} );
				break;
			case 'sell_job':
				job = e.currentTarget.dataset.job;
				this.setState( { popout:
					<UI.Alert actions={ [ { title: 'Отмена', autoclose: true, style: 'cancel' }, { title: 'Продолжить', action: () => this.api( 'job', '4', {'id':job} ), autoclose: true, style: 'cancel' } ] } onClose={ () => this.setState( { popout: null } ) } >
						<h2>Продажа предприятия</h2>
						<p>Вы действительно хотите продать выбранное предприятие за { this.nl(this.state.joblast.money_sell) + this.dn( this.state.joblast.money, moneyname['1'] ) } ?</p>
					</UI.Alert>
				} );
				break;
			default: 
				this.setState( { popout:
					<UI.ActionSheet onClose={ () => this.setState( { popout: null } ) } title="Ошибка" text="Неизвестный источник вызова">
						{ osname === UI.IOS && <UI.ActionSheetItem autoclose theme="cancel">Отмена</UI.ActionSheetItem> }
					</UI.ActionSheet>
				} );
				break;
		}
	}

	render() {
		return (
			<UI.Epic activeStory="home" tabbar={false}>
				<UI.View popout={ this.state.popout } id="home" activePanel={this.state.panel}>		
					<Main 		id="main" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} />
					<Money 		id="money" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} />
					<Home 		id="home" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} />
					<HomeFrame	id="homeframe"	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} openSheet={this.openSheet} />
					<Job 		id="job" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} jf={this.jf} />
					<JobList	id="joblist"	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} openSheet={this.openSheet} jf={this.jf} />
					<JobFrame	id="jobframe"	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} openSheet={this.openSheet} />
					<GameList	id="gamelist" 	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl}	icons={this.icons} wc={this.wc}	apiupdate={this.apiupdate}  />
					<GameKN		id="kn"			state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} openSheet={this.openSheet} kn={this.kn}/>
					<GameBJ		id="bj"			state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} openSheet={this.openSheet} cardadd={this.cardadd} />
					<Setting 	id="setting" 	state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl} icons={this.icons} wc={this.wc} apiupdate={this.apiupdate} debug={this.debug} />
					<About		id="about" 		state={this.state} setState={this.setState} apiq={this.apiq} go={this.go} dn={this.dn} nl={this.nl}	icons={this.icons} wc={this.wc}	apiupdate={this.apiupdate}  />
				</UI.View>
			</UI.Epic>
		);
	}
}

export default App;
