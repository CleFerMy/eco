import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Job from '../img/job.png';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon24Mention from '@vkontakte/icons/dist/24/mention';
import Icon24Users from '@vkontakte/icons/dist/24/users';

const osname = UI.platform();

const moneyname = [[" ридий"," ридия"," ридия"],[" неунум"," неунума"," неунума"]];

const JobFrame = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>Информация</UI.PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
			<div>
                { !props.state.error ? (
						<div>
                        <div className='balance'>
                            <UI.Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="#fff" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</UI.Button>
                        </div>
                        { props.state.notifhide && 
                            <UI.Group className="notif"> 
                                <UI.List>
                                    <UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</UI.Cell>
                                </UI.List>
                            </UI.Group>
                        }
                        { Object.keys(props.state.joblast).length > 0 ? (
                            <div>
                                <UI.Div className="homeframeimg" ><img className="notifimage" src={ Job } alt="картиночка" /></UI.Div>
                                <UI.Group title="Подробно">
                                    <UI.List>
                                        <UI.Cell before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Mention /></UI.Avatar> } description={ props.state.joblast.name } multiline>Наимнование</UI.Cell>
                                        { props.state.joblast.buy ? ( 
                                            <UI.Cell onClick={ props.openSheet } data-notifs="buy_job" data-job={ props.state.joblast.id } before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Coins /></UI.Avatar> } description={ props.nl( props.state.joblast.money ) + props.dn( props.state.joblast.money, moneyname['1'] ) } multiline>Купить</UI.Cell>
                                        ) : ( 
                                            <UI.Cell onClick={ props.openSheet } data-notifs="sell_job" data-job={ props.state.joblast.id } before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Coins /></UI.Avatar> } description={ props.nl( props.state.joblast.money_sell ) + props.dn( props.state.joblast.money_sell, moneyname['1'] ) } multiline>Продать</UI.Cell>
                                        ) }
                                        <UI.Cell before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24MoneyTransfer /></UI.Avatar> } description={ props.nl( props.state.joblast.des ) + props.dn( props.state.joblast.des, moneyname[props.state.joblast.coin] ) + ` в час` } multiline>Прибыль</UI.Cell>
                                        <UI.Cell before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Users /></UI.Avatar> } description={ props.nl( props.state.joblast.user ) + props.dn( props.state.joblast.user, [' человек', ' человека', ' человек'] ) } multiline>Владельцы</UI.Cell>
                                    </UI.List>
                                </UI.Group>
                            </div>
                        ) : (
                            <div>
                                <UI.Spinner size="large" style={{ marginTop: 25 }} />
                                <UI.Footer>Нет истории просмотров...</UI.Footer>
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

export default JobFrame;
