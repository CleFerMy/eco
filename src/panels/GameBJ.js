import React from 'react';
import { Panel, PanelHeader, HeaderButton, platform, IOS, Group, Footer, Button, Avatar, List, Cell, Spinner, PullToRefresh } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Add from '@vkontakte/icons/dist/24/add';

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
        <div className='balance'>
            <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.state.money.c1 ) : 'Неизвестно' }</Button>
        </div>
        <PullToRefresh onRefresh={ () => { props.apiq( "bj" ) } } isFetching={ props.state.fetching }>
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
                            <div className="bj_body">
                                <div>
                                    { Object.keys(props.state.cardlist).length > 0 ? (
                                        <div className="card_user">
                                            { props.state.cardlist.map( (list, i) => 
                                                <div key={i} className="card" >
                                                    <div className={ list.name + ` name` }>{ list.name2 }</div>
                                                    <div className="icon"><img src={ card[list.name] } alt="icon"></img></div>
                                                </div> 
                                            ) }
                                        </div>
                                    ) : (
                                        <div className="card_user">
                                            <div className="cardempty" >Пусто</div>
                                        </div>
                                    ) }
                                </div>
                            </div>
                            <div className='msetting'>
                                <div onClick={ ( e ) => props.cardadd( e ) } ><Avatar style={ { background: 'none' } } size={28} ><Icon24Add fill="var(--white)" /></Avatar></div>
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

export default BJ;