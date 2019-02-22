import React from 'react';
import { Panel, PanelHeader, HeaderButton, platform, IOS, Group, Footer, Button, Div, Avatar, List, Cell, Spinner } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Replay from '@vkontakte/icons/dist/24/replay';

const osname = platform();

const win = {'u':'выиграли. На ваш счёт зачислено 10 ридия.','b':'проиграли. С вашего счёта списано 10 ридия.','n':'сыграли в ничью. Вы сохранили свой счёт.'};

const KN = props => (
    <Panel id={ props.id }>
        <PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Крестики-нолики</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
			<div>
                { !props.state.error ? (
					<div>
                        <div className='balance'>
                            <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.state.money.c1 ) : 'Неизвестно' }</Button>
                        </div>
                        { Object.keys( props.state.kn ).length > 0 ? (
                            <div>
                                { props.state.notifhide && 
                                    <Group className="notif"> 
                                        <List>
                                            <Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</Cell>
                                        </List>
                                    </Group>
                                }
                                { props.state.kn.p ? (
                                    <div>
                                        <Group className="notif"> 
                                            <List>
                                                { props.state.kn.win === 's' && <Cell multiline={true} style={ { 'marginBottom': 25, 'color': 'var(--button_secondary_foreground)' } } >Ваш ход. Ставка: 10 очков.</Cell> }
                                                { props.state.kn.win !== 's' && <Cell multiline={true} style={ { 'marginBottom': 25, 'color': 'var(--button_secondary_foreground)' } } >Вы { win[props.state.kn.win] }</Cell> }
                                            </List>
                                        </Group>
                                        <Group>
                                            <Div>
                                                <div className="kn" style={ { display: 'flex' } }>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[1] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:1}" size="m" level="secondary" style={{ marginLeft: 4, background: props.state.kn.wins[1] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[1] ) }</Button>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[2] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:2}" size="m" level="secondary" style={{ marginLeft: 4, background: props.state.kn.wins[2] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[2] ) }</Button>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[3] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:3}" size="m" level="secondary" style={{ marginLeft: 4, background: props.state.kn.wins[3] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[3] ) }</Button>
                                                </div>
                                                <div className="kn" style={ { display: 'flex' } }>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[4] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:4}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[4] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[4] ) }</Button>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[5] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:5}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[5] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[5] ) }</Button>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[6] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:6}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[6] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[6] ) }</Button>
                                                </div>
                                                <div className="kn" style={ { display: 'flex' } }>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[7] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:7}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[7] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[7] ) }</Button>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[8] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:8}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[8] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[8] ) }</Button>
                                                    <Button disabled={ props.state.kndisabled || props.state.kn.p[9] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:9}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[9] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[9] ) }</Button>
                                                </div>
                                                { props.state.kn.win !== 's' ? (
                                                    <Button disabled={ props.state.kndisabled } onClick={ ( e ) => props.kn( e ) } data-m="2" data-p="{}" size="xl" stretched level="secondary" style={{ marginTop: 30, marginLeft: 4 }} before={ <Avatar style={ { background: 'none' } } 	size={28}><Icon24Replay fill="var(--button_secondary_foreground)" /></Avatar> }>Новая игра</Button>
                                                ) : ( 
                                                    <Button disabled={ props.state.kndisabled } onClick={ props.openSheet } data-notifs="knnew" size="xl" stretched level="secondary" style={{ marginTop: 30, marginLeft: 4 }} before={ <Avatar style={ { background: 'none' } } 	size={28}><Icon24Replay fill="var(--button_secondary_foreground)" /></Avatar> }>Новая игра</Button>
                                                    ) }
                                            </Div>
                                        </Group>
                                    </div>
                                ) : (
                                    <div>
                                        <Footer>Игровое поле игры не получено.<br /><Button style={ { marginTop: 10 } } onClick={ ( e ) => props.apiupdate( e ) } data-type="kn" level="secondary">Повторить</Button></Footer>
                                    </div>
                                ) }
                            </div>
                        ) :
                        (
                            <div>
                                <Footer>Данные игры не получены.<br /><Button style={ { marginTop: 10 } } onClick={ ( e ) => props.apiupdate( e ) } data-type="kn" level="secondary">Повторить</Button></Footer>
                            </div>
                        ) }
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

export default KN;