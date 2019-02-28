import React from 'react';
import * as UI from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

import Home from '../img/home.png';

import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';
import Icon24User from '@vkontakte/icons/dist/24/user';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24UserAdd from '@vkontakte/icons/dist/24/user_add';

const osname = UI.platform();

const HomeFrame = props => (
	<UI.Panel id={ props.id }>
		<UI.PanelHeader noShadow={ true } addon={<UI.HeaderButton onClick={ () => window.history.back() }>Назад</UI.HeaderButton>} left={ <UI.HeaderButton onClick={ () => window.history.back() } >  { osname === UI.IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</UI.HeaderButton> }>Информация</UI.PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        { props.state.load ? (
			<div>
                { !props.state.error ? (
						<div>
                        <div className='balance'>
                            <UI.Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.nl( props.state.money.c1 ) ) : 'Неизвестно' }</UI.Button>
                        </div>
                        <UI.Div className="homeframeimg" ><img className="notifimage" src={ Home } alt="картиночка" /></UI.Div>
                        <UI.Group title="Подробно">
                            <UI.List>
                                <UI.Cell onClick={ props.openSheet } data-notifs="sell_home" before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Coins /></UI.Avatar> } description="1 000 000 ридия" multiline>Продать</UI.Cell>
                                <UI.Cell before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Place /></UI.Avatar> } description="ул. Крылова, д.1" multiline>Адрес</UI.Cell>
                                <UI.Cell before={ <UI.Avatar style={ { background: 'none' } } size={28} ><Icon24UserAdd /></UI.Avatar> } description="2 места" multiline>Свободные места</UI.Cell>
                            </UI.List>
                        </UI.Group>
                        <UI.Group title="Жители">
                            <UI.List>
                                <UI.Cell multiline={true} before={ <UI.Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></UI.Avatar>} description="Владелец" >Имя Фамилия</UI.Cell>
                                <UI.Cell multiline={true} before={ <UI.Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></UI.Avatar>} description="Сын" >Имя Фамилия</UI.Cell>
                                <UI.Cell multiline={true} before={ <UI.Avatar type="app" style={ { background: 'none' } } size={28} ><Icon24User /></UI.Avatar>} description="Внебрачный дедушка" >Имя Фамилия</UI.Cell>
                            </UI.List>
                        </UI.Group>
                        <div className='setting'>
                            <div onClick={ props.go } data-to="setting" ><UI.Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></UI.Avatar></div>
                        </div>
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

export default HomeFrame;
