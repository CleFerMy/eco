import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const Main = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } >{ props.state.fetching || !props.state.load ? ('Обновление') : ('Eco') }</UI.PanelHeader>
		<div className="hleft"></div><div className="hright"></div>
			{ props.state.load ? (
				<div>
					{ !props.state.error ? (
						<div>
							<div className='mbalance'>
								<UI.Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="#fff" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</UI.Button>
							</div>
							<UI.PullToRefresh onRefresh={ () => { props.apiq( "main0" ) } } isFetching={ props.state.fetching }>
								<div>
									{ props.state.notifhide && 
										<UI.Group className="notif"> 
											<UI.List>
												<UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</UI.Cell>
											</UI.List>
										</UI.Group>
									}
									{ Object.keys(props.state.menu).lenght > 0 }
									<div className="menu">
										<UI.HorizontalScroll className="menuscroll">
											<div className="statslist">
												<div onClick={ props.go } data-to="home" className="statsitem stats_home"><span className="statsspan">Дом</span><div className="statsitemdesc">{ props.state.menu[0] ? ( props.state.menu[0] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="time" className="statsitem stats_bank"><span className="statsspan">Банк</span><div className="statsitemdesc">{ props.state.menu[1] ? ( props.state.menu[1] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="time" className="statsitem stats_shop"><span className="statsspan">Магазин</span><div className="statsitemdesc">{ props.state.menu[2] ? ( props.state.menu[2] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="job" className="statsitem stats_job"><span className="statsspan">Работа</span><div className="statsitemdesc">{ props.state.menu[3] ? ( props.state.menu[3] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="gamelist" className="statsitem stats_game"><span className="statsspan">Игры</span><div className="statsitemdesc">Быстрые деньги</div></div>
											</div>
										</UI.HorizontalScroll>
									</div>
								</div>
							</UI.PullToRefresh>
							<div className='msetting'>
								<div onClick={ props.go } data-to="setting" ><UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></UI.Avatar></div>
							</div>
						</div>
					) : (
						<div>
							{ props.state.notifhide && 
								<UI.Group className="notif"> 
									<UI.List>
										<UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `start` ) }>{ props.state.notif.n }</UI.Cell>
									</UI.List>
								</UI.Group>
							}
						</div>
					) }
				</div>
			) : (
				<div>
					<UI.Spinner size="large" style={{ marginTop: 25 }} />
					<UI.Footer>Загрузка...</UI.Footer>
				</div>
			) }
	</UI.Panel>
);

export default Main;
