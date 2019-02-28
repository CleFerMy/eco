import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Home from '@vkontakte/icons/dist/24/home';

const osname = UI.platform();

const HomeList = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>Работа</UI.PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
            { props.state.load ? (
                <div>
                    { !props.state.error ? (
						<div>
                            <div className='balance'>
                                <UI.Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</UI.Button>
                            </div>
                            <UI.PullToRefresh onRefresh={ () => { props.apiq( "home2" ) } } isFetching={ props.state.fetching }>
                                <div>
                                    { props.state.notifhide && 
                                        <UI.Group className="notif"> 
                                            <UI.List>
                                                <UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</UI.Cell>
                                            </UI.List>
                                        </UI.Group>
                                    }
                                    <div className='balance'>
                                        <UI.Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</UI.Button>
                                    </div>
                                    <UI.Group title="Предприятия">
                                        { Object.keys(props.state.jobbuy).length > 0 ? (
                                            <UI.List>
                                                { props.state.jobbuy.map( (list, i) => <UI.Cell expandable key={i} onClick={ props.go } data-to="jobframe" multiline={true} before={ <UI.Avatar type="app" style={ { background: 'none' } } size={48} ><Icon24Home /></UI.Avatar> } description={ list.des }>{ list.name }</UI.Cell> ) }
                                            </UI.List>
                                        ) : (
                                            <UI.List>
                                                <UI.Cell multiline={true} before={ props.icons( 'empty' ) } >Нет доступных для покупки домов</UI.Cell>
                                            </UI.List>
                                        ) }
                                    </UI.Group>
                                </div>
                            </UI.PullToRefresh>
                            <div className='setting'>
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

export default HomeList;
