/**
 * Created by Andrea on 9/3/2017.
 */

import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme'
import React from 'react';
import {provideContext, addContext} from 'atp-react-context';
import {mount} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PropTypes from 'prop-types';
import { JSDOM } from'jsdom';

//--BEGIN DOM SETUP--//
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .reduce((result, prop) => ({
            ...result,
            [prop]: Object.getOwnPropertyDescriptor(src, prop),
        }), {});
    Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};
copyProps(window, global);
//--END DOM SETUP--//

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
    it('should inject context from providers to descendants', () => {
        const doc = mount(
            <div>
                <Provider foo="FOO" bar="BAR" baz="BAZ">
                    <div>
                        <Consumer/>
                    </div>
                </Provider>
            </div>
        );
        expect(doc.find('li').at(0)).to.have.html('<li>FOO</li>');
        expect(doc.find('li').at(1)).to.have.html('<li>BAR</li>');
        expect(doc.find('li').at(2)).to.have.html('<li>BAZ</li>');
    });
});
