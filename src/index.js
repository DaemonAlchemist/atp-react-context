/**
 * Created by Andy on 7/9/2017.
 */

import React from "react";
import {o} from 'atp-sugar';
    ''
const provideContext = contextTypes => Component => class ContextProvider extends React.Component {
    static childContextTypes = contextTypes;
    getChildContext() {
        const context = o(contextTypes).map((_, key) => this.props[key]).raw;
        return context;
    }
    render() {
        return <Component {...this.props} />
    }
};

const addContext = contextTypes => Component => class ContextConsumer extends React.Component {
    static contextTypes = contextTypes;
    render() {
        return <Component {...this.props} {...this.context} />
    }
};

export {provideContext, addContext};
