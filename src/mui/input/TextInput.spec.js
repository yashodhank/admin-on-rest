import React from 'react';
import assert from 'assert';
import { shallow, render } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextInput from './TextInput';

const muiTheme = getMuiTheme({
    userAgent: false,
});

describe('<TextInput />', () => {
    const defaultProps = {
        source: 'foo',
        meta: {},
        input: {},
    };

    it('should use a mui TextField', () => {
        const wrapper = shallow(<TextInput {...defaultProps} label="hello" />);
        const TextFieldElement = wrapper.find('TextField');
        assert.equal(TextFieldElement.length, 1);
        assert.equal(TextFieldElement.prop('floatingLabelText'), 'hello');
    });

    it('should render an input of type text by default', () => {
        const wrapper = render(<MuiThemeProvider muiTheme={muiTheme}>
            <TextInput {...defaultProps} input={{ id: 'foo' }} />
        </MuiThemeProvider>);

        const inputs = wrapper.find('input');
        assert.equal(inputs.length, 1);

        const input = inputs.first();
        assert.equal(input.attr('type'), 'text');
    });

    it('should use the input parameter value as the initial input value', () => {
        const wrapper = render(<MuiThemeProvider muiTheme={muiTheme}>
            <TextInput {...defaultProps} input={{ value: 2 }} />
        </MuiThemeProvider>);

        const input = wrapper.find('input').first();
        assert.equal(input.attr('value'), '2');
    });

    it('should allow to customize input type', () => {
        const wrapper = render(<MuiThemeProvider muiTheme={muiTheme}>
            <TextInput {...defaultProps} input={{ id: 'foo' }} type="password" />
        </MuiThemeProvider>);

        const inputs = wrapper.find('input');
        assert.equal(inputs.length, 1);

        const input = inputs.first();
        assert.equal(input.attr('type'), 'password');
    });

    describe('error message', () => {
        it('should not be displayed if field is pristine', () => {
            const wrapper = shallow(<TextInput {...defaultProps} meta={{ touched: false }} />);
            const TextFieldElement = wrapper.find('TextField');
            assert.equal(TextFieldElement.prop('errorText'), false);
        });

        it('should not be displayed if field has been touched but is valid', () => {
            const wrapper = shallow(<TextInput {...defaultProps} meta={{ touched: true, error: false }} />);
            const TextFieldElement = wrapper.find('TextField');
            assert.equal(TextFieldElement.prop('errorText'), false);
        });

        it('should be displayed if field has been touched and is invalid', () => {
            const wrapper = shallow(<TextInput {...defaultProps} meta={{ touched: true, error: 'Required field.' }} />);
            const TextFieldElement = wrapper.find('TextField');
            assert.equal(TextFieldElement.prop('errorText'), 'Required field.');
        });
    });
});
