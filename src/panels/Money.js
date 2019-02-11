import React from 'react';
import { Panel, PanelHeader, Button, HeaderButton, IOS, platform, Avatar, Group, List, Cell } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24MoneyTransfer from '@vkontakte/icons/dist/24/money_transfer';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const osname = platform();

const Money = props => (
	<Panel id={ props.id }>
		<PanelHeader  addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Баланс</PanelHeader>
        <Group title="Основной счёт">
            <List>
                <Cell multiline={true} before={ <Avatar style={ { background: '#4BB34B' } } size={48}><Icon24Coins fill="var(--white)" /></Avatar> } description="1000 единиц">Ридий</Cell>
                <Cell multiline={true} before={<CircularProgressbar className="moneyitem" percentage={5} text={`50`} background styles={ { background: { fill: '#0a4761' }, path: { stroke: 'white' }, text: { fill: 'white', fontSize: '16px' }, trail: { stroke: 'transparent' } } } />} description="Занято 50 из 1000">Неунум</Cell>
            </List>
        </Group>
        <Group title="Счета в банках">
            <List>
                <Cell multiline={true} before={ <Avatar style={ { background: '#4BB34B' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></Avatar> } description="10 неунума">Банк "Рядом" Счёт #311</Cell>
                <Cell multiline={true} before={ <Avatar style={ { background: '#FFA000' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></Avatar> } description="Пусто">Банк "Рядом" Счёт #316</Cell>
                <Cell multiline={true} before={ <Avatar style={ { background: '#FFA000' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></Avatar> } description="Пусто">Банк "Рядом" Счёт #482</Cell>
                <Cell multiline={true} before={ <Avatar style={ { background: '#FFA000' } } size={48}><Icon24MoneyTransfer fill="var(--white)" /></Avatar> } description="Пусто">Банк "Рядом" Счёт #521</Cell>
            </List>
        </Group>
        <div className='balance'>
            <Button before={ <Icon24Coins fill="var(--white)" /> }>1 000</Button>
        </div>
        <div className='setting'>
            <div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
        </div>
	</Panel>
);

export default Money;
