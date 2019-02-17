import React from 'react';
import { Panel, PanelHeader } from '@vkontakte/vkui';

const Main = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } >Eco</PanelHeader>
		<div className="hleft"></div><div className="hright"></div>
		<div className="menu">
			Загрузка
		</div>
	</Panel>
);

export default Main;
