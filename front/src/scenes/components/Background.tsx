import React, { Component } from 'react';
import Trianglify from 'trianglify';

import './index.scss';

class Background extends Component {
    componentDidMount() {
        this.draw();
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    resize = () => {
        if (this.timeout) clearTimeout(this.timeout);

        const div = document.getElementById('background');
        const pattern = document.getElementById('svg-background');
        if (div && pattern) div.removeChild(pattern);

        this.timeout = setTimeout(() => {
            this.draw();
        }, 100);
    };

    draw = () => {
        const pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight,
            x_colors: ['#526C7F', '#000'],
        });
        const patternSvg = pattern.svg();
        patternSvg.id = 'svg-background';

        const div = document.getElementById('background');

        if (div) {
            div.appendChild(patternSvg);
        }
    };

    timeout?: NodeJS.Timeout;

    render() {
        return <div id="background" />;
    }
}

export default Background;
