// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#u7tjez
import { translator } from '../../../../../common/translator';
import './tick';
import './ticks';
import './ohlc';
import './ohlc_values';
import './readOhlcObj';
import './readOhlc';
import './check_direction';
import './direction';
import './purchase';
import './ask_price';
import './payout';

Blockly.Blocks.on_strategy = {
  init: function init() {
    this.appendDummyInput()
      .appendField(translator.translateText('(2) things to do before purchase is made'));
    this.appendStatementInput('STRATEGY_STACK')
      .setCheck('Purchase');
    this.setColour('#2a3052');
    this.setTooltip(translator.translateText('This block decides what to do each time a new tick is received')); // eslint-disable-line max-len
    this.setHelpUrl('https://github.com/binary-com/binary-bot/wiki');
  },
};
Blockly.JavaScript.on_strategy = (block) => {
  const stack = Blockly.JavaScript.statementToCode(block, 'STRATEGY_STACK');
  const code = `function on_strategy(ticks, proposals, purchaseCtrl){
    if(purchaseCtrl === null) return; 
    try {
      ${stack}
    } catch (e) { 
      if (e.name === 'BlocklyError') {
        // pass
      } else {
        throw e;
      }
    }
  }
  `;
  return code;
};
