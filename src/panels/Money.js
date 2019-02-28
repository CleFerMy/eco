import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const osname = UI.platform();

const moneyname = [[" ридий"," ридия"," ридия"],[" неунум"," неунума"," неунума"]];

const Money = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>Баланс</UI.PanelHeader>
        <div className="header"><div className="hleft"></div><div className="hright"></div></div>
        { props.state.load ? (
            <div>
                { !props.state.error ? (
                    <div>
                        <div className='balance'>
                            <UI.Button before={ <Icon24Coins fill="#fff" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</UI.Button>
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
                                <UI.Group title="Основной счёт">
                                    <UI.List>
                                        <UI.Cell multiline={true} before={ <UI.Avatar style={ { background: '#4BB34B' } } size={48}><Icon24Coins fill="" /></UI.Avatar> } description={ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) + props.dn( props.state.money.c1,[ ' единица',' единицы',' единиц' ] ) ) : 'Неизвестно' }>Ридий</UI.Cell>
                                        <UI.Cell multiline={true} before={<CircularProgressbar className="moneyitem" percentage={props.state.money.c2/2} text={props.state.money.c2} background styles={ { background: { fill: '#0a4761' }, path: { stroke: 'white' }, text: { fill: 'white', fontSize: '16px' }, trail: { stroke: 'transparent' } } } />} description={ `${ props.state.money.c2 ? ( `Занято ` + props.nl( props.state.money.c2 ) + props.dn( props.state.money.c2,[ ' единица',' единицы',' единиц' ] ) + ` из 1000 ` ) : 'Неизвестно' }`}>Неунум</UI.Cell>
                                    </UI.List>
                                </UI.Group>
                                <UI.Group title="Счета в банках">
                                    { Object.keys(props.state.bankmoney).length > 0 ? (
                                        <UI.List>
                                            { props.state.contacts.map( (list, i) => <UI.Cell key={i} multiline={true} before={ <UI.Avatar src={ list.money > 0 ? ( 'bankmoney' ) : ( 'bankmoneyempty' ) }/> } description={ list.money > 0 ? ( list.money + props.dn( list.money, moneyname[list.name] ) ) : ( 'Пусто' ) }>{ 'Счёт #' + list.id }</UI.Cell> ) }
                                        </UI.List>
                                    ) : (
                                        <UI.List>
                                            <UI.Cell multiline={true} before={ props.icons( 'empty' ) } >У вас нет ни одного счёта</UI.Cell>
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

export default Money;
