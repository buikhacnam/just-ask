import React from 'react'
import styled from 'styled-components'

interface FooterProps {

}

const Footer: React.FC<FooterProps> = ({}) => {
    return <Wrapper>
        <h3>🤖 Just ask!</h3>
        <p>Made with ❤️ by <a href="https://buinam.com">Casey Bui</a></p>
        <span>Beta version - response is limited to 400 characters</span>

    </Wrapper>
}
export default Footer

const Wrapper = styled.div`
text-align: center;
position: sticky;
bottom: 0px;
width: 100%;
z-index: 1;
background: white;

`