import React from 'react';
import { Panel, PanelHeader, HorizontalScroll, Button, Avatar } from '@vkontakte/vkui';
import Icon24Coins from '@vkontakte/icons/dist/24/coins';
import Icon24Settings from '@vkontakte/icons/dist/24/settings';

const Main = props => (
	<Panel id={ props.id }>
		<PanelHeader noShadow={ true } >Eco</PanelHeader>
		<div className="hleft"></div><div className="hright"></div>
		<div className="menu">
			<HorizontalScroll>
				<div className="statslist">
					<div onClick={ props.go } data-to="home" className="statsitem statsitem_1"><span className="statsspan">Дом</span><div className="statsitemdesc">1</div></div>
					<div className="statsitem statsitem_2"><span className="statsspan">Банк</span><div className="statsitemdesc">0</div></div>
					<div className="statsitem statsitem_3"><span className="statsspan">Магазин</span><div className="statsitemdesc">New</div></div>
					<div className="statsitem statsitem_4"><span className="statsspan">Работа</span><div className="statsitemdesc">2$ в час</div></div>
					<div className="statsitem statsitem_1"><span className="statsspan">Казино</span><div className="statsitemdesc">Долг 2.000$</div></div>
				</div>
			</HorizontalScroll>
		</div>
		<div className='mbalance'>
			<Button onClick={ props.go } data-to="money" before={ <Icon24Coins fill="var(--white)" /> }>{ props.state.money.c1 ? ( props.state.money.c1 ) : 'Неизвестно' }</Button>
		</div>
		<div className='msetting'>
			<div onClick={ props.go } data-to="setting" ><Avatar style={ { background: 'none' } } size={28} ><Icon24Settings /></Avatar></div>
		</div>
	</Panel>
);

export default Main;
