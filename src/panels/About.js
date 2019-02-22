import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Footer, Button, Spinner, PullToRefresh } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import AboutImg from '../img/s.png';

const osname = platform();

const About = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Информация</PanelHeader>
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
                            <img className="About" src={ AboutImg } alt="Eco"/>
                            <Footer>{ `Версия ${ props.state.version }` }</Footer>
                            <Group>
                                <List>
                                    <Cell multiline={true} target="_blank" href="https://vk.com/write138269465" description="Разработчик">Обратная связь</Cell>
                                </List>
                            </Group>
                            { Object.keys(props.state.contacts).length > 0 ? (
                                <div>
                                    <Group title="партнёры">
                                        <List>
                                            { props.state.contacts.map( (list, i) => <Cell key={i} multiline={true} target="_blank" href={ `${list.url}` } before={ <Avatar src={ list.img }/> } description={ list.author }>{ list.name }</Cell> ) }
                                        </List>
                                    </Group>
                                </div>
                            ) : (
                                <div>
                                    <Footer>Список партнёров пуст.<br /><Button style={ { marginTop: 10 } } data-type="more" level="secondary">Повторить</Button></Footer>
                                </div>
                            ) }
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

export default About;
