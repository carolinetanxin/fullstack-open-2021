import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from "./Togglable";

describe('<Togglable />', () => {
    let component

    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className="testDiv"></div>
            </Togglable>
        )
    })

    // 渲染
    test('renders its children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    // 刚开始隐藏
    test('at start the children are not displayed', () => {
        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    // 点击后渲染子组件
    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const div = component.container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
    })

    // 关闭子组件
    test('toggled content can be closed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)

        const closeButton = component.getByText('cancel')
        fireEvent.click(closeButton)

        const div = component.container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })
})
