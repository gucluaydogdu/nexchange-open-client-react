import React, { Component } from 'react';
import {Icon} from 'react-fa';
import CopyToClipboard from 'react-copy-to-clipboard';


class OrderInitial extends Component {
	constructor(props) {
		super(props);
	}

	triggerCopyTooltip() {
		$('#copy-to-clipboard').tooltip({
			trigger: 'click',
			placement: 'top'
		});

		$('#copy-to-clipboard').tooltip('hide')
			.attr('data-original-title', 'Cüzdan adresi kopyalandı!')
			.tooltip('show');

		setTimeout(() => {
			$('#copy-to-clipboard').tooltip('destroy');
		}, 1000);
	}
	
	getDepositAddressQr () {
		return "https://chart.googleapis.com/chart?chs=250x250&chld=L|2&cht=qr&chl=" 
			+ this.props.depositCoinName + ":" 
			+ this.props.depositAddress + "?amount=" 
			+ this.props.depositAmount;
	}

	render() {
	    return (
	    	<div id="order-payment">
    			<div className="col-xs-12 col-sm-4 col-md-3">
    				<img src={this.getDepositAddressQr()} />
    			</div>

    			<div id="order-payment-details" className="col-xs-12 col-sm-8 col-md-9">
    				<h3>Kalan Süre: <span id="time-remaining"><b>{this.props.timeRemaining}</b></span></h3>

    				<h4>Lütfen aşağıdaki adrese <b>{this.props.depositAmount} {this.props.depositCoin}</b> gönderin.<br/>
    					<b id="deposit-address">{this.props.depositAddress}</b>
    				</h4>
    				
			        <CopyToClipboard text={this.props.depositAddress} onCopy={() => this.triggerCopyTooltip()}>
						<button id="copy-to-clipboard" type="button" className="btn btn-default btn-themed">Adresi kopyala</button>
    				</CopyToClipboard>
    			</div>
		    </div>
	    );
	}
}

export default OrderInitial;
