/**
 *
 */

import React, { Component } from 'react';
import './Hello.css'

class Hello extends Component {
    render() {
        return <div>Hello, { this.props.user }</div>
    }
}

export default Hello;