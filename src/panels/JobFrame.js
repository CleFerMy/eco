import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button, Spinner, Footer } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Job from '../img/job.png';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';
import Icon28Favorite from '@vkontakte/icons/dist/28/favorite';

const osname = platform();

const JobFrame = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Информация</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
			<div>
                <div className='balance'>
                    <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.state.money.c1 ) : 'Неизвестно' }</Button>
                </div>
                <Div className="homeframeimg" ><img className="notifimage" src={ Job } alt="картиночка" /></Div>
                <Group title="Подробно">
                    <List>
                        <Cell onClick={ props.openSheet } data-notifs="sell_job" before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24Coins /></Avatar> } description="2 000 000 ридия" multiline>Продать</Cell>
                        <Cell before={ <Avatar style={ { background: 'none' } } size={28} ><Icon28Favorite /></Avatar> } description="2 уровень" multiline>Уровень</Cell>
                        <Cell before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24MoneyTransfer /></Avatar> } description="10 000 ридия в час" multiline>Прибыль</Cell>
                    </List>
                </Group>
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
