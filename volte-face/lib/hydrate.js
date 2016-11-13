import React, { Component } from 'react';

export const hydrate = (InnerComponent, options) => (
    class extends Component {
        componentDidMount () {
            console.log('hydrate did mount');
        }

        render () {
            return <InnerComponent {...this.props} />
        }
    }
);
