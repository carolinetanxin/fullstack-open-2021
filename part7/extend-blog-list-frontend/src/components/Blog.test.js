import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from "./Togglable";

describe('render blog at start', () => {
    const blog = {
        title: 'template',
        url: 'https://baidu.com',
        likes: 23,
        author: 'hanchen.ye'
    }

    let component

    // 每一个test前必须渲染的内容
    beforeEach(() => {
        component = render(
            <Blog blog={blog}/>
        )
    })

    test('renders title and url at start', () => {

        // 打印部分DOM
        const button = component.container.querySelector('button')

        // 打印整个DOM
        // component.debug()

        // method 1
        // toHaveTextContent()从整个HTML代码中搜索匹配的文本
        expect(component.container).toHaveTextContent(
            'template', 'hanchen.ye'
        )

        // method 2
        const element = component.getByText(
            'template', 'hanchen.ye'
        )
        expect(element).toBeDefined()

        // method 3
        const div = component.container.querySelector('.blog')
        expect(div).toHaveTextContent(
            'template', 'hanchen.ye'
        )
    })

    test('hide url and like at start', () => {
        const div = component.container.querySelector('.blogDetail')
        expect(div).toHaveStyle('display: none')
    })

    test('show url and like when click view', () => {
        // fireEvent进行单击
        const button = component.getByText('view')
        fireEvent.click(button)
        // component.debug()
        expect(component.container).toHaveTextContent(
            'https://baidu.com', '23'
        )
    })

})

test('clicking the button calls event handler twice', () => {
    const blog = {
        title: 'template',
        url: 'https://baidu.com',
        likes: 23,
        author: 'hanchen.ye'
    }

    const mockHandlerUpdate = jest.fn()

    const component = render(
        <Blog blog={blog} updateBlog={mockHandlerUpdate}/>
    )

    // fireEvent进行单击
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    // 期望方法调用2次
    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)

})
