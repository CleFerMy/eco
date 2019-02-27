import React from 'react';
import { Panel, PanelHeader, Button, HeaderButton, IOS, platform, Avatar, Group, List, Cell, Spinner, Footer, PullToRefresh } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const osname = platform();

const moneyname = [[" ридий"," ридия"," ридия"],[" неунум"," неунума"," неунума"]];

const Money = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Баланс</PanelHeader>
        <div className="header"><div className="hleft"></div><div className="hright"></div></div>
        { props.state.load ? (
            <div>
                { !props.state.error ? (
                    <div>
                        <div className='balance'>
                            <Button before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</Button>
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
                                <Group title="Основной счёт">
                                    <List>
                                        <Cell multiline={true} before={ <Avatar style={ { background: '#4BB34B' } } size={48}><Icon24Coins fill="var(--white)" /></Avatar> } description={ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) + props.dn( props.state.money.c1,[ ' единица',' единицы',' единиц' ] ) ) : 'Неизвестно' }>Ридий</Cell>
                                        <Cell multiline={true} before={<CircularProgressbar className="moneyitem" percentage={props.state.money.c2/2} text={props.state.money.c2} background styles={ { background: { fill: '#0a4761' }, path: { stroke: 'white' }, text: { fill: 'white', fontSize: '16px' }, trail: { stroke: 'transparent' } } } />} description={ `${ props.state.money.c2 ? ( `Занято ` + props.nl( props.state.money.c2 ) + props.dn( props.state.money.c2,[ ' единица',' единицы',' единиц' ] ) + ` из 1000 ` ) : 'Неизвестно' }`}>Неунум</Cell>
                                    </List>
                                </Group>
                                <Group title="Счета в банках">
                                    { Object.keys(props.state.bankmoney).length > 0 ? (
                                        <List>
                                            { props.state.contacts.map( (list, i) => <Cell key={i} multiline={true} before={ <Avatar src={ list.money > 0 ? ( 'bankmoney' ) : ( 'bankmoneyempty' ) }/> } description={ list.money > 0 ? ( list.money + props.dn( list.money, moneyname[list.name] ) ) : ( 'Пусто' ) }>{ 'Счёт #' + list.id }</Cell> ) }
                                        </List>
                                    ) : (
                                        <List>
                                            <Cell multiline={true} before={ props.icons( 'empty' ) } >У вас нет ни одного счёта</Cell>
                                        </List>
                                    ) }
                                </Group>
                            </div>
                        </PullToRefresh>
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
	</Panel>
);

export default Money;
