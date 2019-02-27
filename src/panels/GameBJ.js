import React from 'react';
import { Panel, PanelHeader, HeaderButton, platform, IOS, Group, Footer, Button, Avatar, List, Cell, Spinner } from '@vkontakte/vkui';
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

const osname = platform();

//const win = {'u':'выиграли. На ваш счёт зачислено 10 ридия.','b':'проиграли. С вашего счёта списано 10 ридия.','n':'сыграли в ничью. Вы сохранили свой счёт.'};

const BJ = props => (
    <Panel id={ props.id }>
        <PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Blackjack</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
            <div>
                { !props.state.error ? (
                    <div>
                        <div className='balance'>
                            <Button style={ { background: "rgba(0,0,0,0.2)", color: "#ffc800" } } onClick={ props.go } data-to="money" before={ <Icon24Coins fill="#ffc800" /> }>{ props.state.money.c2 ? ( props.state.money.c2 ) : 'Неизвестно' }</Button>
                        </div>
                            { props.state.notifhide && 
                                <Group className="notif"> 
                                    <List>
                                        <Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</Cell>
                                    </List>
                                </Group>
                            }
                            <div className="bj_body">
                                <div>
                                    { Object.keys(props.state.cardbot).length > 0 ? (
                                        <div className="card_bot">
                                            { props.state.cardbot.map( (list, i) => 
                                                <div key={i} className={ `card ${ i === 0 && props.state.opening ? ` unlocked` : `` }` }>
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
                        { props.state.userpoints > 0 && <div className="paneluser"><div className="balanceuser">{ props.state.userpoints }</div></div> }
                        { Object.keys(props.state.cardbot).length > 1 && !props.state.opening &&
                            <div className='mopen'>
                                <div onClick={ ( e ) => props.cardadd( e ) } data-type="open" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Search fill="var(--white)" /></Avatar></div>
                            </div>
                        }
                        <div className='madd'>
                            <div onClick={ ( e ) => props.cardadd( e ) } data-type="add" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Add fill="var(--white)" /></Avatar></div>
                        </div>
                        <div className="mreplay">
                            <div onClick={ ( e ) => props.cardadd( e ) } data-type="replay" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Replay fill="var(--white)" /></Avatar></div>
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

export default BJ;