/**
 * Created by Andrea on 9/3/2017.
 */

import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme'
import React from 'react';
import {provideContext, addContext} from 'atp-react-context';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';

configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());

const contextDef = {
    foo: PropTypes.string,
    bar: PropTypes.string,
    baz: PropTypes.string
};

const Consumer = addContext(contextDef)(props =>
    <div>
        <ul>
            <li>{props.foo}</li>
            <li>{props.bar}</li>
            <li>{props.baz}</li>
        </ul>
    </div>
);

const Provider = provideContext(contextDef)(props =>
    <div>{props.children}</div>
);

describe('ATP-React-Context', () => {
    it('should inject context from providers to descendents', () => {
        const doc = shallow(
            <div>
                <Provider foo="FOO" bar="BAR" baz="BAZ">
                    <div>
                        <Consumer />
                    </div>
                </Provider>
            </div>
        );
        expect(doc.find(Consumer)).to.have.prop('foo', 'FOO');
        expect(doc.find(Consumer)).to.have.prop('bar', 'BAR');
        expect(doc.find(Consumer)).to.have.prop('baz', 'BAZ');
    });
});
