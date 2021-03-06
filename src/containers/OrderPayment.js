import React, { Component } from 'react';
import helpers from '../helpers';
import config from '../config';
import _ from 'lodash';

import CountDown from './CountDown';


class OrderPayment extends Component {
	constructor(props) {
		super(props);

		this.state = {estimate: 0};

		this.coin = props.order.pair.quote;
		this.minConfirmations = this.coin.min_confirmations;
		this.tx = _.find(props.order.transactions, {type: 'D'});
		this.txId = this.tx.tx_id;
	}

	componentWillReceiveProps(nextProps) {
		if (_.find(this.props.order.transactions, {type: 'D'}).confirmations != _.find(nextProps.order, {type: 'D'}).confirmations) {
			let coin = nextProps.order.pair.quote;
			this.minConfirmations = this.coin.min_confirmations;
		}
	}

		render() {
		if (this.txId == '' || this.txId == null) {
			return (
				<div className="col-xs-12 text-center order-status-section">
					<h2 style={{margin: "0"}}>Yatırma işlemi bekleniyor...</h2>

				</div>
			)
		}

		return (
			<div className="col-xs-12 text-center order-status-section">
				<h2 style={{margin: "0"}}>İşem tespit edildi, onaylar bekleniyor.</h2>
				<h5>Transaction ID: <a href={this.blockchainUrl} target="_blank" style={{color: "#2cb4a0"}}>{this.tx.tx_id}</a></h5>

				<a href={helpers.getBlockchainUrl(this.coin.code, this.txId)} target="_blank"><h4 style={{margin: "5px 0 18px", "fontWeight": "500"}}>Detayları blok zincirde görüntüleyin.</h4></a>
			</div>
		)
	}

};

export default OrderPayment;