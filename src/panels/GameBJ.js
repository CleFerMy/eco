import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Replay from '@vkontakte/icons/dist/24/replay';
import Icon24Search from '@vkontakte/icons/dist/24/search';

import Hidden from '../img/s.png';
import '../style/bj.css';
import card_h from '../img/h.svg';
import card_d from '../img/d.svg';
import card_c from '../img/c.svg';
import card_s from '../img/s.svg';

const card = { 'card_h':card_h, 'card_d':card_d, 'card_c':card_c, 'card_s':card_s };
const winner = { 'n':'', 's':'Ничья', 'u':'Вы победили', 'b':'Победил дилер' };

const osname = UI.platform();

const BJ = props => (
    <UI.Panel id={ props.id }>
        <UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>Blackjack</UI.PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
            <div>
                { !props.state.error ? (
                    <div>
                        <div className='balance'>
                            <UI.Button style={ { background: "rgba(0,0,0,0.2)", color: "#ffc800" } } onClick={ props.go } data-to="money" before={ <Icon24Coins fill="#ffc800" /> }>{ props.state.money.c2 ? ( props.state.money.c2 ) : 'Неизвестно' }</UI.Button>
                        </div>
                            { props.state.notifhide && 
                                <UI.Group className="notif"> 
                                    <UI.List>
                                        <UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</UI.Cell>
                                    </UI.List>
                                </UI.Group>
                            }
                            <div className="bj_body">
                                <div>
                                    { Object.keys(props.state.cardbot).length > 0 ? (
                                        <div className="card_bot">
                                            { props.state.cardbot.map( (list, i) => 
                                                <div key={i} className={ `card ${ i === 1 && props.state.opening ? ` unlocked` : `` }` }>
                                                    <div className="back">
                                                        <div className={ list.name + ` name` }>{ list.name2 }</div>
                                                        <div className="icon"><img src={ card[list.name] } alt="icon"></img></div>
                                                    </div>
                                                    <div className="front">
                                                        <div className="icon"><img src={ Hidden } alt="icon"></img></div>
                                                    </div>
                                                </div>
                                            ) }
                                        </div>
                                    ) : (
                                        <div className="card_bot">
                                            <div className="cardempty" ></div>
                                        </div>
                                    ) }
                                </div>
                                <div>
                                    { Object.keys(props.state.carduser).length > 0 ? (
                                        <div className="card_user">
                                            { props.state.carduser.map( (list, i) => 
                                                <div key={i} className="card" >
                                                    <div className="back">
                                                        <div className={ list.name + ` name` }>{ list.name2 }</div>
                                                        <div className="icon"><img src={ card[list.name] } alt="icon"></img></div>
                                                    </div>
                                                    <div className="front">
                                                        <div className="icon"><img src={ Hidden } alt="icon"></img></div>
                                                    </div>
                                                </div> 
                                            ) }
                                        </div>
                                    ) : (
                                        <div className="card_user">
                                            <div className="cardempty" ></div>
                                        </div>
                                    ) }
                                </div>
                            </div>
                        { props.state.opening && <div className="panelbot"><div className="balancebot">{ props.state.botpoints }</div></div> }
                        { props.state.bjwin !== 'n' && <div className="winner"><div className="winner_win">{ winner[props.state.bjwin] }</div></div> }
                        { props.state.userpoints > 0 && <div className="paneluser"><div className="balanceuser">{ props.state.userpoints }</div></div> }
                        { Object.keys(props.state.cardbot).length > 1 && !props.state.opening &&
                            <div className='mopen'>
                                <div onClick={ ( e ) => props.cardadd( e ) } data-type="open" ><UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Search fill="#fff" /></UI.Avatar></div>
                            </div>
                        }
                        <div className='madd'>
                            <div onClick={ ( e ) => props.cardadd( e ) } data-type="add" ><UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Add fill="#fff" /></UI.Avatar></div>
                        </div>
                        <div className="mreplay">
                            <div onClick={ ( e ) => props.cardadd( e ) } data-type="replay" ><UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Replay fill="#fff" /></UI.Avatar></div>
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

export default BJ;