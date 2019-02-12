import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Flash from '@vkontakte/icons/dist/24/flash';
import Icon16Users from '@vkontakte/icons/dist/16/users';

const osname = platform();

const Home = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Дом</PanelHeader>
        <div class="hleft"></div><div class="hright"></div>
        <div className='balance'>
            <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>1 000</Button>
        </div>
        <Div style={ { 'margin-top': 50 } }>
            <Button before={ <Icon28AddOutline fill="var(--white)" /> } size="xl">Приобрести</Button>
        </Div>
        <Group title="Дома">
            <List>
                <Cell onClick={ props.go } data-to="homeframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Home /></Avatar>} description="ул. Крылова, д.1" >Основное жильё</Cell>
            </List>
        </Group>
        <Group title="Земельные участки">
            <List>
                <Cell onClick={ props.go } data-to="homeframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Place /></Avatar>} description="Элитный район, участок №1" >Дача</Cell>
            </List>
        </Group>
        <Group title="Автомобили">
            <List>
                <Cell onClick={ props.go } data-to="homeframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Flash /></Avatar>} description="LADA (ВАЗ) 2112" >Основной автомобиль</Cell>
            </List>
        </Group>
        <Group title="Семья">
            <List>
                <Cell onClick={ props.go } data-to="homeframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon16Users /></Avatar>} description="Внебрачный дедушка" >Имя Фамилия</Cell>
            </List>
        </Group>
		<div className='setting'>
			<div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
		</div>
	</Panel>
);

export default Home;
