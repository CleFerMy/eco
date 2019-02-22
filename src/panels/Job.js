import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button, Spinner, Footer, PullToRefresh } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Home from '@vkontakte/icons/dist/24/home';

const osname = platform();

const moneyname = [[" ридий"," ридия"," ридия"],[" неунум"," неунума"," неунума"]];

const Job = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Работа</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        <PullToRefresh onRefresh={ () => { props.apiq( "job1" ) } } isFetching={ props.state.fetching }>
            { props.state.load ? (
                <div>
                    { !props.state.error ? (
						<div>
                            { props.state.notifhide && 
                                <Group className="notif"> 
                                    <List>
                                        <Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</Cell>
                                    </List>
                                </Group>
                            }
                            <div className='balance'>
                                <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</Button>
                            </div>
                            <Div>
                                <Button onClick={ props.go } data-to="joblist" before={ <Icon28AddOutline fill="var(--white)" /> } size="xl">Приобрести</Button>
                            </Div>
                            <Group title="Предприятия">
                                { Object.keys(props.state.joblist).length > 0 ? (
                                    <List>
                                        { props.state.joblist.map( (list, i) => <Cell expandable key={i} onClick={ (e) => {props.go(e); props.jf(list)} } data-to="jobframe" data-jf="list" multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={48} ><Icon24Home /></Avatar> } description={ `Прибыль: ` + props.nl( list.des ) + props.dn( list.des, moneyname[ list.coin ] ) + ` в час` }>{ list.name }</Cell> ) }
                                    </List>
                                ) : (
                                    <List>
                                        <Cell multiline={true} before={ props.icons( 'empty' ) } >У вас нет ни одного предприятия</Cell>
                                    </List>
                                ) }
                            </Group>
                            <div className='setting'>
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
        </PullToRefresh>
	</Panel>
);

export default Job;
