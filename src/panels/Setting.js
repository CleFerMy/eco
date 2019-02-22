import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Spinner, Footer, PullToRefresh } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Notification from '@vkontakte/icons/dist/24/notification';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Bug from '@vkontakte/icons/dist/24/bug';

const osname = platform();

const Setting = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Настройки</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        <PullToRefresh onRefresh={ () => { props.apiq( "setting1" ) } } isFetching={ props.state.fetching }>
            { props.state.load ? (
                <div>
                    { !props.state.error ? (
						<div>
                            { props.state.notifhide && 
                                <Group className="notif"> 
                                    <List>
                                        <Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</Cell>
                                    </List>
                                </Group>
                            }
                            <Group>
                                <List>
                                    <Cell multiline={true} target="_blank" href={ `https://vk.com/id${ props.state.user ? (props.state.user.id) : (`0`) }`} description={ `Открыть профиль` } before={ <Avatar src={ props.state.user ? (props.state.user.photo_200) : (`https://vk.com/images/camera_400.png?ava=1`) }/> }>
                                        { `${ props.state.user ? (props.state.user.first_name) : (`Имя`) } ${ props.state.user ? (props.state.user.last_name) : (`Фамилия`) }` }
                                    </Cell>
                                </List>
                            </Group>
                            <Group>
                                <List>
                                    <Cell multiline={true} expandable before={ <Avatar style={ { background: 'none' } } size={28} indicator="Включены" ><Icon24Notification /></Avatar> }>Уведомления</Cell>
                                    <Cell multiline={true} expandable before={ <Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar> }>Основные</Cell>
                                </List>
                            </Group>
                            <Group>
                                <List>
                                    <Cell multiline={true} target="_blank" href={ `https://vk.com/write138269465`} before={ <Avatar style={ { background: 'none' } } size={28}><Icon24Bug /></Avatar> } >Сообщить о проблеме</Cell>
                                </List>
                            </Group>
                            <Group>
                                <List>
                                    <Cell multiline={true} expandable before={ <Avatar style={ { background: 'none' } } size={28}><Icon24Help /></Avatar> } indicator="0 статей" >Помощь</Cell>
                                    <Cell multiline={true} expandable onClick={ props.go } data-to="about" before={ <Avatar style={ { background: 'none' } } size={28}><Icon24Info /></Avatar> }>О сервисе</Cell>
                                </List>
                            </Group>
                        </div>
					) : (
						<div>
							{ props.state.notifhide && 
								<Group className="notif"> 
									<List>
										<Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `start` ) }>{ props.state.notif.n }</Cell>
									</List>
								</Group>
							}
						</div>
					) }
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

export default Setting;
