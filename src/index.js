import React from "react";
import {o} from 'atp-sugar';

/**
 * HOC that extracts properties from the wrapped component and makes them available to child components
 * @param {Object} contextTypes - A PropTypes object specifying which properties to expose
 */
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

/**
 * HOC that injects context properties into the wrapped component
 * @param {Object} contextTypes - A PropTypes object specifying which context variables to make available to this component
 */
const addContext = contextTypes => Component => class ContextConsumer extends React.Component {
    static contextTypes = contextTypes;
    render() {
        return <Component {...this.props} {...this.context} />
    }
};

export {provideContext, addContext};
