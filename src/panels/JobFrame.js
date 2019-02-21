import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button, Spinner, Footer } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Job from '../img/job.png';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon24Mention from '@vkontakte/icons/dist/24/mention';
import Icon24Users from '@vkontakte/icons/dist/24/users';

const osname = platform();

const moneyname = [[" ридий"," ридия"," ридия"],[" неунум"," неунума"," неунума"]];

const JobFrame = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Информация</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
			<div>
                <div className='balance'>
                    <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</Button>
                </div>
                { Object.keys(props.state.joblast).length > 0 ? (
                    <div>
                        <Div className="homeframeimg" ><img className="notifimage" src={ Job } alt="картиночка" /></Div>
                        <Group title="Подробно">
                            <List>
                                <Cell before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24Mention /></Avatar> } description={ props.state.joblast.name } multiline>Наимнование</Cell>
                                { props.state.joblast.buy ? ( 
                                    <Cell onClick={ props.openSheet } data-notifs="buy_job" data-job={ props.state.joblast.id } before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24Coins /></Avatar> } description={ props.nl( props.state.joblast.money ) + props.dn( props.state.joblast.money, moneyname['1'] ) } multiline>Купить</Cell>
                                ) : ( 
                                    <Cell onClick={ props.openSheet } data-notifs="sell_job" data-job={ props.state.joblast.id } before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24Coins /></Avatar> } description={ props.nl( props.state.joblast.money_sell ) + props.dn( props.state.joblast.money_sell, moneyname['1'] ) } multiline>Продать</Cell>
                                ) }
                                <Cell before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24MoneyTransfer /></Avatar> } description={ props.nl( props.state.joblast.des ) + props.dn( props.state.joblast.des, moneyname[props.state.joblast.coin] ) + ` в час` } multiline>Прибыль</Cell>
                                <Cell before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24Users /></Avatar> } description={ props.nl( props.state.joblast.user ) + props.dn( props.state.joblast.user, [' человек', ' человека', ' человек'] ) } multiline>Владельцы</Cell>
                            </List>
                        </Group>
                    </div>
                ) : (
                    <div>
                        <Spinner size="large" style={{ marginTop: 25 }} />
                        <Footer>Нет истории просмотров...</Footer>
                    </div>
                ) }
                <div className='setting'>
                    <div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
                </div>
            </div>
		) : (
			<div>
				<Spinner size="large" style={{ marginTop: 25 }} />
				<Footer>Загрузка...</Footer>
			</div>
		) }
	</Panel>
);

export default JobFrame;
