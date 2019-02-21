import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Div, Button, Spinner, Footer, PullToRefresh } from '@vkontakte/vkui';
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
        <div className="hleft"></div><div className="hright"></div>
        <PullToRefresh onRefresh={ () => { props.apiq( "home1" ) } } isFetching={ props.state.fetching }>
            { props.state.load ? (
                <div>
                    <div className='balance'>
                        <Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</Button>
                    </div>
                    <Div>
                        <Button before={ <Icon28AddOutline fill="var(--white)" /> } size="xl">Приобрести</Button>
                    </Div>
                    <Group title="Дома">
                        { Object.keys(props.state.homelist).length > 0 ? (
                            <List>
                                { props.state.homelist.map( (list, i) => <Cell key={i} onClick={ props.go } data-to="homeframe" multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={48} ><Icon24Home /></Avatar> } description={ list.des }>{ 'Дом №' + list.id }</Cell> ) }
                            </List>
                        ) : (
                            <List>
                                <Cell multiline={true} before={ props.icons( 'empty' ) } >У вас нет ни одного дома</Cell>
                            </List>
                        ) }
                    </Group>
                    <Group title="Земельные участки" description="Недоступно" >
                        { Object.keys(props.state.regionlist).length > 0 ? (
                            <List>
                                { props.state.regionlist.map( (list, i) => <Cell key={i} onClick={ props.go } data-to="homeframe" multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={48} ><Icon24Place /></Avatar> } description={ list.des }>{ 'Участок №' + list.id }</Cell> ) }
                            </List>
                        ) : (
                            <List>
                                <Cell multiline={true} before={ props.icons( 'empty' ) } >У вас нет ни одного земельного участка</Cell>
                            </List>
                        ) }
                    </Group>
                    <Group title="Автомобили" description="Недоступно" >
                        { Object.keys(props.state.autolist).length > 0 ? (
                            <List>
                                { props.state.autolist.map( (list, i) => <Cell key={i} onClick={ props.go } data-to="homeframe" multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={48} ><Icon24Flash /></Avatar> } description={ list.des }>{ list.name }</Cell> ) }
                            </List>
                        ) : (
                            <List>
                                <Cell multiline={true} before={ props.icons( 'empty' ) } >У вас нет ни одного автомобиля</Cell>
                            </List>
                        ) }
                    </Group>
                    <Group title="Семья" description="Недоступно" >
                        { Object.keys(props.state.family).length > 0 ? (
                            <List>
                                { props.state.family.map( (list, i) => <Cell key={i} onClick={ props.go } data-to="homeframe" multiline={true} before={ <Avatar type="app" style={ { background: 'none' } } size={48} ><Icon16Users /></Avatar> } description={ list.des }>{ list.name }</Cell> ) }
                            </List>
                        ) : (
                            <List>
                                <Cell multiline={true} before={ props.icons( 'empty' ) } >У вас нет ни одного участника семьи</Cell>
                            </List>
                        ) }
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
        </PullToRefresh>
	</Panel>
);

export default Home;
