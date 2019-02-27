import React from 'react';
import { Panel, PanelHeader, HorizontalScroll, Button, Avatar, Group, List, Cell, Spinner, Footer, PullToRefresh } from '@vkontakte/vkui';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const Main = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } >{ props.state.fetching || !props.state.load ? ('Обновление') : ('Eco') }</PanelHeader>
		<div className="hleft"></div><div className="hright"></div>
			{ props.state.load ? (
				<div>
					{ !props.state.error ? (
						<div>
							<div className='mbalance'>
								<Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</Button>
							</div>
							<PullToRefresh onRefresh={ () => { props.apiq( "main0" ) } } isFetching={ props.state.fetching }>
								<div>
									{ props.state.notifhide && 
										<Group className="notif"> 
											<List>
												<Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</Cell>
											</List>
										</Group>
									}
									{ Object.keys(props.state.menu).lenght > 0 }
									<div className="menu">
										<HorizontalScroll className="menuscroll">
											<div className="statslist">
												<div onClick={ props.go } data-to="home" className="statsitem stats_home"><span className="statsspan">Дом</span><div className="statsitemdesc">{ props.state.menu[0] ? ( props.state.menu[0] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="time" className="statsitem stats_bank"><span className="statsspan">Банк</span><div className="statsitemdesc">{ props.state.menu[1] ? ( props.state.menu[1] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="time" className="statsitem stats_shop"><span className="statsspan">Магазин</span><div className="statsitemdesc">{ props.state.menu[2] ? ( props.state.menu[2] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="job" className="statsitem stats_job"><span className="statsspan">Работа</span><div className="statsitemdesc">{ props.state.menu[3] ? ( props.state.menu[3] ) : ( `Неизвестно` ) }</div></div>
												<div onClick={ props.go } data-to="gamelist" className="statsitem stats_game"><span className="statsspan">Игры</span><div className="statsitemdesc">Быстрые деньги</div></div>
											</div>
										</HorizontalScroll>
									</div>
								</div>
							</PullToRefresh>
							<div className='msetting'>
								<div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
							</div>
						</div>
					) : (
						<div>
							{ props.state.notifhide && 
								<Group className="notif"> 
									<List>
										<Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `start` ) }>{ props.state.notif.n }</Cell>
									</List>
								</Group>
							}
						</div>
					) }
				</div>
			) : (
				<div>
					<Spinner size="large" style={{ marginTop: 25 }} />
					<Footer>Загрузка...</Footer>
				</div>
			) }
	</Panel>
);

export default Main;
