import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Footer, Button } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

import AboutImg from '../img/s.png';

const osname = platform();

const About = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } addon={<HeaderButton onClick={ () => window.history.back() }>Назад</HeaderButton>} left={ <HeaderButton onClick={ () => window.history.back() } >  { osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/> }</HeaderButton> }>Информация</PanelHeader>
        <div className="hleft"></div><div className="hright"></div>
        <img className="About" src={ AboutImg } alt="Eco"/>
        <Footer>{ `Версия ${ props.state.version }` }</Footer>
        <Group>
            <List>
                <Cell multiline={true} target="_blank" href="https://vk.com/write138269465" description="Разработчик">Обратная связь</Cell>
            </List>
        </Group>
        { props.state.contacts.length > 0 ? (
            <div>
                <Group title="партнёры">
                    <List>
                        { props.state.contacts.map( list => <Cell multiline={true} target="_blank" href={ `${list.url}` } before={ <Avatar src={ list.img }/> } description={ `Разработчик: ${list.author}` }>{ list.name }</Cell> ) }
                    </List>
                </Group>
            </div>
        ) : (
            <div>
                <Footer>Список партнёров пуст.<br /><Button style={ { marginTop: 10 } } data-type="more" level="secondary">Повторить</Button></Footer>
            </div>
        ) }
		<div className='setting'>
			<div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
		</div>
	</Panel>
);

export default About;
