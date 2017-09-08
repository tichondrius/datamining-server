var React = require('react');
var DefaultLayout = require('./layouts/default');
import FrequencyList from './components/FrequencyList';
import AssociationRules from './components/AssociationRules';

const convertToArray = (frequentItemSet) => {
  const result = [];
  let i = 0;
  for(var propertyName in frequentItemSet) {
    result.push({
      index: Number(propertyName),
      itemSet: frequentItemSet[propertyName],
    });
  }
  return result;
}

class HomePage extends React.Component {
  
  render() {
    const { frequentItemSets, associationRules, minSupp, minConf } = this.props;
    const fis = convertToArray(frequentItemSets);
    return (
      <DefaultLayout title={this.props.title}>
        <form action="/" method="GET">
          <label>Min support</label> <input value={minSupp} name="minsupp" type="text" /> 
          <label>Min confidence</label> <input value={minConf} name="minconf" type="text" /> 
          <button type="submit">Chạy với tham số mới</button>
        </form>
        {
          fis.map((fi, index) => 
            <FrequencyList frequentItemSet={fi.itemSet} index={fi.index} />)
        }
        <AssociationRules associationRules={associationRules}/>
      </DefaultLayout>
    );
  }
}
module.exports = HomePage;
