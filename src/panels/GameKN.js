import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Replay from '@vkontakte/icons/dist/24/replay';

const osname = UI.platform();

const win = {'u':'выиграли. На ваш счёт зачислено 10 ридия.','b':'проиграли. С вашего счёта списано 10 ридия.','n':'сыграли в ничью. Вы сохранили свой счёт.'};

const KN = props => (
    <UI.Panel id={ props.id }>
        <UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>Крестики-нолики</UI.PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
			<div>
                { !props.state.error ? (
					<div>
                        <div className='balance'>
                            <UI.Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="#fff" /> }>{ props.state.money.c1 ? ( props.state.money.c1 ) : 'Неизвестно' }</UI.Button>
                        </div>
                        { Object.keys( props.state.kn ).length > 0 ? (
                            <div>
                                { props.state.notifhide && 
                                    <UI.Group className="notif"> 
                                        <UI.List>
                                            <UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</UI.Cell>
                                        </UI.List>
                                    </UI.Group>
                                }
                                { props.state.kn.p ? (
                                    <div>
                                        <UI.Group className="notif"> 
                                            <UI.List>
                                                { props.state.kn.win === 's' && <UI.Cell multiline={true} style={ { 'marginBottom': 25, 'color': 'var(--button_secondary_foreground)' } } >Ваш ход. Ставка: 10 очков.</UI.Cell> }
                                                { props.state.kn.win !== 's' && <UI.Cell multiline={true} style={ { 'marginBottom': 25, 'color': 'var(--button_secondary_foreground)' } } >Вы { win[props.state.kn.win] }</UI.Cell> }
                                            </UI.List>
                                        </UI.Group>
                                        <UI.Group>
                                            <UI.Div>
                                                <div className="kn" style={ { display: 'flex' } }>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[1] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:1}" size="m" level="secondary" style={{ marginLeft: 4, background: props.state.kn.wins[1] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[1] ) }</UI.Button>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[2] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:2}" size="m" level="secondary" style={{ marginLeft: 4, background: props.state.kn.wins[2] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[2] ) }</UI.Button>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[3] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:3}" size="m" level="secondary" style={{ marginLeft: 4, background: props.state.kn.wins[3] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[3] ) }</UI.Button>
                                                </div>
                                                <div className="kn" style={ { display: 'flex' } }>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[4] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:4}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[4] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[4] ) }</UI.Button>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[5] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:5}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[5] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[5] ) }</UI.Button>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[6] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:6}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[6] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[6] ) }</UI.Button>
                                                </div>
                                                <div className="kn" style={ { display: 'flex' } }>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[7] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:7}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[7] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[7] ) }</UI.Button>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[8] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:8}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[8] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[8] ) }</UI.Button>
                                                    <UI.Button disabled={ props.state.kndisabled || props.state.kn.p[9] !== 'n' || props.state.kn.win !== 's' } onClick={ ( e ) => props.kn( e ) } data-m="3" data-p="{h:9}" size="m" level="secondary" style={{ marginTop: 4, marginLeft: 4, background: props.state.kn.wins[9] === 'y' && `#8ac176` }}>{ props.icons( props.state.kn.p[9] ) }</UI.Button>
                                                </div>
                                                { props.state.kn.win !== 's' ? (
                                                    <UI.Button disabled={ props.state.kndisabled } onClick={ ( e ) => props.kn( e ) } data-m="2" data-p="{}" size="xl" stretched level="secondary" style={{ marginTop: 30, marginLeft: 4 }} before={ <UI.Avatar style={ { background: 'none' } } 	size={28}><Icon24Replay fill="var(--button_secondary_foreground)" /></UI.Avatar> }>Новая игра</UI.Button>
                                                ) : ( 
                                                    <UI.Button disabled={ props.state.kndisabled } onClick={ props.openSheet } data-notifs="knnew" size="xl" stretched level="secondary" style={{ marginTop: 30, marginLeft: 4 }} before={ <UI.Avatar style={ { background: 'none' } } 	size={28}><Icon24Replay fill="var(--button_secondary_foreground)" /></UI.Avatar> }>Новая игра</UI.Button>
                                                    ) }
                                            </UI.Div>
                                        </UI.Group>
                                    </div>
                                ) : (
                                    <div>
                                        <UI.Footer>Игровое поле игры не получено.<br /><UI.Button style={ { marginTop: 10 } } onClick={ ( e ) => props.apiupdate( e ) } data-type="kn" level="secondary">Повторить</UI.Button></UI.Footer>
                                    </div>
                                ) }
                            </div>
                        ) :
                        (
                            <div>
                                <UI.Footer>Данные игры не получены.<br /><UI.Button style={ { marginTop: 10 } } onClick={ ( e ) => props.apiupdate( e ) } data-type="kn" level="secondary">Повторить</UI.Button></UI.Footer>
                            </div>
                        ) }
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

export default KN;