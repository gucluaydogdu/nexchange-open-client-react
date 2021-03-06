import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/tr';
import _ from 'lodash';

import Helpers from '../helpers';
import config from '../config';

import LoadingComponent from '../components/LoadingComponent.js';


class OrderStatus extends Component {
	constructor(props) {
		super(props);

		this.state = {
			orders: []
		}

		this.fetchRecentOrders = this.fetchRecentOrders.bind(this);
		this.fetchRecentOrders();
	}

	fetchRecentOrders() {
        axios.get(`${config.API_BASE_URL}/orders/?page=1`)
        	.then(response => {
   	        		let orders = response.data.results.filter(order => {
		        	let params = Helpers.urlParams();
		        	return (params && params.hasOwnProperty('test')) ? true : (
		        		order.withdraw_address && order.deposit_address &&
		        		_.contains(config['ENABLED_COINS'], order.withdraw_address.currency_code) &&
		        		_.contains(config['ENABLED_COINS'], order.deposit_address.currency_code));
        		});

        		this.setState({orders: orders});
        	})
        	.catch(error => {
        		console.log(error);
        	});

        this.timeout = setTimeout(() => {
        	this.fetchRecentOrders();
        }, config.RECENT_ORDERS_INTERVAL);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}

	render() {
		let orders = this.state.orders.slice(0,config.RECENT_ORDERS_COUNT).map(order => {
			return (
				<div key={order.unique_reference} className="recent-order">


					<div className="col-xs-4 coins-container">
						<div className="coins">
							<i className={`coin-icon cc-${order.pair.quote.code} ${order.pair.quote.code}`}></i>
							<i className="fa fa-arrow-right" aria-hidden="true"></i>
							<i className={`coin-icon cc-${order.pair.base.code} ${order.pair.base.code}`}></i>
						</div>
					</div>

					<div className="col-xs-4 recent-order-amount">
						<p>{Math.round(parseFloat(order.amount_quote) * 1000) / 1000} <b className="hidden-xs">{order.pair.quote.code}</b> --> {Math.round(parseFloat(order.amount_base) * 1000) / 1000} <b className="hidden-xs">{order.pair.base.code}</b></p>
					</div>

					<div className="col-xs-4 created-on">
						<p>{new moment(order.created_on).fromNow()}</p>
					</div>
				</div>
			);
		});

		return (
			<div id="recent-orders">
				<div className="container">
					<div className="row">
						<div className="col-xs-12">
							<h2>Son İşlemler</h2>

							<div className="recent-orders-container">
								{orders.length < 1 ? (
									<LoadingComponent isLoading={true} />
								) : (
									orders
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default OrderStatus;
