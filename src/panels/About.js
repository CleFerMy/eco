import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import AboutImg from '../img/s.png';

const osname = UI.platform();

const About = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>{ props.state.fetching || !props.state.load ? ('Обновление') : ('Информация') }</UI.PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
            <div>
                { !props.state.error ? (
                    <div>
                        <UI.PullToRefresh onRefresh={ () => { props.apiq( "setting1" ) } } isFetching={ props.state.fetching }>
                            <div>
                                { props.state.notifhide && 
                                    <UI.Group className="notif"> 
                                        <UI.List>
                                            <UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `cancel` ) }>{ props.state.notif.n }</UI.Cell>
                                        </UI.List>
                                    </UI.Group>
                                }
                                <img className="About" src={ AboutImg } alt="Eco"/>
                                <UI.Footer>{ `Версия ${ props.state.version }` }</UI.Footer>
                                <UI.Group>
                                    <UI.List>
                                        <UI.Cell multiline={true} target="_blank" href="https://vk.com/write138269465" description="Разработчик">Обратная связь</UI.Cell>
                                    </UI.List>
                                </UI.Group>
                                { Object.keys(props.state.contacts).length > 0 ? (
                                    <div>
                                        <UI.Group title="партнёры">
                                            <UI.List>
                                                { props.state.contacts.map( (list, i) => <UI.Cell key={i} multiline={true} target="_blank" href={ `${list.url}` } before={ <UI.Avatar src={ list.img }/> } description={ list.author }>{ list.name }</UI.Cell> ) }
                                            </UI.List>
                                        </UI.Group>
                                    </div>
                                ) : (
                                    <div>
                                        <UI.Footer>Список партнёров пуст.<br /><UI.Button style={ { marginTop: 10 } } data-type="more" level="secondary">Повторить</UI.Button></UI.Footer>
                                    </div>
                                ) }
                            </div>
                        </UI.PullToRefresh>
                    </div>
                ) : (
                    <div>
                        { props.state.notifhide && 
                            <UI.Group className="notif"> 
                                <UI.List>
                                    <UI.Cell description={ props.state.notif.d } multiline={true} asideContent={ props.icons( `start` ) }>{ props.state.notif.n }</UI.Cell>
                                </UI.List>
                            </UI.Group>
                        }
                    </div>
                ) }
            </div>
        ) : (
            <div>
                <UI.Spinner size="large" style={{ marginTop: 25 }} />
                <UI.Footer>Загрузка...</UI.Footer>
            </div>
        ) }
	</UI.Panel>
);

export default About;
