import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from "./BlogForm";

test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const addBlog = jest.fn()

    const component = render(
        <BlogForm createBlog={addBlog}/>
    )

    const title = component.getByLabelText('title')
    const author = component.getByLabelText('author')
    const url = component.getByLabelText('url')
    const form = component.container.querySelector('form')
    fireEvent.change(title, {
        target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(author, {
        target: { value: 'hanchen.ye' }
    })
    fireEvent.change(url, {
        target: { value: 'www.google.com' }
    })

    fireEvent.submit(form)


    expect(addBlog.mock.calls).toHaveLength(1)

    expect(addBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
    expect(addBlog.mock.calls[0][0].author).toBe('hanchen.ye')
    expect(addBlog.mock.calls[0][0].url).toBe('www.google.com')
})
