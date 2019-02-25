// __mocks__/d3.js
'use strict';

let temp = jest.genMockFromModule("d3");

temp.container = () => temp;

const _append = jest.fn(() => temp);
temp.append = _append;

const _text = jest.fn(() => temp);
temp.text = _text;

module.exports = temp;
