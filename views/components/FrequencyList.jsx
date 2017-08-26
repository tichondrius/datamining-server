import React from 'react';
import { Panel, Table } from 'react-bootstrap'



const RowItemSet = ({ itemSet }) => (
  <tr>
    <td>
      <code>{itemSet.itemSet.join(',  ')}</code>
    </td>
    <td>
      {itemSet.support.toFixed(2)}
    </td>
  </tr>
)

class FrequencyList extends React.Component {
  
  render() {
    const { frequentItemSet, index } = this.props;
    return (
        <Panel header={`Tập phổ biến hạng ${index}`}>
         <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Tập phổ biến</th>
              <th>Supp</th>
            </tr>
          </thead>
          <tbody>
           {
             frequentItemSet.map(itemSet => <RowItemSet itemSet={itemSet}/>)
           }
          </tbody>
        </Table>
        </Panel>
    )
  }
}

module.exports = FrequencyList;
