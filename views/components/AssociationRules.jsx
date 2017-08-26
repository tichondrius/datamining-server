import React from 'react';
import { Panel, Table } from 'react-bootstrap'



const RowItemSet = ({ rule }) => (
  <tr>
    <td>
      <code>{rule.lhs.join(',  ')}</code>
    </td>
    <td>
      <code>{rule.rhs.join(',  ')}</code>
    </td>
    <td>
      {rule.confidence.toFixed(2)}
    </td>
  </tr>
)

class AssociationRules extends React.Component {
  
  render() {
    const { associationRules } = this.props;
    return (
        <Panel header={`Các luật phát sinh`}>
         <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>Kết hợp(lhs)</th>
              <th>Kết quả(rhs)</th>
              <th>Confident</th>
            </tr>
          </thead>
          <tbody>
           {
             associationRules.map(associationRule => <RowItemSet rule={associationRule}/>)
           }
          </tbody>
        </Table>
        </Panel>
    )
  }
}

module.exports = AssociationRules;
