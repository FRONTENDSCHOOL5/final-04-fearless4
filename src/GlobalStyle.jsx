import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    img {
        vertical-align: top;
    }
    a {
        text-decoration: none;
    }
    mark{
        background-color: transparent;        
    }
`;
