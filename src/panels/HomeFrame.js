import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Home from '../img/home.png';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24User from '@vkontakte/icons/dist/24/user';

const osname = platform();

const HomeFrame = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Информация</PanelHeader>
        <div class="hleft"></div><div class="hright"></div>
        <div className='balance'>
            <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>1 000</Button>
        </div>
        <Div className="homeframeimg" style={ { 'margin-top': 50 } }><img className="notifimage" src={ Home } alt="картиночка" /></Div>
        <Div className="homeframename" >Дом</Div>
        <Div className="homeframename" >ул. Крылова, д.1</Div>
        <Group title="Жители">
            <List>
                <Cell onClick={ () => window.history.back() } data-to="home" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></Avatar>} description="Владелец" >Имя Фамилия</Cell>
                <Cell onClick={ () => window.history.back() } data-to="homeframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></Avatar>} description="Сын" >Имя Фамилия</Cell>
                <Cell onClick={ () => window.history.back() } data-to="homeframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></Avatar>} description="Внебрачный дедушка" >Имя Фамилия</Cell>
            </List>
        </Group>
		<div className='setting'>
			<div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
		</div>
	</Panel>
);

export default HomeFrame;
