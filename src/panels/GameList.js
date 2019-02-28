import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

import KN from '../img/kn.png';

const osname = UI.platform();

const GameList = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>Игры</UI.PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
            <div>
                { !props.state.error ? (
                    <div>
                        <div className='balance'>
                            <UI.Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="#fff" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</UI.Button>
                        </div>
                        <UI.PullToRefresh onRefresh={ () => { props.apiq( "job2" ) } } isFetching={ props.state.fetching }>
                            <div>
                                { props.state.notifhide && 
                                    <UI.Group className="notif"> 
                                        <UI.List>
                                            <UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</UI.Cell>
                                        </UI.List>
                                    </UI.Group>
                                }
                                <UI.Group>
                                    <UI.List>
                                        <UI.Cell expandable onClick={  ( e ) => { props.go( e ); props.apiupdate( e ); } } data-type="kn" data-to="kn" multiline={true} before={ <UI.Avatar src={ KN } type="app" size={48} ></UI.Avatar> } description="10 ридия за выигрыш">Крестики-нолики</UI.Cell>
                                        <UI.Cell expandable onClick={  ( e ) => { props.go( e ); } } data-type="bj" data-to="bj" multiline={true} before={ <UI.Avatar type="app" size={48} ></UI.Avatar> } description="выигрыш зависит от ставки">Blackjack</UI.Cell>
                                    </UI.List>
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

export default GameList;
