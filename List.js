import React, { PropTypes } from 'react';

export const Item = (props) => (
    <li>{props.name}</li>
);

Item.propTypes = { name: PropTypes.string.isRequired, };

export const List = (props) => {
    const { items } = props;

    function renderItems () {
        return (
            <ul>
                {items.map((item, i) => <Item key={i} name={item.name} />)}
            </ul>
        );
    }

    function renderLoading () {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <strong>List</strong>
            {items.length > 0 ? renderItems() : renderLoading()}
        </div>
    );
};

List.propTypes = {
    items: PropTypes.array,
};

List.defaultProps = {
    items: [],
};
