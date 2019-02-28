import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Info from '@vkontakte/icons/dist/24/info';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24Notification from '@vkontakte/icons/dist/24/notification';
import Icon24Help from '@vkontakte/icons/dist/24/help';
import Icon24Bug from '@vkontakte/icons/dist/24/bug';

const osname = UI.platform();

const Setting = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>{ props.state.fetching || !props.state.load ? ('Обновление') : ('Настройки') }</UI.PanelHeader>
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
                                <UI.Group>
                                    <UI.List>
                                        <UI.Cell multiline={true} target="_blank" href={ `https://vk.com/id${ props.state.user ? (props.state.user.id) : (`0`) }`} description={ `Открыть профиль` } before={ <UI.Avatar src={ props.state.user ? (props.state.user.photo_200) : (`https://vk.com/images/camera_400.png?ava=1`) }/> }>
                                            { `${ props.state.user ? (props.state.user.first_name) : (`Имя`) } ${ props.state.user ? (props.state.user.last_name) : (`Фамилия`) }` }
                                        </UI.Cell>
                                    </UI.List>
                                </UI.Group>
                                <UI.Group>
                                    <UI.List>
                                        <UI.Cell multiline={true} expandable before={ <UI.Avatar style={ { background: 'none' } } size={28} indicator="Включены" ><Icon24Notification /></UI.Avatar> }>Уведомления</UI.Cell>
                                        <UI.Cell multiline={true} expandable before={ <UI.Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24Settings /></UI.Avatar> }>Основные</UI.Cell>
                                    </UI.List>
                                </UI.Group>
                                <UI.Group>
                                    <UI.List>
                                        <UI.Cell multiline={true} target="_blank" href={ `https://vk.com/write138269465`} before={ <UI.Avatar style={ { background: 'none' } } size={28}><Icon24Bug /></UI.Avatar> } >Сообщить о проблеме</UI.Cell>
                                    </UI.List>
                                </UI.Group>
                                <UI.Group>
                                    <UI.List>
                                        <UI.Cell multiline={true} expandable before={ <UI.Avatar style={ { background: 'none' } } size={28}><Icon24Help /></UI.Avatar> } indicator="0 статей" >Помощь</UI.Cell>
                                        <UI.Cell multiline={true} expandable onClick={ props.go } data-to="about" before={ <UI.Avatar style={ { background: 'none' } } size={28}><Icon24Info /></UI.Avatar> }>О сервисе</UI.Cell>
                                    </UI.List>
                                </UI.Group>
                                <UI.Group>
                                    <UI.List>
                                    <UI.Cell multiline={true} asideContent={<UI.Switch onChange={ props.debug } defaultChecked={ props.state.debug } />} before={ <UI.Avatar style={ { background: 'none' } } size={28}><Icon24Bug /></UI.Avatar> } >Debug</UI.Cell>
                                    </UI.List>
                                </UI.Group>
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

export default Setting;
