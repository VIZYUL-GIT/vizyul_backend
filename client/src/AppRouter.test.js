import React from 'react';
import { shallow } from 'enzyme';

import { NoMatch } from './AppRouter';

describe('NoMatch', () => {
  it('should render correctly without crashing', () => {
    const location = { pathname: 'testpath' };
    const wrapper = shallow(<NoMatch location={location}/>);
    expect(wrapper.find('h3').text()).toEqual('No match for testpath');
  });
})