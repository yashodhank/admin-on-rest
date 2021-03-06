import React, { Component } from 'react';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import CreateButton from '../button/CreateButton';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const Actions = ({ resource, filter, displayedFilters, filterValues, hasCreate, basePath, showFilter, refresh }) => (
    <CardActions style={cardActionStyle}>
        {filter && React.cloneElement(filter, { resource, showFilter, displayedFilters, filterValues, context: 'button' }) }
        {hasCreate && <CreateButton basePath={basePath} />}
        <FlatButton primary label="Refresh" onClick={refresh} icon={<NavigationRefresh />} />
    </CardActions>
);

export default Actions;
