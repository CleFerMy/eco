import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button, Spinner, Footer } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon28AddOutline from '@vkontakte/icons/dist/28/add_outline';
import Icon24Home from '@vkontakte/icons/dist/24/home';

const osname = platform();

const Job = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Работа</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
			<div>
                <div className='balance'>
                    <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.state.money.c1 ) : 'Неизвестно' }</Button>
                </div>
                <Div>
                    <Button before={ <Icon28AddOutline fill="var(--white)" /> } size="xl">Приобрести</Button>
                </Div>
                <Group title="Предприятия">
                    <List>
                        <Cell onClick={ props.go } data-to="jobframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Home /></Avatar>} description="10 000 ридия в час" >Шашлычка</Cell>
                        <Cell onClick={ props.go } data-to="jobframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Home /></Avatar>} description="1 000 ридия в час" >Шашлычка №2</Cell>
                        <Cell onClick={ props.go } data-to="jobframe" expandable multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Home /></Avatar>} description="8 000 ридия в час" >Шашлычка №3</Cell>
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

export default Job;
