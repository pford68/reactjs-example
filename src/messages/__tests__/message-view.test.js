/**
 *
 */
import React from 'react';
import MessageView from '../message-view';
import ReactDOM from 'react-dom';


it('renders correctly', () => {
    const msg = {
        from: 'John',
        content: 'The event will start next week',
        status: 'unread'
    };

    const div = document.createElement('div');
    ReactDOM.render(<MessageView message={msg} />, div);
});
