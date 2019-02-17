import React from 'react';
import { Panel, PanelHeader, Avatar, List, Cell, HeaderButton, IOS, platform, Group, Footer } from '@vkontakte/vkui';
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
        <Group title="партнёры">
            <List>
                <Cell multiline={true} target="_blank" href="https://vk.com/app6782703" before={ <Avatar src="https://pp.userapi.com/c844722/v844722035/155da2/zkMGu4sigXE.jpg" /> } description="Разработчик: Максим Смирнов">Зайки</Cell>
                <Cell multiline={true} target="_blank" href="https://vk.com/app6856236" before={ <Avatar src="https://vk.com/images/dquestion_d.png" /> } description="Разработчик: Глеб Фараонов">VK Health</Cell>
                <Cell multiline={true} target="_blank" href="https://vk.com/app6784987" before={ <Avatar src="https://pp.userapi.com/c844320/v844320287/14f699/cMOKctN2RGg.jpg" /> } description="Разработчик: Матвей Вишневский">Клубника</Cell>
            </List>
        </Group>
		<div className='setting'>
			<div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
		</div>
	</Panel>
);

export default About;
