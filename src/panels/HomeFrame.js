import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Home from '../img/home.png';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24UserAdd from '@vkontakte/icons/dist/24/user_add';

const osname = platform();

const HomeFrame = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Информация</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        <div className='balance'>
            <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.state.money.c1 ) : 'Неизвестно' }</Button>
        </div>
        <Div className="homeframeimg" style={ { 'marginTop': 50 } }><img className="notifimage" src={ Home } alt="картиночка" /></Div>
        <Group title="Подробно">
            <List>
                <Cell onClick={ props.openSheet } data-notifs="sell_home" before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24Coins /></Avatar> } description="1 000 000 ридия" multiline>Продать</Cell>
                <Cell before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24Place /></Avatar> } description="ул. Крылова, д.1" multiline>Адрес</Cell>
                <Cell before={ <Avatar style={ { background: 'none' } } size={28} ><Icon24UserAdd /></Avatar> } description="2 места" multiline>Свободные места</Cell>
            </List>
        </Group>
        <Group title="Жители">
            <List>
                <Cell multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></Avatar>} description="Владелец" >Имя Фамилия</Cell>
                <Cell multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></Avatar>} description="Сын" >Имя Фамилия</Cell>
                <Cell multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></Avatar>} description="Внебрачный дедушка" >Имя Фамилия</Cell>
            </List>
        </Group>
		<div className='setting'>
			<div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
		</div>
	</Panel>
);

export default HomeFrame;
