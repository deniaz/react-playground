import React, { Children, Component, PropTypes } from 'react';
import { fetchData } from '../lib/fetch';

export class Resource extends Component {
    static propTypes = {
        children: PropTypes.element.isRequired,
        url: PropTypes.string.isRequired,
        method: PropTypes.string,
        headers: PropTypes.object,
        body: PropTypes.any,
        transform: PropTypes.func,
    };

    static defaultProps = {
        transform: null,
        method: 'GET',
        headers: null,
        body: null,
    };

    constructor (props, context) {
        super(props, context);

        this.state = {
            fetchedData: null,
        };

        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount () {
        this.fetchData();
    }

    bestEffortMapping (json) {
        const { propTypes } = this.props.children.type;
        const keys = Object.keys(propTypes);

        if (keys.length === 1) {
            return {
                [keys[0]]: json.results,
            };
        }

        throw new Error(
            'React Sparkle either needs a transform function or a clearly identifiable prop to load content into.'
        );
    }

    async fetchData () {
        const { body, headers, method, url, transform } = this.props;
        try {
            let init = { method: method };
            if (headers) { init.headers = new Headers(headers); }
            if (body) { init.body = body; }

            const response = await fetch(url, init);
            const json = await response.json();

            this.setState({
                fetchedData: transform ? transform(json) : this.bestEffortMapping(json),
            });

        } catch (e) {
            throw e;
        }
    }

    render () {
        const { children } = this.props;
        const { fetchedData } = this.state;

        const newProps = Object.assign({}, fetchedData);

        return children.props.onComponentDidMount
            ? Children.only(children)
            : React.cloneElement(children, newProps);
    }
}
