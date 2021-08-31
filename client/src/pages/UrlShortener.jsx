import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`


class UrlShortener extends Component {
    constructor(props) {
        super(props)

        this.state = {
            url: '',
        }
    }

    handleChangeInputUrl = async event => {
        const url = event.target.value
        this.setState({ url })
    }


    handleshortenUrl = async () => {
        const { url } = this.state
        const payload = { 'longUrl':url }

        await api.shortenUrl(payload).then(res => {
            window.alert(`The shorten Url: ${res.data}`)

            this.setState({
                url: '',
            })
        }).catch(e =>{
          window.alert(payload)
          window.alert(e.message)
        })
    }

    render() {
        const { url } = this.state
        return (
            <Wrapper>
                <Label>url:</Label>
                <InputText
                    type="text"
                    value={url}
                    onChange={this.handleChangeInputUrl}
                />

                <Button onClick={this.handleshortenUrl}>Submit</Button>
            </Wrapper>
        )
    }
}

export default UrlShortener
